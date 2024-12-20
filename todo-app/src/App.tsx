
import { useState } from "react"
import "./App.css"
import Schedule from "./pages/schedulepage"
import Todo from "./pages/todopage"
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [todopage,setTodopage] = useState(true)

  return (
    <>
    <div className="title">
      <div className="todo" onClick={() => setTodopage(true)}>ToDo</div>
      <div className="schedule" onClick={() =>  setTodopage(false)}>Schedule</div>
    </div>
      {todopage ? 
        <Todo/> 
      : 
      <DndProvider backend={HTML5Backend }>
      {/* <DndProvider backend={TouchBackend }> */}
      <Schedule/>
      </DndProvider>
      }
    </>
  )
}

export default App
