// 事务类型
export interface TodoItem {
    description: string;
    completed: boolean;
    lockTime:number;
}

// listcard接收props
export interface ListCardProps {
    empty:boolean;
    updateTodos: ((index: number,bol:boolean)=> void)|((description:string,lockTime:number) => void);
    index: number;
    todo:boolean,
    date?:string,
    item?: {
        description: string;
        completed: boolean;
        lockTime:number;
      };
    updateLockTime?:(index: number, newLockTime: number) => void;
    updatedescription?:(index: number, description: string) => void;
}

// draggableCard接收props
export interface draggableProps{
    item:{
      description: string;
      completed: boolean;
      lockTime:number;
    },
    index:number,
    date:string,
    changeTodos:(draggedIndex: number, draggedDate: string, targetDate: string, targetIndex: number, draggedItemData: TodoItem) => void;
    updateTodos: ((index: number,bol:boolean)=> void)|((description:string,lockTime:number) => void);
    updateLockTime?:(index: number, newLockTime: number) => void;
    updatedescription?:(index: number, description: string) => void;
}

// 拖拽类型
export const ItemTypes = {
    CARD: 'card',
  };
  
  // 拖拽项的类型
  export interface draggedItem {
  index: number;
  date: string;
  item: TodoItem;
}