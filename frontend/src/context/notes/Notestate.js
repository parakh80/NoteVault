import Notecontext from './Notecontext'
import { useState } from "react";


const Notestate = (props) => {
  // const host = 'http://localhost:4000'
 
  const [notes, setNotes] = useState([])


  const fetchAllNote = async() => {
    //api call
    try{
    // const response = await fetch(`${host}/api/notes/fetchNotes`, {
      const response = await fetch(`/api/notes/fetchNotes`, {
      method: "GET", 
      
      headers: {
        "Content-Type": "application/json",
        "Token": localStorage.getItem('token'),
      }
 
    });
    const resultInJson = await response.json()
 
    setNotes(resultInJson)
  }catch (error) {
    
    console.error('Error updating note:', error);
  }
  }

  const addNote = async(title,description,tag) => {
    //api call
    // const response = await fetch(`${host}/api/notes/createNote`, {
    const response = await fetch(`/api/notes/createNote`, {
      method: "POST", 
      
      headers: {
        "Content-Type": "application/json",
        "Token": localStorage.getItem('token'),
      },

      body: JSON.stringify({title,description,tag}), 
    });
    const resultInJson = await response.json() 
    console.log('Adding a note')
    console.log(notes)
    setNotes(notes.concat(resultInJson ));
  }

  const deleteNote = async(id) => {
   //api call
  //  const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
    const response = await fetch(`/api/notes/deleteNote/${id}`, {
    method: "DELETE", 
    
    headers: {
      "Content-Type": "application/json",
      "Token": localStorage.getItem('token'),
    },

  });
  const resultInJson = await response.json();
     console.log(resultInJson) 
     console.log('deleting note ' + id);
     const newNotes = notes.filter((note) => {return note._id !== id})
     setNotes(newNotes)
  }

  const editNote = async(id,title,description,tag) => {
    try {
      // const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
        const response = await fetch(`/api/notes/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });
  
      const resultInJson = await response.json();
     
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note._id === id
            ? {
                ...note,
                title: resultInJson.updatedNote.title,
                description: resultInJson.updatedNote.description,
                tag: resultInJson.updatedNote.tag,
                advice:  resultInJson.updatedNote.advice!=="" ?resultInJson.updatedNote.advice:""// Check if advice is present in the result
              }
            : note
        )
      );
      // console.log(notes);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }


  return (
    <Notecontext.Provider value={{ notes, addNote, deleteNote, editNote, fetchAllNote }}>
      {props.children}
    </Notecontext.Provider>
  )

}


export default Notestate