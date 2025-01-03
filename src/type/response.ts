import { TodoItem } from "./datatype";

/* 任务列表响应 */
export type GetTodoListResponse = {
    data:TodoItem[]
}

/* 创建任务成功 */
export type CreateTodoItemResponse = {
    success:boolean
}

/* 更新任务成功 */
export type UpdateTodoItemResponse = {
    data:TodoItem
}

/* 更新日程成功 */
export type UpdateScheduleItemResponse = {
    success:boolean
}