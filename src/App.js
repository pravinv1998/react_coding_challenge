import logo from "./logo.svg";
import "./App.css";
import ReactVirtualizedTable from "./components/Todos";
import BasicTable from "./components/Todos";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState(0);
  const [todoData, setTodoData] = useState({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
      console.log(todos)
  }, [todos]);

  

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${user}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [user]);
  const [input, setInput] = useState("");
  // const handleInput = (value) => {
  //   setInput(value);
  // };

  const handleClick = (todo) => {
    setUser(todo.userId);
    setTodoData(todo);
  };

  const searchData = (todos) => {
    // return todos 
  }
  return (
    <div className="flex flex-col sm:flex-row bg-slate-200  gap-4">
      <div className="p-4   rounded-lg  ">
        <div className="flex  justify-between p-2 ">
          <h1 className="font-semibold sticky top-4 text-xl">Todos</h1>
          <input
            placeholder="Search"
            value={input}
            onChange={(e)=> setInput(e.target.value)}
            className="p-3 text-lg border-b-2 sticky top-4 rounded-md  w-9/12"
            type="text"
          />
        </div>
        <table className="w-full  ">
          <thead className="bg-gray-50 rounded-md border-b-2 sticky top-0 border-gray-200 text-left ">
            <tr>
              <th className="p-3 text-md font-semibold text-left">ID</th>
              <th className="p-3 text-md font-semibold text-left">Title</th>
              <th className="p-3 text-md font-semibold text-left">Status</th>
              <th className="p-3 text-md font-semibold text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y  divide-gray-100">
            {todos.filter(todo => todo.title.toLowerCase().includes(input.toLowerCase())).map((todo) => (
              <tr className="bg-slate-50  " key={todo.id}>
                <td className="p-3 text-sm text-gray-700 font-mono">
                  {todo.id}
                </td>
                <td className="p-3 text-sm capitalize text-gray-700 font-mono">
                  {todo.title}
                </td>
                <td
                  className={`p-3 text-sm ${
                    todo.completed === true
                      ? "text-emerald-500"
                      : "text-red-500"
                  } font-mono `}
                >
                  {todo.completed === true ? "Completed" : "Incompleted"}
                </td>
                <td className="p-3 text-sm text-gray-700 font-mono">
                  <button
                    onClick={() => handleClick(todo)}
                    className="p-3 text-sm active:bg-emerald-300  duration-500  text-emerald-500 border-2 border-emerald-500 rounded-md font-mono "
                  >
                    View User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 ">
        <div className="space-y-4 max-w-lg fixed  border-2 rounded-md p-8 bg-slate-50 sm:sticky top-4">
          <h1 className="font-semibold text-xl " >User Data</h1>
          <h1 className=" font-mono  ">TodoID : {todoData.id} </h1>
          <h1 className=" font-mono capitalize">ToDo Title  :  {todoData.title} </h1>
          <h1 className="font-mono">User ID  :  {todoData.userId} </h1>
          <h1 className="font-mono">Name : {userData.name} </h1>
          <h1 className="font-mono">Email : {userData.email}</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
