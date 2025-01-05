import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes, draggableProps,draggedItem } from '../type/datatype';
import ListCard from './ListCard';
import { setTodos} from "../store/todolist";
import { useDispatch } from 'react-redux';
import {updateSchedule} from "../api/useRequest.ts";


function DraggableTodoItem({ item,index,id,date,changeTodos,updateTodos,updateLockTime,updatedescription}:draggableProps) {
    const dispatch = useDispatch();
    let targetItemInfo = { index, id, date };

    const [_,dragRef] = useDrag({
        type:ItemTypes.CARD,
        item:{index,date,item}
    })

    const [, dropRef] = useDrop({
        accept: ItemTypes.CARD,
        hover:(_: draggedItem, monitor) => {
            if (!monitor.isOver({ shallow: true })) return;
            targetItemInfo = { index, id, date };
        },
        drop: async (draggedItem:draggedItem) => {
            const { index: draggedIndex, date: draggedDate, item: draggedItemData } = draggedItem;
            // 实现交换或更新不同列表中的项目的逻辑
            changeTodos(draggedIndex, draggedDate, date, index, draggedItemData);
            if (draggedItem.item.id !== targetItemInfo.id) {
                const params = {
                    fromId:draggedItem.item.id,
                    targetId:targetItemInfo.id,
                }
            const {data,success} = await updateSchedule(params)
                console.log(data)
            if (success) {
                console.log("修改成功");
                dispatch(setTodos(data))
                // dispatch(updateTodoOrder({
                //     fromId: draggedIndex,
                //     targetId: index
                // }));
            }else{
                console.log("修改失败");
            }}}
    });

    return (
        <div ref={(node) => dragRef(dropRef(node))} key={index}>
            <ListCard
                item={item}
                index={id}
                empty={false}
                todo={false}
                updateTodos={updateTodos}
                updateLockTime={updateLockTime}
                updatedescription={updatedescription}
            />
        </div>
        
    );
}

export default DraggableTodoItem;

