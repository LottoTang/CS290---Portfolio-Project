/*
 * OSU CS290 Assignment 7 - Exercises App 
 *
 * Author : Long To Lotto Tang
 * Time : 18 Nov 2022
 * 
 * File: validate-request-schema.mjs
 * Description: show error messages if incoming request (data) is invalid
 * 
 * Remarks : reference to:
 * 1) express-validator: https://express-validator.github.io/docs/
 * 2) YouTube: https://www.youtube.com/watch?v=7i7xmwowwCY&ab_channel=productioncoder
 * 
 */

import { validationResult } from 'express-validator';

function validateRequestSchema(req, res, next) {

    const errors = validationResult(req);

    // if request schema is not valid, show error messages
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json( {Error: Object.values(errors.errors).map(val => val.msg)} );
    }

    // if it is valid, continue the code of the calling function
    next();
}

export default validateRequestSchema;