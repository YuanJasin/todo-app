import { TodoItem } from "./datatype";

/* 任务列表响应 */
export type GetTodoListResponse = {
    data?:TodoItem[]
    code:number
    error?:string
}

/* 创建任务成功 */
export type CreateTodoItemResponse = {
    success:boolean
    message:string
    code:number
    error?:string
}

/* 更新任务成功 */
export type UpdateTodoItemResponse = {
    success:boolean
    code:number
    error?:string
}

/* 更新日程成功 */
export type UpdateScheduleItemResponse = {
    success:boolean
}