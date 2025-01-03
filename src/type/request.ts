
/* 更新任务 */
export interface UpdateTodoItem{
    id: number;
    data:{
        description?: string;
        completed?: boolean;
        lockTime?:number;
    }
}

/* 更新拖拽日程 */
export interface UpdateScheduleItem {
    formIndex:number,
    targetIndex:number
}

// 创建事务类型
export interface CreateTodoItem {
    description: string;
    completed: number;
    lockTime:number;
}
