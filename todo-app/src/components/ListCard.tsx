import { useState } from "react";
import { ItemTypes, ListCardProps } from "../type/datatype";
import "./card.css"
import { useDrag } from "react-dnd";

function NumberInput(
    { num,index,setLockTime,changeLockTime }: 
    {   num: number,
        index?:number,
        setLockTime?:(newLockTime: number)=>void,
        changeLockTime?:ListCardProps["updateLockTime"],} ){
    const handleDecrement = () => {
        if (changeLockTime && num != 0) {
            changeLockTime(index!,num - 1)
        }
        if (setLockTime&& num != 0) {
            setLockTime(num - 1);
        }
    };
    const handleIncrement = () => {
        if (changeLockTime) {
            changeLockTime(index!,num + 1)
        }
        if (setLockTime) {
            setLockTime(num + 1);
        }
    };

    const handleChange = (event: { target: { value: string; }; }) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue)) {
            setLockTime?.(newValue);
        }
      };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={handleDecrement} style={{width:'25px'}} >-</button>
        <input 
            type="number" 
            value={num} 
            onChange={handleChange} 
            style={{ width: '30px', textAlign: 'center',border:'0' }} 
        />
        <button onClick={handleIncrement} style={{width:'25px'}} >+</button>
        </div>
    );
}

function ListCard({info,index,empty,todo,updateTodos,updateLockTime,updatedescription}:ListCardProps) {
    // const ref = React.useRef<HTMLDivElement>(null)

    // // 拖拽
    // const [{ isDragging }, drag] = useDrag(() => ({
    //     type: ItemTypes.CARD,
    //     item: { index },
    //     collect: (monitor) => ({
    //       isDragging: !!monitor.isDragging(),
    //     }),
    // }));

    // // 放置
    // const [, drop] = useDrop(() => ({
    //     accept: ItemTypes.CARD,
    //     hover: (item: { index: number }) => {
    //     console.log(`Hovering item at index ${item.index} over index ${index}`);
    //       if (item.index !== index) {
    //         moveCard!(item.index, index);
    //         item.index = index; 
    //       }
    //     }
    // }));

    // drag(drop(ref));
    function Card({index}:{index:number}) { 
        if (!info) {
            return null;
        }
        return (
            <>
            <div draggable className="card">
                <div  onClick={() => (updateTodos as (index: number,bol:boolean)=> void)(index,todo)} >
                    {info.completed ? 
                        <div className="selected"/> : <div className="select"/>
                    }
                </div>
                <textarea
                    rows={3}
                    cols={50}
                     className="input"
                     value={info.description}
                     onChange={(e) => updatedescription!(index!,e.target.value)}  
                     placeholder="Enter description"
                />
                <NumberInput 
                    index={index!}
                    num={info.lockTime} 
                    changeLockTime={updateLockTime}
                   />
            </div>
            </>
        )
    }

    function EmptyCard() {
        const [description, setDescription] = useState<string>('');
        const [lockTime, setLockTime] = useState<number>(0);  
        return (
            <>
            <div className="emptycard">
                <div className="plus"onClick={() => (updateTodos as (description: string, lockTime: number) => void)(description, lockTime!)}/> 
                {/* description 输入框 */}
                <div>
                    <textarea
                    rows={3}
                    cols={50}
                        className="input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}  
                        placeholder="Enter description"
                    />
                </div> 
                {/* lockTime 输入框 */}
                   <NumberInput 
                    num={lockTime} 
                    setLockTime={setLockTime}
                   />
            </div>
            </>
        )
    }


    return (
        <>
            {    
                empty ? 
                <EmptyCard/>
                :
                <div 
                // ref={ref}
                // style={{
                //     opacity: isDragging ? 0.5 : 1,
                //     marginBottom: '8px',
                //     cursor: 'move',
                //     backgroundColor:isDragging ? '#333' : '#F6F6F6',
                //     boxShadow: isDragging ? '0px 4px 10px rgba(0, 0, 0, 0.25)': "none", // 拖拽时显示阴影
                //     transform: isDragging ? 'scale(1.05)' : 'scale(1)', // 拖拽时稍微放大
                //     transition: 'box-shadow 0.2s, transform 0.2s', // 平滑过渡
                // }}
                >
                    <Card index={index}/>
                </div>
            }
        
        </>
    )
}

export default  ListCard