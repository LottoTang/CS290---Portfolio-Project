/*
 * OSU CS290 Assignment 7 - Exercises App 
 *
 * Author : Long To Lotto Tang
 * Time : 18 Nov 2022
 * 
 * File: validate-schema.mjs
 * Description: setting up validatiion rules for the incoming request data
 * 
 * Remarks : reference to:
 * 1) express-validator: https://express-validator.github.io/docs/
 * 
 */

import { body } from 'express-validator';

const validSchema = [
    // setting up the validation rules for the requesting data
    body('name')
        .exists({ checkFalsy: true })
        .withMessage('Name is required and must contain at least 1 non-empty character.'),
    body('reps')
        .exists({ checkFalsy: true }).withMessage('Reps is required.').bail()
        .toInt().isInt({ min: 1 }).withMessage('Reps must be an integer greater than 0.'),
    body('weight')
        .exists({ checkFalsy: true }).withMessage('Weight is required.').bail()    
        .toInt().isInt({ min: 1 }).withMessage('Weight must be an integer greater than 0.'),
    body('unit')
        .exists({ checkFalsy: true }).withMessage('Unit is required.').bail()
        .isIn(['kgs', 'lbs', 'miles', 'mins']).withMessage('Unit must be chosen within the list.')
    /*body('date')
        .exists({ checkFalsy: true }).withMessage('Date is required.')*/
];

export default validSchema;