import Note  from '../models/Note.js' ;
import { body, validationResult } from 'express-validator';
import { getChatGPTResponse as Gpt } from '../Gpt.js';

export const fetchNotes = async (req, res) => {

    try {
        const notes = await Note.find({user: req.userId});
        const updatedNotes = await Promise.all(notes.map(async (note) => {
            try {
                note.advice = await Gpt(note.description);
            } catch (error) {
                if (error.code === 'rate_limit_exceeded') {
                    console.log('Rate limit exceeded for GPT API');
                } else {
                    console.error('Error generating advice:', error);
                }
            }
            return note; // Return the updated note
          }));
        
          
        
        res.status(201).json( updatedNotes )
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server error' });
    }


}

export const createNote = async (req, res) => {

    //if there are errors return bad request and errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { title, description, tag } = req.body;
        const newNote = await Note.create({ title, description, tag, user: req.userId });
        try {
            newNote.advice = await Gpt(newNote.description);
          
        } catch (error) {
            if (error.code === 'rate_limit_exceeded') {
                console.log('Rate limit exceeded for GPT API');
               
            } else {
                console.error('Error generating advice:', error);
               
            }
        }
        res.status(201).json( newNote );

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server error' });
    }

}

export const updateNote = async (req, res) => {
    try {
        let newNote = {};
        const { title, description, tag } = req.body;
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //finding note i available 
        let oldNote = await Note.findById(req.params.id);
        if (!oldNote) { return res.status(401).send({ error: 'Note is not available' }) };

        //allow update note for owner of note
        if (oldNote.user.toString() !== req.userId) { return res.status(401).send({ error: 'Not allowed!' }) }

       let updatedNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
     
        try {
            updatedNote.advice = await Gpt(updatedNote.description);
         
        } catch (error) {
            if (error.code === 'rate_limit_exceeded') {
                console.log('Rate limit exceeded for GPT API');
                
            } else {
                console.error('Error generating advice:', error);

            }
        }
        res.status(201).json({ updatedNote })

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const deleteNote = async (req, res) => {
    try {
        //finding note i available 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(401).send({ error: 'Note is not available' }) };

        //allow update note for owner of note
        if (note.user.toString() !== req.userId) { return res.status(401).send({ error: 'Not allowed!' }) }

        note = await Note.findOneAndDelete(req.params.id)
        res.status(201).json({ "success":"Note deleted suucessfully" })

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
}