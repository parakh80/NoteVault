import React, { useContext, useEffect, useRef, useState } from 'react'
import Notecontext from '../context/notes/Notecontext'
import Noteitem from './Noteitem'

import { useNavigate } from 'react-router-dom'
function Notes(props) {
  const context = useContext(Notecontext)
  let Navigate = useNavigate()


  const { notes, fetchAllNote, editNote } = context
  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'))
      props.setProgress(50);
      fetchAllNote()
      props.setProgress(100);
    } else {
      Navigate('/login')
    }

    // eslint-disable-next-line
  }, [])

  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })


  const ref = useRef(null)
  const refClose = useRef(null)

  const updateNote = (currentNote) => {
    console.log('Updating note:', currentNote);
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }
  const onChange = (e) => {

    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    props.setProgress(50);
    console.log('Updating a note' + note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    props.setProgress(100);
    refClose.current.click();
    props.showAlert("Successfully Updated", "success");

  }
  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form className='my-3'>
                <div className='mb-3'>
                  <div className="form-group ">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" autoComplete="off" placeholder="Enter title" required value={note.etitle} onChange={onChange} />
                  </div>
                </div>

                <div className='mb-3'>
                  <div className="form-group ">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" autoComplete="off" id="edescription" name='edescription' placeholder="Enter description" required value={note.edescription} onChange={onChange} />
                  </div>
                </div>

                <div className='mb-3'>
                  <div className="form-group ">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="etag" autoComplete="off" name='etag' placeholder="Enter tag" value={note.etag} onChange={onChange} />
                  </div>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etag.length < 3 || note.edescription.length < 5} type="button" onClick={handleClick} className="btn btn-outline-primary">Update Note</button>

            </div>
          </div>
        </div>
      </div>
      {/* <div className="row my-3">
        <h2>Your Notes</h2>
        
        <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
        })}
        
      </div> */}

      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length > 0
          ? notes.map((note) => (
            <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
          ))
          : <div className="container mx-2">No notes to display</div>
        }
      </div>

    </>
  )
}

export default Notes