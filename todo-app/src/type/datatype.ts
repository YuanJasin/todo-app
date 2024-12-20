// 事务类型
export interface TodoItem {
    description: string;
    completed: boolean;
    lockTime:number;
}

// listcard接收类型
export interface ListCardProps {
    empty:boolean;
    updateTodos: ((index: number,bol:boolean)=> void)|((description:string,lockTime:number) => void);
    index: number;
    todo:boolean,
    info?: {
        description: string;
        completed: boolean;
        lockTime:number;
      };
    updateLockTime?:(index: number, newLockTime: number) => void;
    updatedescription?:(index: number, description: string) => void;
}

// 拖拽类型
export const ItemTypes = {
    CARD: 'card',
  };
  