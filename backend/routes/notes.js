const express =require('express') ;
const Router = express.Router();
const { body, validationResult } =require('express-validator');
const fetchUser  =require('../middleware/fetchUser');
const {fetchNotes,createNote,updateNote,deleteNote}  =require('../controllers/notesController');


//Route 1: fetch user Notes using GET '/api/notes/fetchNote'.  login required!
Router.get('/fetchNotes', fetchUser, fetchNotes )




//Route 2 : Creating a new Note using POST '/api/notes/createNote'.  login required!
Router.post('/createNote',fetchUser, [
    body('title', 'Enter valid title (must be at least 3 characters)').isLength({ min: 3 }),
    body('description', 'Enter valid description (must contain at least 5 characters)').isLength({ min: 5 })
], createNote)


//Route 3: Update user Notes using PUT '/api/notes/updateNote/:id'.  login required!
Router.put('/updateNote/:id', fetchUser, updateNote )


//Route 4: Delete user Notes using Delete '/api/notes/deleteNote/:id'.  login required!
Router.delete('/deleteNote/:id', fetchUser, deleteNote)

module.exports = Router;