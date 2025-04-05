import React, {useState} from "react";
import {u4 as uuidv4} from "uuid";

const App = () =>{
  const [text,setText] = useState("")
  const [todos,setTodos] = useState([])

  let id = uuidv4();

  const handleInput = (el) => { 
    setText(el.target.value)
  };

  const handleClick = (e) => {
    let newObj = {
      id: unique_id,
      todotext: text
    };
    setTodos([...todos,newObj]);
  }

  console.log(todos);
  return (
    <div>
      <input type = "text" onChange={handleInput}/>
      <button onClick={handleClick}>Add Todo</button>
      <div>
        <p>TODO LIST</p>
        {
          todos.map ((todo) => {
            return <p>{todo}</p>;
          })
        }
      </div>
    </div>
  );
}

export default App
