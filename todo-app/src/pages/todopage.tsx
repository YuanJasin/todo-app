import "./todo.css"
import ListCard from "../components/ListCard"
import { Fragment } from "react"
import {TodoItem} from "../type/datatype"
import { Divider } from 'antd';
import { useSelector,useDispatch } from "react-redux";
import { reviseLockTime ,reviseDescription,newTodoItem,toggleTodoCompleted} from '../store/todolist';
function Count({list}:{list:TodoItem[]}) {
    const count = list.reduce((sum, item) => sum + item.lockTime, 0);
    return(
        <>
        <div className="count">
            <div>
                Count:
            </div>
            <div>
                { count }
            </div>
        </div>
        </>
    )
}

function Todo(){

    const todolist = useSelector((state: { todos: { todos: TodoItem[] } }) => state.todos.todos);
    const dispatch = useDispatch();

    /* 修改Item的lockTime状态 */
    const changeLockTimeHandler = (index: number, newLockTime: number) => {
        dispatch(reviseLockTime({index,newLockTime}))
    };

     /* 修改Item状态(完成/未完成) */
     const changeItemState = (index:number) => {
        dispatch(toggleTodoCompleted(index));
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
    return(
        <> 
            <h1 className="subtitle">To-do list</h1>
            <div className="content">
                {
                    todolist.map((item,index) => {
                        return(
                            <Fragment key={index}>
                                <ListCard 
                                    info={item}
                                    index={index} 
                                    empty={false}
                                    updateTodos={changeItemState}
                                    updateLockTime={changeLockTimeHandler}
                                    updatedescription={changeDescriptionHandler}
                            />
                            <Divider style={{ borderColor: '#6495ed' ,margin:"0"}}/>
                            </Fragment>
                        )
                    })
                }
            </div>
            <hr className="line"></hr>
            <Count list={todolist}/>
            <div className="newitem">
            <ListCard 
                    empty={true}
                    updateTodos={newTodoItemHandler}
            />
            </div>
        </>
    )
}
export default Todo;