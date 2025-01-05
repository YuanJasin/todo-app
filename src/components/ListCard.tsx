import React, {useCallback, useState} from "react";
import { ListCardProps } from "../type/datatype";
import "./card.css"
import { debounce } from 'lodash'

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

function ListCard({item,index,empty,todo,updateTodos,updateLockTime,updatedescription}:ListCardProps) {
    function Card({index}:{index?:number}) {

        const [desc, setDescription] = useState(item!.description);

        const debouncedChangeDescription = useCallback(
            debounce((index: number, description: string) => {
                updatedescription!(index, description);  // 延迟提交描述
            }, 2000), // 延迟 2 秒
            []  // 只在组件初次渲染时创建防抖函数
        );

        if (!item) {
            return null;
        }

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(e.target.value); // 更新本地状态，保证输入框值即时更新
            debouncedChangeDescription(index!, e.target.value); // 调用防抖函数处理最终的更新
        };

        return (
            <>
            <div className="card">
                <div  onClick={() => (updateTodos as (index: number,bol:boolean)=> void)(index!,todo)} >
                    {item.completed ? 
                        <div className="selected"/> : <div className="select"/>
                    }
                </div>
                <textarea
                    rows={3}
                    cols={50}
                     className="input"
                     value={desc}
                     onChange={handleChange}
                     placeholder="Enter description"
                />
                <NumberInput 
                    index={index!}
                    num={item.lockTime} 
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
            <div className="emptycard" draggable="true">
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
                <Card index={index}/>
            }
        
        </>
    )
}

export default  ListCard