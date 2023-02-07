import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { MdOutlineEditNote } from 'react-icons/md';

// importing moment.js for formatting date string
import moment from 'moment';

function Exercise({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td data-label='Name' className='col col-1'>{exercise.name}</td>
            <td data-label='Reps' className='col col-2'>{exercise.reps}</td>
            <td data-label='Weight' className='col col-3'>{exercise.weight}</td>
            <td data-label='Unit' className='col col-4'>{exercise.unit}</td>
            <td data-label='Date' className='col col-5'>{exercise.date.toLocaleString('en-US').slice(0,10)}</td>
            <td data-label='Edit' className='col col-6 row-icon'><MdOutlineEditNote onClick={() => onEdit(exercise)} /></td>
            <td data-label='Delete' className='col col-7 row-icon'><MdDeleteForever onClick={() => onDelete(exercise._id)} /></td>
        </tr>
    );
}

export default Exercise;