import { useState } from "react";
import noteContext from "./noteContext";

// This code defines a React component called `NoteState`.
// It uses the `useState` hook to manage the state of the notes,
// and the `noteContext` to provide access to the notes to its children.

// The `host` variable is the URL of the API that we will be using to fetch and update notes.
// The `notesInitial` variable is an empty array that will be used to initialize the state of the notes.
// The `[notes, setnotes]` variable is a state variable that stores the notes.
// The `getNotes` function fetches all notes from the API and sets the state of the notes.
// The `addNote` function adds a new note to the API and sets the state of the notes.
// The `deleteNote` function deletes a note from the API and sets the state of the notes.
// The `editNote` function edits a note in the API and sets the state of the notes.



const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
   
   const [notes, setnotes] = useState(notesInitial)

     //Get all notes
     const getNotes = async ()=>{
    //TODO API call
       
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method:'GET',
        headers: {
          'Content-Type' : 'application/json',
          'auth-token' : localStorage.getItem('authToken')
        },
       
       });
       console.log(localStorage.getItem('authToken'))
       const json = await response.json();
       console.log(json)
       setnotes(json)
  }

  //Add a note
   const addNote = async (title,description,tag)=>{
    //TODO API call
     
    const response = await fetch(`${host}/api/notes/addnote`, {
      method:'POST',
      headers: {
        'Content-Type' : 'application/json',
        'auth-token' : localStorage.getItem('authToken')
      },
      body: JSON.stringify({title,description,tag})
     });
     const note = await response.json();
     setnotes(notes.concat(note))
     
}

  //Delete a note
  const deleteNote = async (id)=>{
     //API call
    
     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method:'DELETE',
      headers: {
        'Content-Type' : 'application/json',
        'auth-token' : localStorage.getItem('authToken')
      },
     
     });
     const json = await response.json();
    console.log(json);

    console.log("deleting note with id:" + id)
    const newNote = notes.filter((note)=>{return note._id!==id})
    setnotes(newNote);
  }

  //Edit a note
  const editNote = async (id,title,description,tag)=>{
    //API call
    
     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method:'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'auth-token' : localStorage.getItem('authToken')
      },
      body: JSON.stringify({title,description,tag})
     });
     const json = await response.json();
     console.log(json);

     let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setnotes(newNotes);
  }

  return (
    <noteContext.Provider value={{ notes ,addNote, deleteNote,editNote,getNotes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
// The `noteContext.Provider` component is used to provide access to the notes to its children.
// The `value` prop of the `noteContext.Provider` component is an object that contains the notes,
// the functions to fetch, add, delete, and edit notes.

// The `{props.children}` prop is the children of the `NoteState` component.

// The `context API` is a way to share data between components in a React application.
// It is useful for sharing data that is needed by multiple components, such as the notes in this example.
// To use the context API, you first need to define a context object.
// Then, you can use the `useContext` hook to access the context object in your components.

// The `useState` hook is a React hook that lets you manage the state of your components.
// It takes an initial state value as its argument and returns an array of two values: the current state value and a function to update the state.

// The `fetch` function is a JavaScript function that is used to make HTTP requests.
// It takes the URL of the API as its argument and returns a promise.
// The promise is resolved with the response from the API, or rejected if there is an error.

// The `json` function is a JavaScript function that is used to parse JSON data.
// It takes a string of JSON data as its argument and returns an object.
