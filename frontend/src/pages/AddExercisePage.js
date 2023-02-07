import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const url = 'https://cs290-workout-api.onrender.com/';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');
    
    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch(url + '/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to add exercise, status code = ${response.status}. \n${errMessage.Error}`);
        }
        history.push(url + "/");
    };

    return (
        <>
        <article>
            <h2>Add Record</h2>
            <p>Please fill in all the required field to add a record.</p>
            <form onSubmit={(e) => { e.preventDefault();}}>   
                <fieldset>
                    <legend>Workout record</legend>
                    <div className='form-container'>
                        <label htmlFor="name">Exercise</label>
                        <input
                            type="text"
                            placeholder="Must not be an empty string."
                            value= {name}
                            onChange={e => setName(e.target.value)} 
                            id="exercise" 
                            required
                            pattern="\S+.*"/>
                    </div>
                    
                    <div className='form-container'>
                        <label htmlFor="reps">Repetitions</label>
                            <input
                                type="number"
                                value={reps}
                                placeholder="Must be greater than 0."
                                onChange={e => setReps(e.target.value)} 
                                id="reps" 
                                required min="1"/>
                    </div>

                    <div className='form-container'>
                        <label htmlFor="weight">Weight</label>
                        <input
                            type="number"
                            placeholder="Must be greater than 0."
                            value={weight}
                            onChange={e => setWeight(e.target.value)} 
                            id="weight" 
                            required min="1"/>
                    </div>

                    <div className='form-container'>
                        <label htmlFor="unit">Unit</label>
                        <select name="unit" id="unit" onChange={e => setUnit(e.target.value)} required>
                            <option value="kgs">kgs</option>
                            <option value="lbs">lbs</option>
                            <option value="miles">miles</option>
                            <option value="mins">mins</option>
                        </select>
                    </div>

                    <div className='form-container'>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            placeholder="MM-DD-YY"
                            value={date}
                            onChange={e => setDate(e.target.value)} 
                            id="date"
                            required
                             />
                    </div>
                    
                    <div className='form-container'>
                        <label htmlFor="submit">
                        <button
                            type="submit"
                            onClick={ addExercise }
                            id="submit"
                        >Submit</button></label>
                    </div>

                </fieldset>
                </form>
            </article>
        </>
    );
}

export default AddExercisePage;