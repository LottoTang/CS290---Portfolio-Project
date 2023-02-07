import React from 'react';
import Exercise from './Exercise';

function ExerciseList({ exercises, onDelete, onEdit }) {
    return (
        <table id="exercises">
            <caption>Workout records</caption>
            <thead>
                <tr>
                    <th className='col col-1'>Name</th>
                    <th className='col col-2'>Reps</th>
                    <th className='col col-3'>Weight</th>
                    <th className='col col-4'>Unit</th>
                    <th className='col col-5'>Date</th>
                    <th className='col col-6'>Edit</th>
                    <th className='col col-7'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => 
                    <Exercise 
                        exercise={exercise} 
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit} 
                    />)}
            </tbody>
        </table>
    );
}

export default ExerciseList;
