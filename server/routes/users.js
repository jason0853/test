import express from 'express';
import Validator from 'Validator';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();

function validateInput(data) {

    let errors = {};

    if (Validator.isNull(data.username)) {
        errors.username = 'This field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isNull(data.password)) {
        errors.password = 'This field is required';
    }

    if (Validator.isNull(data.passwordConfirm)) {
        errors.passwordConfirm = 'This field is required';
    }

    if (!Validator.equals(data.password, data.passwordConfirm)) {
        errors.passwordConfirm = 'Passwords must match';
    }

    if (Validator.isNull(data.timezone)) {
        errors.timezone = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

router.post('/', (req, res) => {
    setTimeout(() => {
        const { errors, isValid } = validateInput(req.body);

        if (!isValid) {
            res.status(400).json(errors);
        }
    }, 5000);

});

export default router;
