import { TodoItem } from "../type/datatype"
import { Fragment } from "react/jsx-runtime";
import ListCard from "../components/ListCard"
import schstyle from "./schedule.module.css"
import { Divider } from 'antd';
import {useTodoHandlers} from "../tool/operation-data"
import { sliceList } from "../tool/process";

function Schedule() {
    // 1.显示今天和明天两个代办数组
    // 2.除去两个数组外，超过的数据将继续延后到后一天
    // 3.每天的任务数量不超过八小时
    const {
        todolist,
        changeLockTimeHandler,
        changeItemState,
        changeDescriptionHandler,
    } = useTodoHandlers();
    
    const todaylist = sliceList(todolist)

    function TodayList({list}:{list:Record<string, TodoItem[]>}) {
        return (
            <div className={schstyle.content}>
                {
                    Object.entries(list).map(([date, items]) => (
                        <div key={date}>
                            <div className={schstyle.targettime}>{date}</div>
                            {items.map((item,index) => {
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
                      ))
                }
                <div className={schstyle.targettime}></div>
                
            </div>
        )
    }

    return(
        <>
            <h1 className={schstyle.subtitle}>Schedule</h1>
            <TodayList list={todaylist}/>
        </>
    )
}

export default Schedule