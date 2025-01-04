import todostyle from "./todo.module.css"
import ListCard from "../components/ListCard"
import {Fragment, useEffect} from "react"
import {TodoItem} from "../type/datatype"
import { Divider } from 'antd';
import {useTodoHandlers} from "../tool/operation-data"
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../store/store.ts';
import {fetchTodos} from "../store/todolist.ts";


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

    const dispatch:AppDispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return(
        <> 
            <h1 className={todostyle.subtitle}>To-do list</h1>
            <div className={todostyle.content}>
                {
                    todos.map((item,index) => {
                        return(
                            <Fragment key={index}>
                                <ListCard
                                    key={index}
                                    item={item}
                                    index={item.id}
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
            <div className={todostyle.foot}>
                <hr className={todostyle.line}></hr>
                <Count list={todolist}/>
                <div className={todostyle.newitem}>
                    <ListCard
                        empty={true}
                        todo={false}
                        index={0} // 此处可以传任何值，这不会用到index
                        updateTodos={newTodoItemHandler}
                    />
                </div>
            </div>
        </>
    )
}

export default Todo;