const express = require('express');
const router = express.Router();
const { Celebrity } = require('../models');

/**
 * ============================
 * celebrity
 * ============================
*/
/**
 * GET ROUTES
 * */ 
// /celebrity route
router.get('/', function(req, res) {
    // get all celebrity
    celebrity.findAll()
    .then(function(celebrityList) {
        console.log('FOUND ALL celebrity', celebrityList);
        // res.json({ celebrity: celebrityList });
        res.render('celebrity/index', { celebritys: celebrityList })
    })
    .catch(function(err) {
        console.log('ERROR', err);
        res.json({ message: 'Error occured, please try again....'});
    });
});

router.get('/new', function(req, res) {
    res.render('celebrity/new');
});

// GET to Edit page
router.get('/edit/:id', function(req, res) {
    let celebrityIndex = Number(req.params.id);
    celebrity.findByPk(celebrityIndex)
    .then(function(celebrity) {
        if (celebrity) {
            celebrity = celebrity.toJSON();
            res.render('celebrity/edit', { celebrity });
        } else {
            console.log('This celebrity does not exist');
            // render a 404 page
            res.render('404', { message: 'celebrity does not exist' });
        }
    })
    .catch(function(error) {
        console.log('ERROR', error);
    });
    
})


router.get('/:id', function(req, res) {
    console.log('PARAMS', req.params);
    let celebrityIndex = Number(req.params.id);
    console.log('IS THIS A NUMBER?', celebrityIndex);
    celebrity.findByPk(celebrityIndex)
    .then(function(celebrity) {
        if (celebrity) {
            celebrity = celebrity.toJSON();
            console.log('IS THIS A celebrity?', celebrity);
            res.render('celebrity/show', { celebrity });
        } else {
            console.log('This celebrity does not exist');
            // render a 404 page
            res.render('404', { message: 'celebrity does not exist' });
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
    celebrity.create({
        title: req.body.title,
        length: Number(req.body.length),
        tracks: Number(req.body.tracks),
        year: Number(req.body.year)
    })
    .then(function(newcelebrity) {
        console.log('NEW celebrity', newcelebrity.toJSON());
        newcelebrity = newcelebrity.toJSON();
        res.redirect(`/celebrity/${newcelebrity.id}`);
    })
    .catch(function(error) {
        console.log('ERROR', error);
        res.render('404', { message: 'celebrity was not added please try again...' });
    });
    // res.redirect()
});
/**
 * EDIT
 * */ 
router.put('/:id', function(req, res) {
    console.log('EDIT FORM DATA THAT WAS SUBMITTED', req.body);
    console.log('HERE IS THE ID', req.params.id);
    let celebrityIndex = Number(req.params.id);
    celebrity.update({
        title: req.body.title,
        length: Number(req.body.length),
        tracks: Number(req.body.tracks),
        year: Number(req.body.year)
    }, { where: { id: celebrityIndex } })
    .then(function(response) {
        console.log('AFTER UPDATE', response);
        res.redirect(`/celebrity/${celebrityIndex}`);
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
    let celebrityIndex = Number(req.params.id);
    celebrity.destroy({ where: { id: celebrityIndex } })
    .then(function(response) {
        console.log('celebrity DELETED', response);
        res.redirect('/celebrity');
    })
    .catch(function(error) {
        console.log('ERROR', error);
        res.render('404', { message: 'celebrity was not deleted, please try again...'});
    })
});

module.exports = router;