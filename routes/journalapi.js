// var express = require('express');
// var router = express.Router();
// const journalModel = require("../models/journal");
// const passport =require('passport');
// const localStrategy =require("passport-local");
// passport.use(new localStrategy(userModel.authenticate()));

// router.post("/journal", passport.authenticate('local', { session: false }), async (req, res) => {
//     try {
//       const { title, description } = req.body;
//       const userId = req.user._id; // Get user ID from the authenticated user
  
//       // Validate input
//       if (!title || !description) {
//         return res.status(400).json({ message: "Title and description are required." });
//       }
  
//       // Create a new journal entry
//       const newJournal = new Journal({
//         title,
//         description,
//         userId
//       });
  
//       // Save the journal entry to the database
//       await newJournal.save();
  
//       // Respond with the created journal entry
//       res.status(201).json(newJournal);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error creating journal entry." });
//     }
//   });

//   // Get all journal entries for the authenticated user
// router.get("/journals", passport.authenticate('local', { session: false }), async (req, res) => {
//     try {
//       const userId = req.user._id; // Get user ID from the authenticated user
  
//       // Find all journal entries for the user
//       const journals = await Journal.find({ userId });
  
//       // Respond with the journals
//       res.status(200).json(journals);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error fetching journal entries." });
//     }
//   });

//   // Get a specific journal entry by ID
// router.get("/journal/:id", passport.authenticate('local', { session: false }), async (req, res) => {
//     try {
//       const { id } = req.params;
  
//       // Find the journal by its ID
//       const journal = await Journal.findById(id);
  
//       if (!journal) {
//         return res.status(404).json({ message: "Journal entry not found." });
//       }
  
//       // Respond with the journal
//       res.status(200).json(journal);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error fetching journal entry." });
//     }
//   });

//   // Update a journal entry by ID
// router.put("/journal/:id", passport.authenticate('local', { session: false }), async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { title, description } = req.body;
  
//       // Find the journal entry by its ID
//       const journal = await Journal.findById(id);
  
//       if (!journal) {
//         return res.status(404).json({ message: "Journal entry not found." });
//       }
  
//       // Update the journal entry
//       journal.title = title || journal.title;
//       journal.description = description || journal.description;
  
//       // Save the updated journal entry
//       await journal.save();
  
//       // Respond with the updated journal entry
//       res.status(200).json(journal);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error updating journal entry." });
//     }
//   });
// // Delete a journal entry by ID
// router.delete("/journal/:id", passport.authenticate('local', { session: false }), async (req, res) => {
//     try {
//       const { id } = req.params;
  
//       // Find and delete the journal entry by its ID
//       const journal = await Journal.findByIdAndDelete(id);
  
//       if (!journal) {
//         return res.status(404).json({ message: "Journal entry not found." });
//       }
  
//       // Respond with a success message
//       res.status(200).json({ message: "Journal entry deleted successfully." });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error deleting journal entry." });
//     }
//   });

  


// module.exports = router;