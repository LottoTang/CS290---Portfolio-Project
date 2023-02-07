import React from 'react';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const url = "https://cs290-workout-api.onrender.com";

function HomePage({ setExercise }) {
    // Use the history for updating
    const history = useHistory();

    // Use state to bring in the data
    const [exercises, setExercises] = useState([]);

    // RETRIEVE the list of movies
    const loadExercises = async () => {
        const response = await fetch(url+'/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    } 
    
    // UPDATE a movie
    const onEditExercise = async exercise => {
        setExercise(exercise);
        history.push("/edit-exercise");
    }

    // DELETE a movie  
    const onDeleteExercise = async _id => {
        const response = await fetch(url+`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 200) {
            const getResponse = await fetch(url+'/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
            alert("Successfully deleted the exercise!");
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD the exercises
    useEffect(() => {
        loadExercises();
    }, []);

    // DISPLAY the exercises
    return (
        <>
            <article>
                <h2> About Workout!</h2>
                <p>Workout! is an application for tracking your workout records.</p>
                <p>You are achieving your goals! Keep Going</p>
                <hr />
                <ExerciseList
                    exercises={exercises} 
                    onEdit={onEditExercise} 
                    onDelete={onDeleteExercise} 
                />
                <hr />
            </article>
        </>
    );
}

export default HomePage;