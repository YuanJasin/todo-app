import { useDispatch,useSelector } from "react-redux";
import { reviseLockTime,reviseDescription,newTodoItem,toggleTodoCompleted,removeTodoItem} from '../store/todolist';
import {TodoItem} from "../type/datatype"
import {createTodo, updateTodo} from "../api/useRequest.ts";

export const useTodoHandlers = () => {
    const todolist = useSelector((state: { todos: { todos: TodoItem[] } }) => state.todos.todos);
    const dispatch = useDispatch();

    /* 修改Item的lockTime状态 */
    const changeLockTimeHandler =  async (index: number, newLockTime: number) => {
        const params = {
            id: index,
            data: {
                lockTime: newLockTime,
                completed: false,
            }
        }
        const success = await updateTodo(params)
        if (success) {
            console.log("修改成功");
            dispatch(reviseLockTime({index, newLockTime}));
        } else {
            console.error("修改失败");
        }
    };

    /* 修改Item状态(完成/未完成) */
    const changeItemState =  async (index: number, itemState: boolean) => {
        const params = {
            id: index,
            data: {
                completed: itemState,
            }
        }
        const success = await updateTodo(params)
        if (success) {
            console.log("修改成功");
            dispatch(toggleTodoCompleted(index));
            if (itemState) {
                setTimeout(() => {
                    dispatch(removeTodoItem({index}))
                }, 2000);
            }else{
                dispatch(removeTodoItem({index}))
            }
        }else{
            console.error("修改失败");
        }
    }

    /* 修改待办事务的描述 */
    const changeDescriptionHandler = async (index: number, description: string) => {
        const params = {
            id: index,
            data: {
                description: description,
                completed: false,
            }
        }
        const success = await updateTodo(params)
        if (success) {
            console.log("修改成功");
            dispatch(reviseDescription({index, description}));
        } else {
            console.log("修改失败");
        }
    }

    /* 添加一个新的代办事件 */
    const newTodoItemHandler =  async (description: string, lockTime: number) => {
        const exists = todolist.some((item) => item.description === description);
        if (exists) {
            console.log("在列表中已经存在该任务");
            return false;
        }
        if (description.length === 0 || lockTime === 0) {
            console.log("请填写事件描述或事件预计完成时间");
            return false;
        }
        try {
            /* 接口调用代码 */
            const params = {
                description: description,
                lockTime: lockTime,
                completed: 0
            }
            const response = await createTodo(params)
            if (response.success) {
                console.log("创建成功");
                const item: TodoItem = {description, completed: false, lockTime};
                dispatch(newTodoItem(item));
            }
        }catch (error) {
            console.log("创建失败",error);
        }
    }
        return {
            todolist,
            changeLockTimeHandler,
            changeItemState,
            changeDescriptionHandler,
            newTodoItemHandler,
        };

}
