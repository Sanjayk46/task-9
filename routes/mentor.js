const express = require('express');
const router = express.Router()
const { mentor } = require('../database/database')
router.get('/',async (req,res)=>{
    console.log('get all mentors');
    try {
        const data = await mentor.find();
        res.send(data);      
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
})

router.post('/',async(req,res)=>{
    console.log('mentor create route');
    console.log(req.body);
    try {
        const mentorData = await mentor.create({
            name:req.body.name,
            email:req.body.email,
            expertise:req.body.expertise,
            studentsAssigned:req.body.studentsAssigned
        })
        res.status(200).send({
            message:"mentor data created successfully",
            mentorData
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
})

router.get('/:id',async(req,res)=>{
    console.log('show all students for particular mentor');
    try {
        const showstudentsTomentor = await mentor
        .findById(req.params.id)
        .populate("studentsAssigned","name");
    res.status(200).send({
        message:"show all students for particular mentor",
        showstudentsTomentor
    })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
})

module.exports = router;