import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoItem {
  description: string;
  completed: boolean;
  lockTime: number;
}

interface TodosState {
  todos: TodoItem[];
}


const initialState: TodosState = {
  todos: [
    { description: "事务1事务1事务1事务1事务1事务1", completed: false, lockTime: 1 },
    { description: "事务2", completed: false, lockTime: 2 },
    { description: "事务3", completed: false, lockTime: 1 },
    { description: "事务4", completed: false, lockTime: 5 },
    // { description: "事务5", completed: false, lockTime: 1 },
    // { description: "事务6", completed: false, lockTime: 1 },
    // { description: "事务7", completed: false, lockTime: 5 },
    // { description: "事务8", completed: false, lockTime: 1 },
    // { description: "事务9", completed: false, lockTime: 1 },
    // { description: "事务10", completed: false, lockTime: 5 },
    // { description: "事务11", completed: false, lockTime: 1 },
  ]
};


const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<TodoItem[]>) {
      state.todos = action.payload;
    },
    reviseLockTime(state, action: PayloadAction<{ index: number, newLockTime: number }>) {
        const { index, newLockTime } = action.payload;
        state.todos[index].lockTime = newLockTime;
    },
    reviseDescription(state, action: PayloadAction<{ index: number, description: string }>) {
        const { index, description } = action.payload;
        state.todos[index].description = description;
    },
    newTodoItem(state, action: PayloadAction<TodoItem>) {
        state.todos.push(action.payload);
    },
    toggleTodoCompleted(state, action: PayloadAction<number>) {
        const index = action.payload;
        const todo = state.todos[index];
        todo.completed = !todo.completed;
        todo.lockTime = 0; 
    },
    removeTodoItem(state,action: PayloadAction<{ index: number}>){
      const {index} = action.payload
      state.todos.splice(index,1)
    },
    updateTodoOrder(state, action: PayloadAction<{ fromIndex: number, toIndex: number }>) {
      const { fromIndex, toIndex } = action.payload;
      const [movedTodo] = state.todos.splice(fromIndex, 1);  
      state.todos.splice(toIndex, 0, movedTodo); 
    }
  }
});

export const { reviseLockTime ,reviseDescription,newTodoItem,toggleTodoCompleted,removeTodoItem,updateTodoOrder,setTodos} = todosSlice.actions;
export default todosSlice.reducer;
