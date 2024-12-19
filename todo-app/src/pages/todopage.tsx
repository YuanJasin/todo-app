import "./todo.css"
import ListCard from "../components/ListCard"
import { Fragment, useState } from "react"
import {TodoItem} from "../type/datatype"
import { Divider } from 'antd';

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
    const [todos,setTodos] = useState<TodoItem[]>([
        {description:"事务1事务1事务1事务1事务1事务1",completed:false,lockTime:1},
        {description:"事务2",completed:false,lockTime:2},
        {description:"事务3",completed:false,lockTime:1},
        {description:"事务4",completed:false,lockTime:5},
        {description:"事务5",completed:false,lockTime:1},
    ])

     /* 修改Item的lockTime状态 */
     const changeLockTime = (index: number, newLockTime: number) => {
        setTodos((prevItems) => {
            const updatedTodos = [...prevItems];
            updatedTodos[index] = {
                ...updatedTodos[index],
                lockTime: newLockTime, // Update the lockTime at the given index
            };
            return updatedTodos;
        });
    };

    /* 修改Item状态(完成/未完成) */
    const changeItemState = (index:number) => {
            setTodos((prevItems) => {
                const updatedTodos = [...prevItems]; 
                updatedTodos[index] = { 
                  ...updatedTodos[index], 
                  completed: !updatedTodos[index].completed, 
                  lockTime:0,
                };
                return updatedTodos; 
              });
    }

    /* 修改待办事务的描述 */
    const changeDescription = (index:number,description:string) => {
        setTodos((prevItems) => {
            const updatedTodos = [...prevItems]; 
            updatedTodos[index] = { 
              ...updatedTodos[index], 
              description:description
            };
            return updatedTodos; 
          });
    }

    /* 添加一个新的item代办事件 */
    function newTodoItem(description:string,lockTime:number){
        const exists = todos.some((item) => item.description === description);
        if (exists) {
            console.log("在列表中已经存在该任务")
            return false
        }
        if (description.length<0 || lockTime == 0) {
            console.log("请编写事件描述或事件预计完成时间")
            return false
        }

        const item:TodoItem = {
            description:description,
            completed:false,
            lockTime:lockTime
        }

        setTodos((prevItems) => [...prevItems,item])
        return true
    }
    return(
        <> 
            <h1 className="subtitle">To-do list</h1>
            <div className="content">
                {
                    todos.map((item,index) => {
                        return(
                            <Fragment key={index}>
                                <ListCard 
                                    info={item}
                                    index={index} 
                                    empty={false}
                                    updateTodos={changeItemState}
                                    updateLockTime={changeLockTime}
                                    updatedescription={changeDescription}
                            />
                            <Divider style={{ borderColor: '#6495ed' ,margin:"0"}}/>
                            </Fragment>
                        )
                    })
                }
            </div>
            <hr className="line"></hr>
            <Count list={todos}/>
            <div className="newitem">
            <ListCard 
                    empty={true}
                    updateTodos={newTodoItem}
            />
            </div>
        </>
    )
}
export default Todo;