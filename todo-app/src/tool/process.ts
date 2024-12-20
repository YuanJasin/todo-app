import { TodoItem } from "../type/datatype"


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

/* 对于目标条件条件的时间截取 */
export const sliceList = (data: TodoItem[]): Record<string, TodoItem[]> => {
  const result: Record<string, TodoItem[]> = {};

  let currentDate = new Date();
  let targetlist: TodoItem[] = [];
  let count: number = 0;

  for (const item of data) {
    // 跳过 lockTime === 0 的项
    if (item.lockTime === 0) {
      continue;
    }

    if (item.lockTime > 8) {
      // 如果 lockTime > 8，将其单独放入当前日期的数组，独占一天
      const dateKey = getFormattedDate(currentDate);
      result[dateKey] = [item];
      // 日期延申
      currentDate.setDate(currentDate.getDate() + 1);
    } else {
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
  }

  // 保存最后一个组
  if (targetlist.length > 0) {
    const dateKey = getFormattedDate(currentDate);
    result[dateKey] = targetlist;
  }

  return result;
};
