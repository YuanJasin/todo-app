import todostyle from "./todo.module.css"
import ListCard from "../components/ListCard"
import { Fragment, useEffect } from "react"
import {TodoItem} from "../type/datatype"
import { Divider } from 'antd';
import {useTodoHandlers} from "../tool/operation-data"
import { useRequet } from "../api/useRequest";
import { useDispatch } from "react-redux";
import { setTodos } from "../store/todolist";


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

    /* 此处为获取接口数据的代码 */
    // const dispatch = useDispatch()

    // const getlist = async () => {
    //     const initialState = await useRequet().getTodos()
    //     dispatch(setTodos(initialState.data))
    // }

    // useEffect(() => {
    //     getlist()
    // })

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
                                    item={item}
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