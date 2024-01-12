const router = require('express').Router();
const objId = require('mongoose').Types.ObjectId;
const {student,mentor} = require('../database/database');

router.post('/newMentor',async (req,res)=>{
    try{
    console.log("assigning Mentor to student");
    console.log(req.body);
        const mentorData = await mentor.findById(req.body._id);
        
        mentorData.studentsAssigned = [
            ...mentorData.studentsAssigned,
            ...req.body.studentsArray,
        ];
        mentorData.save();
        //adding mentor to all the respective students
        req.body.studentsArray.forEach(async (stud) => {
            const temp = await student.findById(stud);
            temp.mentorAssigned = req.body.mentorId;
            temp.save();
        });
      res.status(200).send({
        message:"mentor added to students and updated in mentor document too",
        status:true
      })  

    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
})

router.post('/modifyMentor',async (req,res)=>{
    console.log("select one student and Assign one Mentor");
    console.log(req.body);
    try {
        let stud = await student.findById(req.body._id);
        console.log(stud);
        const oldMentorId = stud?.mentorAssigned; //save the old mentor id  for updating studAssignedList later
        stud.mentorAssigned = req.body.newMentorId;
        stud.save()
        //remove that student from oldmentor assignedlist and in new mentor assigned list
        
        //change to oldmentor studentAssigned list
        let oldment = await mentor.findById(oldMentorId);
        console.log(oldment);
        if(oldment.studentsAssigned.length < 0){
            return res.status(200).send({
                message:'oldment',
                oldment
            })
        }else{
            let newAssigned = oldment.studentsAssigned;
            const indexpos = newAssigned.indexOf(new objId(req.body.studentId));
            console.log(indexpos,'index');
            newAssigned.pop(indexpos);
            console.log(newAssigned);
            oldment.studentsAssigned = newAssigned;
        }  
        //filtering that one student and remove from studentList of mentor 
        oldment.save()

        let newment = await mentor.findById(req.body.newMentorId);
        if(newment.studentsAssigned.length < 0){
            return;
        }
        else{
            if(!newment.studentsAssigned?.includes(req.body._id)){
                newment.studentsAssigned=[
                    ...newment.studentsAssigned,
                    req.body.studentId,
                ];
            }
        }
        newment.save();
        res.status(200).send({
            message:"updated mentor to respective student, updated in oldmentor and new mentor studentAssigned list"
        })

    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
})
module.exports = router;