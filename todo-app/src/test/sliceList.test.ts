import { sliceList } from "../tool/process";
import { TodoItem } from "../type/datatype";

/**
 * 位于tool/process是对日程分类的主要方法
 * 对该方法进行单元测试通过五个方面
 * 1. 基本功能测试
 * 2. 参数为空测试
 * 3. 所有任务都在今天完成
 * 4. 跨度多天的任务
 * 5. 单个任务时间超出一天可接受范围
 */

// 日期格式化工具函数
const getFormattedDate = (date: Date): string => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (isSameDay(date, today)) {
    return "Today";
  }
  if (isSameDay(date, tomorrow)) {
    return "Tomorrow";
  }

  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" }); // 生成缩写月份，如 "Nov"
  const day = date.getDate();
  const suffix = getDaySuffix(day); // 获取日期后缀

  return `${month} ${day}${suffix}, ${year}`;
};

/* 判断时期是否在今天和明天 */
function isSameDay(d1: Date, d2: Date): boolean {
    // 比较年份
    if (d1.getFullYear() !== d2.getFullYear()) {
      return false;
    }
    // 比较月份
    if (d1.getMonth() !== d2.getMonth()) {
      return false;
    }
    // 比较日期
    if (d1.getDate() !== d2.getDate()) {
      return false;
    }
    // 年、月、日都相同，返回 true
    return true;
  }

  /* 生成日期后缀 */
const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) return "th"; // 特殊情况：11, 12, 13 结尾都用 "th"
    switch (day % 10) {
      case 1: return "st"; // 1 -> "st"
      case 2: return "nd"; // 2 -> "nd"
      case 3: return "rd"; // 3 -> "rd"
      default: return "th"; // 其他情况 -> "th"
    }
  };



/* 测试用例 */
describe('sliceList',() => {
    it('基本功能：每日分配任务在八小时之内',() => {
        const data:TodoItem[] = [
            { description: "事务1事务1事务1事务1事务1事务1", completed: false, lockTime: 5 },
            { description: "事务2", completed: false, lockTime: 3 },
            { description: "事务3", completed: false, lockTime: 5 },
            { description: "事务4", completed: false, lockTime: 3 },

        ]

        const result = sliceList(data);
        
        expect(result).toEqual({
            "Today":[
                { description: "事务1事务1事务1事务1事务1事务1", completed: false, lockTime: 5 },
                { description: "事务2", completed: false, lockTime: 3 },
            ],
            "Tomorrow":[
                { description: "事务3", completed: false, lockTime: 5 },
                { description: "事务4", completed: false, lockTime: 3 },
            ]
        })
        
    })
    it('传入参数为空数组',() => {
        const data:TodoItem[] = []
        const result = sliceList(data)
        expect(result).toEqual({})
    })
    it('全部任务在一天内完成', () => {
        const data: TodoItem[] = [
            { description: "事务3", completed: false, lockTime: 1 },
            { description: "事务4", completed: false, lockTime: 2 },
            { description: "事务3", completed: false, lockTime: 1 },
            { description: "事务4", completed: false, lockTime: 3 },
        ];
      
        const result = sliceList(data);
        expect(result).toEqual({
          'Today': [
            { description: "事务3", completed: false, lockTime: 1 },
            { description: "事务4", completed: false, lockTime: 2 },
            { description: "事务3", completed: false, lockTime: 1 },
            { description: "事务4", completed: false, lockTime: 3 },
          ],
        });
      });
    it('任务程序非常大跨度',() => {
        const data:TodoItem[] = [
            { description: "事务3", completed: false, lockTime: 8 },
            { description: "事务4", completed: false, lockTime: 8 },
            { description: "事务5", completed: false, lockTime: 8 },
            { description: "事务6", completed: false, lockTime: 8 },
            { description: "事务7", completed: false, lockTime: 8 },
            { description: "事务8", completed: false, lockTime: 8 },
            { description: "事务9", completed: false, lockTime: 8 },
        ]

        const dates: string[] = [];
        const currentDate = new Date();
        for (let i = 0; i < 7; i++) {
            dates.push(getFormattedDate(currentDate));
            currentDate.setDate(currentDate.getDate() + 1); // 日期加1天
        }

        const result = sliceList(data);
        const expectedResult: Record<string, TodoItem[]> = {};
        dates.forEach((date, index) => {
            expectedResult[date] = [{ description: `事务${index + 3}`, completed: false, lockTime: 8 }];
          });

        
        expect(result).toEqual(expectedResult)
      })
    it('单个任务超出一天可接受范围(极端情况)',() => {
        const data: TodoItem[] = [
            { description: "事务2", completed: false, lockTime: 9 },
            { description: "事务3", completed: false, lockTime: 9 },
        ];
        const result = sliceList(data);
        expect(result).toEqual({
            'Today':[{ description: "事务2", completed: false, lockTime: 9 }],
            'Tomorrow':[{ description: "事务3", completed: false, lockTime: 9 }]
        }
        ) 
    })
 })