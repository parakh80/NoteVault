import React, { useContext, useState } from 'react'
import Notecontext from '../context/notes/Notecontext'
function AddNote(props) {
  const context = useContext(Notecontext)
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    props.setProgress(50);
    e.preventDefault()
    addNote(note.title, note.description, note.tag)
    props.setProgress(100);
    setNote({ title: "", description: "", tag: "" })
    props.showAlert("Added Successfully", "success")
  }

  return (
    <>
      <div className="container my-3">
        <h2>Add Your Note</h2>
        <form className='my-3'>
          <div className='mb-3'>
            <div className="form-group ">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" placeholder="Enter title" value={note.title} required onChange={onChange} />
            </div>
          </div>

          <div className='mb-3'>
            <div className="form-group ">
              <label htmlFor="description">Description</label>
              <input type="text" className="form-control" id="description" name='description' placeholder="Enter description" autoComplete="off" value={note.description} required onChange={onChange} />
            </div>
          </div>

          <div className='mb-3'>
            <div className="form-group ">
              <label htmlFor="tag">Tag</label>
              <input type="text" className="form-control" id="tag" name='tag' autoComplete="off" placeholder="Enter tag" value={note.tag} onChange={onChange} />
            </div>
          </div>

          <button
            type="submit"
            disabled={note.title.trim().length < 3 || note.description.trim().length < 5}
            onClick={handleClick}
            className="btn btn-outline-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default AddNote