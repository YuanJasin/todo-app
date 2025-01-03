import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TodoItem} from "../type/datatype.ts";
import {getTodos} from "../api/useRequest.ts";

interface TodosState {
  todos: TodoItem[];
}

const initialState: TodosState = {
  todos: []
};

export const fetchTodos = createAsyncThunk<TodoItem[]>(
    'todos/fetchTodos',
    async () => {
      const response = await getTodos()
        return response.data.filter(item => !item.completed);
    }
);


const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
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
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchTodos.fulfilled, (state, action) => {
          state.todos = action.payload;
        })
        .addCase(fetchTodos.rejected, () => {
          console.error('Failed to fetch todos.');
        });
  },
});

export const { reviseLockTime ,reviseDescription,newTodoItem,toggleTodoCompleted,removeTodoItem,updateTodoOrder} = todosSlice.actions;
export default todosSlice.reducer;
