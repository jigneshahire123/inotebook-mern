const express = require("express");
const router = express.Router();
const middleware = require("../middleware/loginmiddleware");
const Notes = require("../modeules/Notes");
const { body, validationResult } = require("express-validator")

// get all notes
router.get("/fetchAllNotes", middleware, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).send("Internal server error occured!!");
    }
})

// add a note
router.post("/addNote", middleware, [
    body("title", 'Enter a valid title').isLength({ min: 3 }),
    body("description", 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { title, description, tag } = req.body;
    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        // console.log(error);
        res.status(500).send("Internal server error occured!!")
    }
})

// update the note
router.put("/updateNote/:id", middleware, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const note = {};
        if (title) {
            note.title = req.body.title
        }
        if (description) {
            note.description = description
        }
        if (tag) {
            note.tag = tag
        }
        let updateNote = await Notes.findById(req.params.id);
        // console.log(updateNote)
        // console.log(note)

        if (!updateNote) { res.status(404).send("Not found") };
        if (updateNote.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        updateNote = await Notes.findByIdAndUpdate(req.params.id, { $set: note }, { new: true });
        // console.log(updateNote)
        res.json({updateNote});

    } catch (error) {
        // console.log(error);
        res.status(500).send("Internal server error occured!!")
    }
})

// delete the note
router.delete("/deleteNote/:id", middleware, async (req, res) => { 
    try {
    
        let deleteNote = await Notes.findById(req.params.id);

        if (!deleteNote) { res.status(404).send("Not found") };
        if (deleteNote.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
      const deletedNote = await Notes.findByIdAndDelete(req.params.id); 
        res.json({"Sucess": "note deleted", note:deletedNote});

    } catch (error) {
        // console.log(error);
        res.status(500).send("Error");
        // res.status(500).send("Internal server error occured!!",{error})
    }
})


module.exports = router;