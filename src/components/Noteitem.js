import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const generateRandomLightColor = () => {
    const maxBrightness = 200; // Adjust this value for desired brightness level
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      let randomValue = Math.floor(Math.random() * 16);

      // Ensure the generated color is bright enough
      if (randomValue < maxBrightness / 16) {
        randomValue = Math.floor(maxBrightness / 16);
      }

      color += letters[randomValue];
    }

    return color;
  };

  const cardStyle = {
    backgroundColor: generateRandomLightColor(), // Apply random color
  };

  return (
    <div className="col-md-3">
      <div className="card my-3" style={cardStyle}>
        {" "}
        {/* Apply style here */}
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {note.tag}
            <span class="visually-hidden">unread messages</span>
          </span>
          <i
            className="fa-solid fa-pen-to-square mx-3"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
          <i
            className="fa-solid fa-trash-can mx-3"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted successfully", "success");
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
