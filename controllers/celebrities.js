const express = require('express');
const router = express.Router();
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
router.get('/', function(req, res) {
    // get all celebrities
    Celebrity.findAll()
    .then(function(celebritiesList) {
        console.log('FOUND ALL celebrities', celebritiesList);
        // res.json({ celebrities: celebritiesList });
        res.render('celebrities/index', { celebrities: celebritiesList })
    })
    .catch(function(err) {
        console.log('ERROR', err);
        res.json({ message: 'Error occured, please try again....'});
    });
});

router.get('/new', function(req, res) {
    res.render('celebrities/new');
});

// GET to Edit page
router.get('/edit/:id', function(req, res) {
    let celebritiesIndex = Number(req.params.id);
    Celebrity.findByPk(celebritiesIndex)
    .then(function(celebrities) {
        if (celebrities) {
            celebrities = celebrities.toJSON();
            res.render('celebrities/edit', { celebrities });
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


router.get('/:id', function(req, res) {
    console.log('PARAMS', req.params);
    let celebritiesIndex = Number(req.params.id);
    console.log('IS THIS A NUMBER?', celebritiesIndex);
    Celebrity.findByPk(celebritiesIndex)
    .then(function(celebrities) {
        if (celebrities) {
            celebrities = celebrities.toJSON();
            console.log('IS THIS A celebrities?', celebrities);
            res.render('celebrities/show', { celebrities });
        } else {
            console.log('This celebrities does not exist');
            // render a 404 page
            res.render('404', { message: 'celebrities does not exist' });
        }
    })
    .catch(function(error) {
        console.log('ERROR', error);
    });
});

/**
 * POST ROUTES
 * */ 

router.post('/', function(req, res) {
    console.log('SUBMITTED FORM', req.body);
    Celebrity.create({
        title: req.body.title,
        length: Number(req.body.length),
        tracks: Number(req.body.tracks),
        year: Number(req.body.year)
    })
    .then(function(newcelebrities) {
        console.log('NEW celebrities', newcelebrities.toJSON());
        newcelebrities = newcelebrities.toJSON();
        res.redirect(`/celebrities/${newcelebrities.id}`);
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
router.put('/:id', function(req, res) {
    console.log('EDIT FORM DATA THAT WAS SUBMITTED', req.body);
    console.log('HERE IS THE ID', req.params.id);
    let celebritiesIndex = Number(req.params.id);
    Celebrity.update({
        title: req.body.title,
        length: Number(req.body.length),
        tracks: Number(req.body.tracks),
        year: Number(req.body.year)
    }, { where: { id: celebritiesIndex } })
    .then(function(response) {
        console.log('AFTER UPDATE', response);
        res.redirect(`/celebrities/${celebritiesIndex}`);
    })
    .catch(function(error) {
        console.log('ERROR', error);
        res.render('404', { message: 'Update was not successful. Please try again.'})
    });
});

/**
 * DELETE
 * */ 
router.delete('/:id', function(req, res) {
    console.log('ID HERE', req.params.id);
    let celebritiesIndex = Number(req.params.id);
    Celebrity.destroy({ where: { id: celebritiesIndex } })
    .then(function(response) {
        console.log('celebrities DELETED', response);
        res.redirect('/celebrities');
    })
    .catch(function(error) {
        console.log('ERROR', error);
        res.render('404', { message: 'celebrities was not deleted, please try again...'});
    })
});

module.exports = router;