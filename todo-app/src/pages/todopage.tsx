import todostyle from "./todo.module.css"
import ListCard from "../components/ListCard"
import { Fragment } from "react"
import {TodoItem} from "../type/datatype"
import { Divider } from 'antd';
import {useTodoHandlers} from "../tool/operation-data"


function Count({list}:{list:TodoItem[]}) {
    const count = list.reduce((sum, item) => sum + item.lockTime, 0);
    return(
        <>
        <div className={todostyle.count}>
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
    const {
        todolist,
        changeLockTimeHandler,
        changeItemState,
        changeDescriptionHandler,
        newTodoItemHandler,
    } = useTodoHandlers();

    return(
        <> 
            <h1 className={todostyle.subtitle}>To-do list</h1>
            <div className={todostyle.content}>
                {
                    todolist.map((item,index) => {
                        return(
                            <Fragment key={index}>
                                <ListCard 
                                    key={index}
                                    info={item}
                                    index={index} 
                                    todo = {true}
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
            <hr className={todostyle.line}></hr>
            <Count list={todolist}/>
            <div className={todostyle.newitem}>
            <ListCard 
                    empty={true}
                    todo = {false}
                    index={0} // 此处可以传任何值，这不会用到index
                    updateTodos={newTodoItemHandler}
            />
            </div>
        </>
    )
}
export default Todo;