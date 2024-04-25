import React, { useState, useEffect, useContext } from "react";
import Modal from "./Modal";
import { MdDelete } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import myGif from "./1st.gif";
import "./ProfilePage.css";
import { UserContext } from "../userContext";
import axios from "axios";
import { Navigate } from "react-router-dom";



function App() {
    const [modalOpen, setModalOpen] = useState(false);
    const [toDos, setToDos] = useState([]);
    const [newTodos, setNewTodos] = useState("");
    const { user, setUser } = React.useContext(UserContext);
    const [redirect, setRedirect] = React.useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const getTodos = async () => {
        const { data } = await axios.get("http://localhost:4000/todo");
        setToDos(data);
    };

    useEffect(() => {
        getTodos();
    }, []);


    const handleLogout = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:4000/logout");
        setUser(null);
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to={"/"} />
    }

    const completedTodo = async (id) => {
        const {data} = await axios.put(`http://localhost:4000/todo/complete/${id}`);
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
        const { data } = await axios.post("http://localhost:4000/new/todo", {
            text: newTodos,
            user
        });

        setToDos(prev => [...prev, data]);
        setNewTodos("");
    }

    const deleteToDo = async (id) => {
        const {data} = await axios.delete(`http://localhost:4000/todo/delete/${id}`);
        setToDos(toDos => toDos.filter((item) => item._id !== data._id));
    };

    const AllTodo = toDos.map((item) => {
        return (
            <div key={item._id} className="input flex m-3 flex-row justify-between flex-no-wrap p-6 border-none rounded-md bg-blue-950 hover:scale-105 transition-transform">
                <div className="check">
                    <IoMdCheckmarkCircle id = {item.complete ? "check" : "uncheck"}  onClick={() => completedTodo(item._id)} className={`text-3xl text-green-600 ${(item.complete === true) ? "text-green-600" : "text-white"}`} />
                </div>
                <div className="content text-white">
                    <p className={`text-xl ${(item.complete === true) ? "line-through" : ""}`}>{item.text}</p>
                </div>
                <div className="cross">
                    <MdDelete onClick={() => deleteToDo(item._id)} className="text-3xl text-red-800" />
                </div>
            </div>
        )
    });

    if (user) {
        return (
            <div className="app">
                <img src={myGif} className="bg-image" />
                <h1 className="heading">{`Welcome ${user.userName}`}</h1>
                <button id = "logoutBtn" onClick={handleLogout}>Logout</button>
                <p className="sub-heading">Your Tasks : </p>
                {AllTodo}
                <div className="add-button">
                    <button className="add-button-inner" onClick={openModal}>
                        <FaPlus className="text-3xl text-white-800" />
                    </button>
                    <Modal isOpen={modalOpen} onClose={closeModal}>
                        <h2 className="modal-heading">Add Task</h2>
                        <input onChange={(e) => setNewTodos(e.target.value)} className="input-field" type="text" placeholder="Place your text.." />
                        <button onClick={addTodo} className="add-button-modal">
                            Add Task
                        </button>
                    </Modal>
                </div>
            </div>
        )
    };

    return null;

};

export default App;







/*
import React, { useContext } from "react"
import { UserContext } from "../userContext"
import "./ProfilePage.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

function ProfilePage() {
    const { user, setUser } = useContext(UserContext);
    
    const [redirect , setRedirect] = React.useState(false);

    const handleLogout = async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:4000/logout");
        setUser(null);
        setRedirect(true);
    };

    if(redirect){
        return <Navigate to={"/"} />
    }

    if (user) {
        return (
            <div className="container-1">
                <h3>{user.userName}</h3>
                <button onClick={handleLogout}>Logout</button>
            </div>
        )
    };

    return null;

};

export default ProfilePage;

*/