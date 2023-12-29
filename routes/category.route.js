const express = require('express');
const router = express.Router();

const { body, param, validationResult } = require('express-validator');

const categoryController = require('../controllers/category.controllers');

const idValidator = () => {
    return [
        param('id').isNumeric().withMessage('Enter only number')
    ]
    //  το return ειναι πινακας γιατι θα μπορουσα να κανω και αλλους ελεγχους
}

const updateValidator = () => {
    return [
        param('id').isNumeric().withMessage('Enter only number'),
        body('id').isNumeric().withMessage("Enter only number"),
        body('id').not().isEmpty().withMessage("field is required"),
        body('name').not().isEmpty().withMessage("The field is required"),
        body('name').isString().withMessage("Enter only letters")
    ]
}

const nameValidator = () => {
    return [
        body('name').not().isEmpty().withMessage("The field is required"),
        body('name').isString().withMessage("Enter only letters")
    ]
}

router.get('/',categoryController.findAll);
router.get('/:id', idValidator(),(req, res, next)=> { // το return της idValidator περνάει στο req
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({   // αν τα errors δεν ειναι κενα τοτε εμφανισε το μνμ του λαθους αλλιως πηγαινε στο Next
            status: false,
            data: errors.array()
        });
    }
    next()
},categoryController.findOne);
router.post('/', nameValidator(), (req, res, next)=> {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({  
            status: false,
            data: errors.array()
        });
    }
    next()
},categoryController.create);
router.patch('/:id', updateValidator(), (req, res, next)=> {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({  
            status: false,
            data: errors.array()
        });
    }
    next()
}, categoryController.update);
router.delete('/:id', idValidator(), (req, res, next)=> {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            status: false,
            data: errors.array()
        })
    }
    next()
}, categoryController.delete);

module.exports = router;
