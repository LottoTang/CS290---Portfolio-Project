import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

const url = 'https://cs290-workout.onrender.com/';

export const EditExercisePage = ({ exercise }) => {
 
    // pre-set the content with that exercise
    const [name, setName] = useState(exercise.name);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);

    // to prevent user refresh the page after pressing 'edit' on an object
    let dateVariable = exercise.date;
    if (dateVariable !== undefined) {
        dateVariable = exercise.date.toLocaleString('en-US').slice(0,10);
    } else {
        dateVariable = exercise.date;
    }

    const [date, setDate] = useState(dateVariable);
    
    const history = useHistory();

    const editExercise = async () => {
        //makes an HTTP request to the endpoint PUT /exericses/${exercise._id} of the REST API
        const response = await fetch(url + `/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name, 
                reps: reps, 
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Successfully edited document!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update document. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push(url + "/");
    }

    return (
        <>
        <article>
            <h2>Edit Record</h2>
            <p>Please replace the relevant information for the update.</p>
            <form onSubmit={(e) => { e.preventDefault();}}>   
                <fieldset>
                    <legend>Workout record</legend>
                    <div className='form-container'>
                        <label htmlFor="name">Exercise</label>
                        <input
                            type="text"
                            placeholder="Name of the exercise"
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
                                placeholder="Number of repetitions"
                                onChange={e => setReps(e.target.value)} 
                                id="reps" 
                                required min="1"/>
                    </div>

                    <div className='form-container'>
                        <label htmlFor="weight">Weight</label>
                        <input
                            type="number"
                            placeholder="Weight of the exercise"
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
                            pattern="\d{2}-\d{2}-\d{4}" />
                    </div>
                    
                    <div className='form-container'>
                        <label htmlFor="submit">
                        <button
                            type="submit"
                            onClick={ editExercise }
                            id="submit"
                        >Submit</button></label>
                    </div>

                </fieldset>
                </form>
            </article>
        </>
    );
}
export default EditExercisePage;