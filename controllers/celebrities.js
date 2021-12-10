const express = require('express');
const router = express.Router();
const axios = require("axios").default;
const { Celebrity } = require('../models');

/**
 * ============================
 * Celebrity
 * ============================
*/
/**
 * GET ROUTES
 * */
// /celebrities route
router.get('/', function (req, res) {
    // get all celebrities
    Celebrity.findAll()
        .then(function(celebrityList) {
            console.log('FOUND ALL celebrities', celebrityList);
            // res.json({ celebrities: celebritiesList });
            res.render('celebrities/index', { celebrities: celebrityList })
        })
        .catch(function(err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again....' });
        });
});

router.get('/new', function (req, res) {
    res.render('celebrities/new');
});

// GET to Edit page
router.get('/edit/:id', function (req, res) {
    let celebritiesIndex = Number(req.params.id);
    Celebrity.findByPk(celebritiesIndex)
        .then(function(celebrity) {
            if (celebrity) {
                celebrity = celebrity.toJSON();
                res.render('celebrities/edit', { celebrity });
            } else {
                console.log('This celebrities does not exist');
                // render a 404 page
                res.render('404', { message: 'celebrities does not exist' });
            }
        })
        .catch(function(error) {
            console.log('ERROR', error);
        });

})


router.get('/:id', function (req, res) {
    console.log('PARAMS', req.params);
    let celebrityIndex = Number(req.params.id);
    console.log('IS THIS A NUMBER?', celebrityIndex);
    Celebrity.findByPk(celebrityIndex)
        .then(function(celebrity) {
            if (celebrity) {
                celebrity = celebrity.toJSON();
                console.log('IS THIS A celebrity?', celebrity);
                res.render('celebrities/show', { celebrity });
            } else {
                console.log('This celebrities does not exist');
                // render a 404 page
                res.render('404', { message: 'celebrities does not exist' });
            }
        })
        .catch(function (error) {
            console.log('ERROR', error);
        });
});

/**
 * POST ROUTES
 * */

router.post('/', function (req, res) {
    console.log('SUBMITTED FORM', req.body);
    Celebrity.create({
        name: req.body.name,
        dob: req.body.dob,
        sign_name: req.body.sign_name
    })
        .then(function(newCelebrity) {
            console.log('NEW celebrities', newCelebrity.toJSON());
            newCelebrity = newCelebrity.toJSON();
            res.redirect(`/celebrities/${newCelebrity.id}`);
        })
        .catch(function(error) {
            console.log('ERROR', error);
            res.render('404', { message: 'celebrities was not added please try again...' });
        });
    // res.redirect()
});
/**
 * EDIT
 * */
router.put('/:id', function (req, res) {
    console.log('EDIT FORM DATA THAT WAS SUBMITTED', req.body);
    console.log('HERE IS THE ID', req.params.id);
    let celebrityIndex = Number(req.params.id);
    Celebrity.update({
        name: req.body.name,
        dob: req.body.dob,
        sign_name: req.body.sign_name
    }, { where: { id: celebrityIndex } })
        .then(function(response) {
            console.log('AFTER UPDATE', response);
            res.redirect(`/celebrities/${celebrityIndex}`);
        })
        .catch(function(error) {
            console.log('ERROR', error);
            res.render('404', { message: 'Update was not successful. Please try again.' })
        });
});

/**
 * DELETE
 * */
router.delete('/:id', function (req, res) {
    console.log('ID HERE', req.params.id);
    let celebrityIndex = Number(req.params.id);
    Celebrity.destroy({ where: { id: celebrityIndex } })
        .then(function(response) {
            console.log('CELEBRITY DELETED', response);
            res.redirect('/celebrities');
        })
        .catch(function(error) {
            console.log('ERROR', error);
            res.render('404', { message: 'celebrities was not deleted, please try again...' });
        })
});



module.exports = router;