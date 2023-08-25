import React, { useContext, useEffect, useRef ,useState} from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Notes(props) {
  const context = useContext(noteContext);
  let history = useNavigate();
  const { notes, getNotes ,editNote} = context;
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
          },
        });

        const userData = await response.json();
        setUser(userData); // Set the user data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (localStorage.getItem("authToken")) {
      fetchUserData(); // Fetch user data if token is available
      getNotes();
    } else {
      history("/login");
    }
    //eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setnote] = useState({id: "",etitle:"",edescription:"",etag:""})


  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({ id:currentNote._id  ,etitle: currentNote.title, edescription:currentNote.description, etag : currentNote.tag} )
    
  };
  
  const handleClick = (e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated successfully","success")
    
}
const onChange = (e)=>{
    setnote({...note, [e.target.name]: e.target.value})
}
// This code defines a React component called `Notes`.
// It uses the `useContext` hook to access the `noteContext` context,
// which provides access to the notes data.

// The `useEffect` hook is used to fetch the notes data when the component mounts.

// The `updateNote` function is used to open the modal to edit a note.

// The `handleClick` function is used to update the note when the user clicks the "Update Note" button.

// The `onChange` function is used to update the note title and description when the user changes them.

// The `ref` and `refClose` variables are used to keep track of the button that opens and closes the modal.

// The `note` variable is used to store the data for the note that is being edited.

// The `setnote` function is used to update the `note` variable.

// The `props` object contains the `showAlert` function, which is used to show an alert message to the user.

  return (
    <>
     
      <Addnote user={user} showAlert={props.showAlert}/> 
      
      <>
        {/* Button trigger modal */}
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      aria-describedby="emailHelp"
                      value={note.etitle}
                      onChange={onChange}
                      minLength={3}  required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      aria-describedby="emailHelp"
                      onChange={onChange}
                      minLength={3}  required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={note.etag}
                      id="etag"
                      name="etag"
                      onChange={onChange}
                      minLength={3}  required
                    />
                  </div>

                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button disabled={note.etitle.length<3 || note.edescription.length<3} onClick={handleClick} type="button" className="btn btn-primary">
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      <div className="row my-3">
        <h2 className="my-3">Your Notes</h2>
        <div className="container">{notes.length===0 && 'No notes to display'}</div>
        {notes && Array.isArray(notes) && notes.map((note) => {
          return (
            <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
