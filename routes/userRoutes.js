const express = require("express");
const User = require("./../models/userModel");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const showAllData = await User.find();
    res.status(200).json(showAllData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const singleUser = await User.findById({_id: id});
    res.status(200).json(singleUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req,res)=> {
    try {
        const {id} = req.params;
        const deleteUser = await User.findByIdAndDelete({_id: id});
        res.status(200).json(deleteUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});

router.patch("/:id", async (req, res)=> {
    try {
        const {id} = req.params;
        const {name, email, age} = req.body;
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
