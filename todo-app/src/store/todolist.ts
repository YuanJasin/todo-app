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
    { description: "事务5", completed: false, lockTime: 1 },
  ]
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    changeLockTime(state, action: PayloadAction<{ index: number, newLockTime: number }>) {
        const { index, newLockTime } = action.payload;
        state.todos[index].lockTime = newLockTime;
    },
    changeDescription(state, action: PayloadAction<{ index: number, description: string }>) {
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
        todo.lockTime = 0;  // 重置 lockTime
    }
  }
});

export const { changeLockTime ,changeDescription,newTodoItem,toggleTodoCompleted} = todosSlice.actions;
export default todosSlice.reducer;
