import { useDispatch,useSelector } from "react-redux";
import { reviseLockTime ,reviseDescription,newTodoItem,toggleTodoCompleted,removeTodoItem} from '../store/todolist';
import {TodoItem} from "../type/datatype"

export const useTodoHandlers = () => {
    const todolist = useSelector((state: { todos: { todos: TodoItem[] } }) => state.todos.todos);
    const dispatch = useDispatch();

    /* 修改Item的lockTime状态 */
    const changeLockTimeHandler = (index: number, newLockTime: number) => {
        dispatch(reviseLockTime({index,newLockTime}))
    };

    /* 修改Item状态(完成/未完成) */
    const changeItemState = (index:number,todo:boolean) => {
        dispatch(toggleTodoCompleted(index));
        if (todo) {
            setTimeout(() => {
                dispatch(removeTodoItem({index}))
            }, 2000);
        }else{
            dispatch(removeTodoItem({index}))
        }
    }
    /* 修改待办事务的描述 */
    const changeDescriptionHandler = (index:number,description:string) => {
        dispatch(reviseDescription({ index, description }));
    }

        /* 添加一个新的item代办事件 */
    function newTodoItemHandler(description:string,lockTime:number){
        const exists = todolist.some((item) => item.description === description);
        if (exists) {
            console.log("在列表中已经存在该任务");
            return false;
        }
        if (description.length < 1 || lockTime === 0) {
            console.log("请编写事件描述或事件预计完成时间");
            return false;
        }
        const item: TodoItem = { description, completed: false, lockTime };
        dispatch(newTodoItem(item));
        return true;
    }
        return {
            todolist,
            changeLockTimeHandler,
            changeItemState,
            changeDescriptionHandler,
            newTodoItemHandler,
        };

}
