import { useState } from "react";
import { ListCardProps } from "../type/datatype";
import "./card.css"

function NumberInput(
    { num,index,setLockTime,changeLockTime }: 
    {   num: number,
        index?:number,
        setLockTime?:ListCardProps["updateLockTime"],
        changeLockTime?:ListCardProps["updateLockTime"],} ){
    const handleDecrement = () => {
        if (num - 1 < 0) {
            return
        }
        if (changeLockTime) {
            changeLockTime(index!,num - 1)
        }
        if (setLockTime) {
            setLockTime(index!,num - 1);
        }
    };
    const handleIncrement = () => {
        if (changeLockTime) {
            changeLockTime(index!,num + 1)
        }
        if (setLockTime) {
            setLockTime(index!,num + 1);
        }
    };

    const handleChange = (event: { target: { value: string; }; }) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue)) {
            setLockTime!(index!,newValue);
        }
      };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={handleDecrement} >-</button>
        <input 
            type="number" 
            value={num} 
            onChange={handleChange} 
            style={{ width: '50px', textAlign: 'center',border:'0' }} 
        />
        <button onClick={handleIncrement} >+</button>
        </div>
    );
}

function ListCard({info,index,empty,updateTodos,updateLockTime,updatedescription}:ListCardProps) {

    function Card() { 
        if (!info) {
            return null;
        }
        return (
            <>
            <div className="card">
                <div  onClick={() => (updateTodos as (index: number) => void)(index!)}>
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
        <EmptyCard/>:<Card/>
       }
        </>
    )
}

export default  ListCard