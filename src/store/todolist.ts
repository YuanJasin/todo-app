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
        return response.data!.filter(item => !item.completed);
    }
);


const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
      setTodos(state, action: PayloadAction<TodoItem[]>) {
          state.todos = action.payload;
          },
    reviseLockTime(state, action: PayloadAction<{ index: number, newLockTime: number }>) {
        const { index, newLockTime } = action.payload;
        state.todos.forEach((v) => {
            if (v.id === index) {
                v.lockTime = newLockTime;
            }
        })
    },
    reviseDescription(state, action: PayloadAction<{ index: number, description: string }>) {
        const { index, description } = action.payload;
        state.todos.forEach((v) => {
            if (v.id === index) {
                v.description = description;
            }
        })
    },
    newTodoItem(state, action: PayloadAction<TodoItem>) {
        state.todos.push(action.payload);
    },
    toggleTodoCompleted(state, action: PayloadAction<number>) {
        const index = action.payload;
        state.todos.forEach((v) => {
            if (v.id === index) {
                v.completed = !v.completed;
                v.lockTime = 0;
            }
        })
    },
    removeTodoItem(state,action: PayloadAction<number>){
      const id = action.payload
       state.todos.forEach((v,i) => {
           if (v.id === id) {
               state.todos.splice(i,1)
           }
       })
    },
    updateTodoOrder(state, action: PayloadAction<{ fromId: number, targetId: number }>) {
      const { fromId, targetId } = action.payload;
      const [movedTodo] = state.todos.splice(fromId, 1);
      state.todos.splice(targetId, 0, movedTodo);
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

export const {setTodos, reviseLockTime ,reviseDescription,newTodoItem,toggleTodoCompleted,removeTodoItem,updateTodoOrder} = todosSlice.actions;
export default todosSlice.reducer;
