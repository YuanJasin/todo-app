
import { useState } from "react"
import "./App.css"
import Schedule from "./pages/schedulepage"
import Todo from "./pages/todopage"


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
      <Schedule/>
      }
    </>
  )
}

export default App
