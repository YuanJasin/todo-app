import { TodoItem } from "./datatype";

/* 任务列表响应 */
export type GetTodoListResponse = {
    data:TodoItem[]
    code:number
}

/* 创建任务成功 */
export type CreateTodoItemResponse = {
    success:boolean
    message:string
}

/* 更新任务成功 */
export type UpdateTodoItemResponse = {
    data:TodoItem
}

/* 更新日程成功 */
export type UpdateScheduleItemResponse = {
    success:boolean
}