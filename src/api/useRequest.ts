import {requestFun} from "./requestFun";
import {CreateTodoItem, UpdateScheduleItem, UpdateTodoItem} from "../type/request"
import {
  CreateTodoItemResponse,
  GetTodoListResponse,
  UpdateScheduleItemResponse,
  UpdateTodoItemResponse
} from "../type/response";

// 获取待办事务列表
const getTodos = (): Promise<GetTodoListResponse> => {
  return requestFun().GET<GetTodoListResponse>('/api/todos');
};

// 创建一个代办事务
const createTodo =(todo:CreateTodoItem):Promise<CreateTodoItemResponse> => {
  return requestFun().POST<CreateTodoItemResponse,CreateTodoItem>('/api/todo',todo)
}

// 更新一个代办事务信息
const updateTodo = (params:UpdateTodoItem):Promise<UpdateTodoItemResponse> => {
  return requestFun().POST<UpdateTodoItemResponse,UpdateTodoItem>(`/api/todo/${params.id}`,params)
}

// 修改日程
const updateSchedule = (params:UpdateScheduleItem):Promise<UpdateScheduleItemResponse> => {
  return requestFun().POST<UpdateScheduleItemResponse,UpdateScheduleItem>('/api/schedule',params)
}
export  {getTodos,createTodo,updateTodo,updateSchedule}