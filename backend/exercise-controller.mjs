/*
 * OSU CS290 Assignment 7 - Exercises App 
 *
 * Author : Long To Lotto Tang
 * Time : 18 Nov 2022
 * 
 * File: exercise-controller.mjs
 * Description: as the express server
 * 
 * Remarks : reference to:
 * 1) Course starter code
 * 
 */

import 'dotenv/config';
import express from 'express';
import * as exercises from './exercise-model.mjs';

// middleware for validating the incoming request
import validateRequestSchema from './middleware/validate-request-schema.mjs';
import validSchema from './middleware/validate-schema.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// CREATE controller ******************************************
// create middleware to check the incoming data is valid or not
app.post ('/exercises', validSchema, validateRequestSchema, (req, res) => {
    
    // middleware will guard the invalid schema and show error messages
    // only the valid schema will go through the following code

    exercises.createExercise (
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date,
        )
        // creation success
        .then(exercise => {
            res.status(201).json(exercise);
        })

        // createExercise failed
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Create failed - Request to create document failed.' });
        })
});
        
// RETRIEVE controller ****************************************************
// GET exercise by ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    // get the document by ID
    exercises.findById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Retrieve failed - Document not found.' });
            }         
         })

         //  findByID failed
         .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Retrieve failed - Request to retrieve document failed.' });
        });

});

// GET exercises filtered by any of the properties
app.get('/exercises', (req, res) => {
    let filter = {};
    // set up the filter 
    if(req.query.name !== undefined){
        filter = { name: req.query.name };
    }

    if(req.query.reps !== undefined){
        filter = { reps: req.query.reps };
    }

    if(req.query.weight !== undefined){
        filter = { weight: req.query.weight };
    }

    if(req.query.unit !== undefined){
        filter = { unit: req.query.unit };
    }

    if(req.query.date !== undefined){
        filter = { weight: req.query.date };
    }
    
    // find the document based on the filter 
    exercises.findExercises(filter, '', 0)
        .then(exercises => {
            res.send(exercises);
        })

        // findExercise failed
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Retrieve failed - Request to retrieve documents failed.' });
        });

});

// DELETE Controller ******************************
app.delete('/exercises/:_id', (req, res) => {
    // delete the specific ID
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            // document exists with that id
            if (deletedCount === 1) {
                res.status(204).send();
            // document does not exist with that id
            } else {
                res.status(404).json({ Error: 'Delete failed - Document not found.' });
            }
        })
        // deleteById failed
        .catch(error => {
            console.error(error);
            res.send({ error: 'Delete failed - Request to delete a document failed.' });
        });
});

// UPDATE controller ************************************
app.put('/exercises/:_id', validSchema, validateRequestSchema, (req, res) => {
    
    // middleware will guard the invalid schema and show error messages
    // only the valid schema will go through the following code

    exercises.findById(req.params._id)
        .then(exercise => {
            if (exercise !== null) {
                const update = {};
                if (req.body.name !== undefined)
                    update.name = req.body.name;
                if (req.body.reps !== undefined)
                    update.reps = req.body.reps;
                if (req.body.weight !== undefined)
                    update.weight = req.body.weight;
                if (req.body.unit !== undefined)
                    update.unit = req.body.unit;
                if (req.body.date !== undefined)
                    update.date = req.body.date;
                    
                // update the new information
                exercises.updateExercise({ _id: req.params._id }, update)
                    .then(updateCount => {
                        res.send({ updateCount: updateCount });
                    })
                    // updateExercise failed
                    .catch(error => {
                        console.error(error);
                        res.send({ error: 'Update failed - Request to update a document failed.' });
                    });
                } 
            // exercise is empty
            else {
                res.status(404).json({ Error: 'Update failed - Document not found.' });
            }
        })

        // findById failed
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Update failed - Request to retrieve document failed.' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});