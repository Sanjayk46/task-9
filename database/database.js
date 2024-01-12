const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dbConnection = async ()=>{
    try {
        await mongoose.connect(
            "mongodb+srv://sanjayks8046:Iahdd45uAymNkIEM@zendb.kv2hnw1.mongodb.net/",
            {
                useNewUrlParser:true,
                useUnifiedTopology:true,
                autoIndex:true
            }
        );
        console.log("DB Connected");
        
    } catch (error) {
        console.log(error.message," error in connecting db");
    }
}

const studentSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    mentorAssigned: {
      type:mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "mentor",
    },
  });
  
  const student = mongoose.model("student", studentSchema);
  
  const mentorSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    studentsAssigned: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "student",
        default: null,
      },
    ],
  });
  
  const mentor = mongoose.model("mentor", mentorSchema);
  
  module.exports = { dbConnection, student, mentor };