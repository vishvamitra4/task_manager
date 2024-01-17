import Input from "./Input";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { MdDelete } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import myGif from "./1st.gif";

function App() {

  const [modalOpen, setModalOpen] = useState(false);
  const [toDos, setToDos] = useState([]);
  const [newTodos, setNewTodos] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    fetch('http://localhost:3001/todos')
      .then(res => res.json())
      .then(data => setToDos(data))
      .catch(err => console.log(err))
      .then(() => console.log("all todos are fetched!"));
  };

  const completedTodo = async (id) => {
    const data = await fetch(`http://localhost:3001/todo/complete/${id} `, { method: "PUT" }).then(res => res.json());
    if (data) {
      setToDos(toDos => toDos.map((item) => {
        if (item._id === data._id) {
          item.complete = data.complete;
        };
        return item;
      }));
    };
  };

  const addTodo = async () => {
    const data = await fetch(`http://localhost:3001/todo/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newTodos
      }),
    }).then(res => res.json());

    setToDos(prev => [...prev, data]);
    setNewTodos("");

  }

  const deleteToDo = async (id) => {
    const data = await fetch(`http://localhost:3001/todo/delete/${id}`, { method: "DELETE" }).then(res => res.json());
    setToDos(toDos => toDos.filter((item) => item._id !== data.result._id));
  };



  const AllTodo = toDos.map((item) => {
    return (
      <div key={item._id} className="input flex m-3 flex-row justify-between flex-no-wrap p-6 border-none rounded-md bg-blue-950 hover:scale-105 transition-transform">
        <div className="check">
          <IoMdCheckmarkCircle onClick={() => completedTodo(item._id)} className={`text-3xl text-green-600 ${(item.complete === true) ? "text-green-600" : "text-white"}`} />
        </div>
        <div className="content text-white sm:ml-[-50%]">
          <p className={`text-xl ${(item.complete === true) ? "line-through" : ""}`}>{item.text}</p>
        </div>
        <div className="cross">
          <MdDelete onClick={() => deleteToDo(item._id)} className="text-3xl text-red-800" />
        </div>
      </div>
    )
  })





  return (

    <div className="app w-100 md:w-1/2">
      <img src = {myGif} style={{"position": 'fixed' , "top": "0vh", "left": "2vw","z-index": "-3", "filter": "blur(14px)", "width": "47%"}} />
      <h1 className="text-xl md:text-4xl font-extrabold text-white m-4">Welcome Vishvamitra</h1>
      <p className="text-2xl text-white underline m-4">Your Tasks : </p>
      {AllTodo}

      <div className="flex m-4 justify-start items-center h-screen fixed w-4/5">
        <button
          style={{ "position": "fixed", "top": "1vh", "right": "3vw" , "padding" : "2rem" , "borderRadius" : "25%"}}
          className="bg-blue-800  text-white hover:bg-blue-800"
          onClick={openModal}
        >
          <FaPlus className="text-3xl text-white-800" />
        </button>
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
          <input onChange={(e) => setNewTodos(e.target.value)} className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="text" placeholder="place your text.." />
          <button onClick={addTodo} className="bg-transparent my-5 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Add Task
          </button>
        </Modal>
      </div>
    </div>



  )
};

export default App;
