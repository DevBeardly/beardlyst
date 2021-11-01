const express = require('express'),
      router  = express.Router(),
      User    = require('../models/user')
      middleware = require('../middleware');

// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get a single user
router.get('/:id', middleware.getUser, (req, res) => {
    // res.send('You\'re getting a single user');
    // res.send(res.user.name);
    res.send(res.user.name);
});

// creating a user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name
    });
    
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// updating a user
router.patch('/:id', middleware.getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
 });

// deleting a user
router.delete('/:id', middleware.getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: "User removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;