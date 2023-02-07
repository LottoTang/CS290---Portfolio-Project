/*
 * OSU CS290 Assignment 7 - Exercises App 
 *
 * Author : Long To Lotto Tang
 * Time : 18 Nov 2022
 * 
 * File: exercise-model.mjs
 * Description: mongoDB operation
 * 
 * Remarks : reference to:
 * 1) Course starter code
 * 
 */

// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Movies collection using Mongoose.');
    }
});

// SCHEMA: Define the collection's schema.
const exerciseSchema = mongoose.Schema({
	name: { type: String, required: true },
	reps: { type: Number, required: true, min: 1 },
	weight: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true, default: 'kgs'}, 
    date: { type: Date, required: true, default: new Date() }
});

// Compile the model from the schema.
const Exercise = mongoose.model("Exercise", exerciseSchema);

// CREATE model *****************************************
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ 
        name: name, 
        reps: reps, 
        weight: weight,
        unit: unit,
        date: date 
    });
    return exercise.save();
}

// RETRIEVE models *****************************************
// Retrieve based on a filter and return a promise.
const findExercises = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

// Retrieve based on the ID and return a promise.
const findById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

// DELETE based on ID  *****************************************
const deleteById = async (_id) => {
    // pass the target _id
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
};

// UPDATE model *****************************************************
const updateExercise = async (filter, update) => {
    const result = await Exercise.updateOne(filter, update);
    return result.modifiedCount;
}

// Export our variables for use in the controller file.
export { createExercise, findExercises, findById, deleteById, updateExercise }