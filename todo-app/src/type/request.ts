import { TodoItem } from "./datatype";

/* 获取任务列表 */
export interface GetTodoList {}

/* 创建任务 */
export interface CreateTodoItem{
    data:TodoItem
}

/* 更新任务 */
export interface UpdateTodoItem{
    id: number;
    data:{
        description?: string;
        completed?: boolean;
        lockTime?:number;
    }
}

/* 更新拖拽日程 */
export interface UpdateScheduleItem {
    formIndex:number,
    targetIndex:number
}

