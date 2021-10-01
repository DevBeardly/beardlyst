const express = require('express'),
      router  = express.Router(),
      User    = require('../models/user');

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user === null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}

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
router.get('/:id', getUser, (req, res) => {
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
router.patch('/:id', getUser, async (req, res) => {
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
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: "User removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;