import { requestFun } from "./requestFun";
import {CreateTodoItem,UpdateTodoItem,UpdateScheduleItem} from "../type/request"
import { TodoItem } from '../type/datatype';

/* 请求自定义hook */
export const useRequet = () => {

  // 获取待办事务列表
  const getTodos = () => {
   requestFun().GET<TodoItem[]>('/todos')
  }
  // 创建一个代办事务
  const createTodo =(todo:CreateTodoItem) => {
    requestFun().POST<TodoItem>('/todo',todo.data)
  }
  // 更新一个代办事务信息
  const updateTodo = (params:UpdateTodoItem) => {
    requestFun().POST<TodoItem>(`/todo/${params.id}`,params.data)
  }
  // 修改日程
  const updateSchedule = (params:UpdateScheduleItem) => {
    requestFun().POST<TodoItem[]>('/schedule',params)
  }

  return{
    getTodos,
    createTodo,
    updateTodo,
    updateSchedule
  }
}
 