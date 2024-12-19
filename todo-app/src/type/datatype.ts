export interface TodoItem {
    description: string;
    completed: boolean;
    lockTime:number;
}

export interface ListCardProps {
    info?: {
        description: string;
        completed: boolean;
        lockTime:number;
      };
      index?: number;
      empty:boolean;
      updateTodos: ((index: number)=> void)|((description:string,lockTime:number) => void);
      updateLockTime?:(index: number, newLockTime: number) => void;
      updatedescription?:(index: number, description: string) => void;
}