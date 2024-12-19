import { TodoItem } from "../type/datatype"


// 日期格式化工具函数
const getFormattedDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

/*
    此处由于react严格模式的存在导致
    在严格模式下，React 会在开发环境中对某些生命周期方法和函数组件的逻辑执行两次，
    目的是帮助开发者识别副作用或非纯函数的代码，生产环境不会发生。
    console.log('sliceList called at:', new Error().stack);
*/
/* 对于目标条件条件的时间截取 */
export const sliceList = (data:TodoItem[]):Record<string, TodoItem[]> => {
    const result: Record<string, TodoItem[]> = {};
    let currentDate = new Date();
    let targetlist:TodoItem[] = []
    let count:number=0
    for (const item of data) {
        // 累计 lockTime
        count += item.lockTime;
        if (count <= 8) {
          // 如果总和不超过 8，继续添加
          targetlist.push(item);
        } else {
          // 超过 8 时保存当前组
          const dateKey = getFormattedDate(currentDate);
          result[dateKey] = targetlist;
    
          // 下一个组
          targetlist = [item];
          count = item.lockTime;
          // 日期延申
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
      if (targetlist.length > 0) {
        const dateKey = getFormattedDate(currentDate);
        result[dateKey] = targetlist;
      }
      
      return result;
}