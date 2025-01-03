import { requestFun } from "./requestFun";
import {CreateTodoItem,UpdateTodoItem,UpdateScheduleItem,GetTodoList} from "../type/request"
import { GetTodoListResponse,UpdateTodoItemResponse,UpdateScheduleItemResponse,CreateTodoItemResponse } from "../type/response";

/* 请求自定义hook */
export const useRequet = () => {

  // 获取待办事务列表
  const getTodos = (): Promise<GetTodoListResponse> => {
    return requestFun().GET<GetTodoListResponse, GetTodoList>('/todos');
  };
  // 创建一个代办事务
  const createTodo =(todo:CreateTodoItem):Promise<CreateTodoItemResponse> => {
    return requestFun().POST<CreateTodoItemResponse,CreateTodoItem>('/todo',todo)
  }
  // 更新一个代办事务信息
  const updateTodo = (params:UpdateTodoItem):Promise<UpdateTodoItemResponse> => {
    return requestFun().POST<UpdateTodoItemResponse,UpdateTodoItem>(`/todo/${params.id}`,params)
  }
  // 修改日程
  const updateSchedule = (params:UpdateScheduleItem):Promise<UpdateScheduleItemResponse> => {
    return requestFun().POST<UpdateScheduleItemResponse,UpdateScheduleItem>('/schedule',params)
  }

  return{
    getTodos,
    createTodo,
    updateTodo,
    updateSchedule
  }
}
 