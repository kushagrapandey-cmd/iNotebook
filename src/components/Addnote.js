import React from 'react'
import noteContext from "../context/notes/noteContext";
import { useContext , useState } from 'react';
import "../App.css";

const Addnote = (props) =>  {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setnote] = useState({title:"",description:"",tag:""})
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:""})
        props.showAlert("Added successfully","success")
    }
    const onChange = (e)=>{
        setnote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div className="container my-3  form-container">
      <h2>{props.user && props.user.name}- Please add your Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
           <strong> Title </strong> 
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={3}  required
            value={note.title}
          />
         
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
          <strong>Description</strong>  
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength={3}  required
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            <strong>Tag</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            minLength={3}  required
            value={note.tag}
          />
        </div>
      
        <button disabled={note.title.length<3 || note.description.length<3} type="submit" onClick={handleClick} className="btn btn-primary">
          Add Note
        </button>
      </form>
      </div>
  )
}

export default Addnote