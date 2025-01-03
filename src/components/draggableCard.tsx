import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes, draggableProps,draggedItem } from '../type/datatype';
import ListCard from './ListCard';
import { updateTodoOrder } from "../store/todolist";
import { useDispatch } from 'react-redux';


function DraggableTodoItem({ item,index,date,changeTodos,updateTodos,updateLockTime,updatedescription}:draggableProps) {
    const dispatch = useDispatch();

    const [_,dragRef] = useDrag({
        type:ItemTypes.CARD,
        item:{index,date,item}
    })

    const [, dropRef] = useDrop({
        accept: ItemTypes.CARD,
        drop: async (draggedItem:draggedItem) => {
            const { index: draggedIndex, date: draggedDate, item: draggedItemData } = draggedItem;
            // 实现交换或更新不同列表中的项目的逻辑
            changeTodos(draggedIndex, draggedDate, date, index, draggedItemData);
            if (draggedIndex !== index) {
                /* 接口调用代码 */
                // const params = {
                //     formIndex:draggedIndex,
                //     targetIndex:index,
                // }
                // const success = await useRequet().updateSchedule(params)
                // if (success) {
                //     console.log("修改成功");
                //     dispatch(reviseLockTime({index,newLockTime}))
                // }else{
                //     console.log("修改失败"); 
                // }
                dispatch(updateTodoOrder({
                    fromIndex: draggedIndex,
                    toIndex: index
                }));
            }
        },
    });

    return (
        <div ref={(node) => dragRef(dropRef(node))} key={index}>
            <ListCard
                item={item}
                index={index}
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