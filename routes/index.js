var express = require('express');
var router = express.Router();
const userModel= require("../models/users");
const journalModel = require("../models/journal")
const passport =require('passport');
const localStrategy =require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
// Route to render the welcome page
// app.get("/", function(req, res , next) => {
//   res.render('register');
// });


router.post("/register", async function (req, res) {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).send("All fields (username, email, password) are required!");
    }

    // Create a new user object
    const userData = new userModel({ username, email });

    // Register the user with passport-local-mongoose
    await userModel.register(userData, password);

    // Authenticate and redirect to the login page
    passport.authenticate("local")(req, res, function () {
      res.redirect("/journalForm"); // Redirect to the login page after registration
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during registration: " + error.message);
  }
});



router.post("/login", passport.authenticate("local", {
  successRedirect: "/journalForm",  // Redirect to journal form after successful login
  failureRedirect: "/login"         // Redirect to index page if login fails
}), function(req, res) {
  // This function can be left empty or used for any additional tasks
});



// journal api 
// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send("You must be logged in to post a journal entry.");
}

router.get('/journalForm', (req, res) => {
  res.render('journalForm'); 
});

router.get("/login", (req, res) => {
  res.render("login"); 
});

router.post("/journal", isLoggedIn, async (req, res) => {
  try {
    console.log("Incoming data:", req.body);
    console.log("Authenticated user:", req.session.passport.user);

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).send("Title and description are required.");
    }

    const user = await userModel.findOne({ username: req.session.passport.user });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    const newJournal = new journalModel({ title, description, userId: user._id });
    await newJournal.save();

    user.journals.push(newJournal._id);
    await user.save();

    res.redirect("/journal/form");
  } catch (error) {
    console.error("Error creating journal entry:", error);
    res.status(500).send("Error creating journal entry.");
  }
});


router.get("/journal/form", isLoggedIn, (req, res) => {
  res.render("journalForm"); // Render the journal form (journalForm.ejs)
});



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/journalForm");
}

// Add error handling to log the exact issue

router.get('/journalForm', (req, res) => {
  try {
    res.render('journalForm');
  } catch (error) {
    console.error("Error rendering journalForm:", error);
    res.status(500).send("Error rendering journalForm.");
  }
});


// Add a debug log to verify the state

router.get('/journalForm', (req, res) => {
  console.log("Session User:", req.session.passport ? req.session.passport.user : "No user logged in");
  res.render('journalForm');
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/journalEntries",  // Redirect to journal entries page after successful login
  failureRedirect: "/login"            // Redirect to login page if login fails
}), function(req, res) {
  // This function can be left empty or used for any additional tasks
});



// Route to get all journal entries
router.get('/journalEntries', async (req, res) => {
  try {
    const journals = await journalModel.find(); // Fetch all journal entries
    res.render('journalEntries', { journals }); // Pass the journal entries to the view
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
// edit route 
router.get('/edit/:id', async (req, res) => {
  try {
    const journal = await journalModel.findById(req.params.id);  // Make sure you're using journalModel here
    if (!journal) {
      req.flash('error', 'Journal entry not found');
      return res.redirect('/journalEntries');
    }
    res.render('editJournal', { journal });
  } catch (err) {
    console.error(err);
    req.flash('error', 'An error occurred');
    res.redirect('/journalEntries');
  }
});

// Handle the edit form submission
// Handle the edit form submission (PUT request)
router.put('/edit/:id', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      req.flash('error', 'Both title and description are required.');
      return res.redirect('/edit/' + req.params.id);
    }

    const updatedJournal = await journalModel.findByIdAndUpdate(req.params.id, {
      title, description
    }, { new: true });

    req.flash('success', 'Journal entry updated successfully');
    res.redirect('/journalEntries');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to update journal entry');
    res.redirect('/journalEntries');
  }
});



// Update Route - POST
router.post('/edit/:id', function(req, res, next) {
  const journalId = req.params.id;
  const updatedData = {
    title: req.body.title,
    description: req.body.description,
    createdAt: req.body.createdAt // You can omit this if you want it to auto-update
  };
  
  Journal.findByIdAndUpdate(journalId, updatedData, { new: true }, function(err, journal) {
    if (err) return next(err);
    res.redirect('/journalEntries');
  });
});

// DELETE Route to Delete a Journal Entry
router.post('/delete/:id', async (req, res) => {
  try {
    const journalId = req.params.id;

    // Debugging log
    console.log('Attempting to delete journal with ID:', journalId);

    // Ensure the journal exists before deleting
    const journal = await journalModel.findById(journalId);
    if (!journal) {
      console.error('Journal entry not found');
      return res.status(404).send('Journal entry not found');
    }

    // Delete the journal entry
    await journalModel.findByIdAndDelete(journalId);

    console.log('Journal entry successfully deleted');
    res.redirect('/journalEntries'); // Redirect to journal entries page
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    res.status(500).send('Error deleting journal entry');
  }
});



module.exports = router;
