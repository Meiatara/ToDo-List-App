import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "../redux/actions/action";

function TodoList() {
  const DataTodo = useSelector((state) => state.OperationsReducer.DataTodo);
  const dispatch = useDispatch();
  const [addValue, setAddValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editValueId, setEditValueId] = useState(null);
  const [filter, setFilter] = useState("");

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if(addValue === ""){
        alert("Input Is Empty")
    }else{
     let newTodo = {
      id: Date.now(),
      task: addValue,
      status: false,
    };
    dispatch(addTodo(newTodo));
    setAddValue("");   
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if(editValue === ""){
        alert("Input Is Empty")
    }else{
     dispatch(editTodo(editValueId, { task: editValue }));
     setEditValueId(null);
     setEditValue("");
    }
  };

  const handleEdit = (id, task) => {
    setEditValueId(id);
    setEditValue(task);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleComplete = (id, status) => {
    dispatch(editTodo(id, { status: !status }));
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  let filteredTodos = DataTodo;
  if (filter === "active") {
    filteredTodos = DataTodo.filter((todo) => !todo.status);
  } else if (filter === "completed") {
    filteredTodos = DataTodo.filter((todo) => todo.status);
  }

  return (
    <>
      <div className="container">
        <div className="form-container">
          <h1 className="form-header">What's The Plan For Today?</h1>
          <form onSubmit={handleAddSubmit}>
            <input className="input-field" type="text" placeholder="Please Input Your Plan" value={addValue} onChange={(e) => setAddValue(e.target.value)}/>
            <button className="btn btn-primary">Add</button>
          </form>

          <div className="container filter">
            <button className={`btn btn-outline ${filter === "all" ? "active" : ""}`} onClick={() => handleFilterChange("all")}> All
            </button>
            <button className={`btn btn-outline ${filter === "active" ? "active" : ""}`} onClick={() => handleFilterChange("active")}> Active
            </button>
            <button className={`btn btn-outline ${filter === "completed" ? "active" : ""}`} onClick={() => handleFilterChange("completed")}> Completed
            </button>
          </div>

          <div className="list">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((item) => (
                <div key={item.id} className="list-data">
                  <input type="checkbox" checked={item.status} id="check" className="check" onChange={() => handleComplete(item.id, item.status)}/> {editValueId === item.id ? (
                    <form onSubmit={handleEditSubmit} className="edit">
                      <input type="text" placeholder="Edit Todo Anda" value={editValue} onChange={(e) => setEditValue(e.target.value)}/>
                      <button className="btn btn-primary">Save</button>
                    </form>
                  ) : (
                    <>
                      <span style={item.status == true ? { textDecoration: "line-through" } : { textDecoration: "none" }}>{item.task}</span>
                      <div className="btn-wrapper">
                        {!item.status && (<FontAwesomeIcon icon={faPen} onClick={() => handleEdit(item.id, item.task)} className="btn-icon"></FontAwesomeIcon>)}
                        {!item.status && (<FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(item.id)} className="btn-icon"></FontAwesomeIcon>)}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : filter == "completed" ? (
                    <p className="form-text">There's No Completed Task Yet!</p>
                ) : (
                    <p className="form-text">Empty Task List!</p>
                )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;