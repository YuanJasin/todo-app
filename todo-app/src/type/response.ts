import { TodoItem } from "./datatype";

/* 任务列表响应 */
export interface GetTodoListResponse{
    data:TodoItem[]
}

/* 创建任务成功 */
export interface CreateTodoItemResponse{
    data:TodoItem
}

/* 更新任务成功 */
export interface UpdateTodoItemResponse{
    data:TodoItem
}

/* 更新日程成功 */
export interface UpdateScheduleItemResponse{
    
}