import { TodoItem } from "../type/datatype"
import schstyle from "./schedule.module.css"
import { Divider } from 'antd';
import {useTodoHandlers} from "../tool/operation-data"
import { sliceList } from "../tool/process";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableTodoItem from "../components/draggableCard";
import { Fragment } from "react/jsx-runtime";
import { useState,useEffect } from "react";


function Schedule() {
    const {
        todolist,
        changeLockTimeHandler,
        changeItemState,
        changeDescriptionHandler
    } = useTodoHandlers();
    
    const [todaylist,setList] = useState(sliceList(todolist));

    useEffect(() => {
        setList(sliceList(todolist));
    }, [todolist]);


    function TodayList({list}:{list:Record<string, TodoItem[]>}) {
        const updateTodos = (draggedIndex: number, draggedDate: string , targetDate: string, targetIndex: number, draggedItemData: TodoItem) => {
            // 实现将拖拽的项目移动到目标列表中的逻辑
            const newList = { ...list };
            
            const draggedItems = newList[draggedDate];
            const targetItems = newList[targetDate];

            // 从原列表中移除被拖拽的项目
            draggedItems.splice(draggedIndex, 1);
            // 将拖拽的项目插入到目标列表的指定位置
            targetItems.splice(targetIndex, 0, draggedItemData);
    
            // 更新列表，或根据需要更新状态
            // 比如可以使用 `setList(newList)` 如果 `list` 是通过 state 管理的。
            setList(newList);
        };
        return (
            <div className={schstyle.content}>
                {
                    Object.entries(list).map(([date, items]) => (
                        <Fragment key={date}>
                        <div className={schstyle.targettime}>{date}</div>
                            {items.map((item,index) => {
                                return(
                                        <div key={index}>
                                            <DraggableTodoItem
                                                key={date + index}
                                                item={item}
                                                index={index}
                                                id={item.id}
                                                date={date}
                                                changeTodos={updateTodos}
                                                updateTodos={changeItemState}
                                                updateLockTime={changeLockTimeHandler}
                                                updatedescription={changeDescriptionHandler}
                                            />
                                        <Divider style={{ borderColor: '#6495ed' ,margin:"0"}}/>
                                        </div>
                                )
                        })
                    }
                        </Fragment>
                      ))
                }
                <div className={schstyle.targettime}></div>
                
            </div>
        )
    }

    return(
        <>
            <h1 className={schstyle.subtitle}>Schedule</h1>
            <DndProvider backend={HTML5Backend}>
                <TodayList list={todaylist}/>
            </DndProvider>
        </>
    )
}

export default Schedule