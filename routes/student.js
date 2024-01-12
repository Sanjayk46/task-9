const express = require('express');
const router = express.Router();
const{student,mentor} = require('../database/database')

router.get('/',async (req,res)=>{
    console.log('get all the students');
    try {
        const studentdata = await student.find();
        res.status(200).send({
            message:"student details displayed successfully",
            data:studentdata
        })
        
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
})

router.post('/',async(req,res)=>{
      console.log('student create route');
    try {
      const createstudent = await student.create({
        name:req.body.name,
        email:req.body.email,
        course:req.body.course,
        mentorAssigned:req.body.mentorAssigned
      })
      
      res.status(200).send({
        message:"student created successfully",
        createstudent
      })
      
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
})
module.exports = router;