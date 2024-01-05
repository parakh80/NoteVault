import React, {useContext} from 'react'
import Notecontext from '../context/notes/Notecontext'


const Noteitem = (props) => {
    const context = useContext(Notecontext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title font-bold">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <hr />
                      <p className="card-text">{note.advice}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem