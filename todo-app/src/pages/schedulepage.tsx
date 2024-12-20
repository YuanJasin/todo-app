import { TodoItem } from "../type/datatype"
import ListCard from "../components/ListCard"
import schstyle from "./schedule.module.css"
import { Divider } from 'antd';
import {useTodoHandlers} from "../tool/operation-data"
import { sliceList } from "../tool/process";

function Schedule() {
    const {
        todolist,
        changeLockTimeHandler,
        changeItemState,
        changeDescriptionHandler,
    } = useTodoHandlers();
    
    const todaylist = sliceList(todolist);

    function TodayList({list}:{list:Record<string, TodoItem[]>}) {
        return (
            <div className={schstyle.content}>
                {
                    Object.entries(list).map(([date, items]) => (
                        <div key={date}>
                            <div className={schstyle.targettime}>{date}</div>
                            {items.map((item,index) => {
                                return(
                                    <div draggable key={index}>
                                        <ListCard 
                                            info={item}
                                            index={index} 
                                            empty={false}
                                            todo = {false}
                                            updateTodos={changeItemState}
                                            updateLockTime={changeLockTimeHandler}
                                            updatedescription={changeDescriptionHandler}
                                    />
                                    <Divider style={{ borderColor: '#6495ed' ,margin:"0"}}/>
                                    </div>
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