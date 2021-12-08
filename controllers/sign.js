const express = require('express');
const router = express.Router();

const { Sign } = require('../models');

Sign.create({
    sign_name: '',
    description: '',
    background: '',
    dates: ''
})
.then(function(newSign){
    console.log('NEW SIGN', newSign.toJSON());
})
.catch(function(error) {
    console.log('ERROR', error);
})



/**
 * ============================
 * sign
 * ============================
*/
/**
 * GET ROUTES
 * */ 
// /sign route
router.get('/', function(req, res) {
    // get all sign
    Sign.findAll()
    .then(function(signList) {
        console.log('FOUND ALL sign', signList);
        // res.json({ sign: signList });
        res.render('sign/index', { signs: signList })
    })
    .catch(function(err) {
        console.log('ERROR', err);
        res.json({ message: 'Error occured, please try again....'});
    });
});

router.get('/new', function(req, res) {
    res.render('sign/new');
});

// GET to Edit page
router.get('/edit/:id', function(req, res) {
    let signIndex = Number(req.params.id);
    sign.findByPk(signIndex)
    .then(function(sign) {
        if (sign) {
            sign = sign.toJSON();
            res.render('sign/edit', { sign });
        } else {
            console.log('This sign does not exist');
            // render a 404 page
            res.render('404', { message: 'sign does not exist' });
        }
    })
    .catch(function(error) {
        console.log('ERROR', error);
    });
    
})


router.get('/:id', function(req, res) {
    console.log('PARAMS', req.params);
    let signIndex = Number(req.params.id);
    console.log('IS THIS A NUMBER?', signIndex);
    Sign.findByPk(signIndex)
    .then(function(sign) {
        if (sign) {
            sign = sign.toJSON();
            console.log('IS THIS A sign?', sign);
            res.render('sign/show', { sign });
        } else {
            console.log('This sign does not exist');
            // render a 404 page
            res.render('404', { message: 'sign does not exist' });
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
    Sign.create({
        title: req.body.title,
        length: Number(req.body.length),
        tracks: Number(req.body.tracks),
        year: Number(req.body.year)
    })
    .then(function(newsign) {
        console.log('NEW sign', newsign.toJSON());
        newsign = newsign.toJSON();
        res.redirect(`/sign/${newsign.id}`);
    })
    .catch(function(error) {
        console.log('ERROR', error);
        res.render('404', { message: 'sign was not added please try again...' });
    });
    // res.redirect()
});
/**
 * EDIT
 * */ 
router.put('/:id', function(req, res) {
    console.log('EDIT FORM DATA THAT WAS SUBMITTED', req.body);
    console.log('HERE IS THE ID', req.params.id);
    let signIndex = Number(req.params.id);
    Sign.update({
        title: req.body.title,
        length: Number(req.body.length),
        tracks: Number(req.body.tracks),
        year: Number(req.body.year)
    }, { where: { id: signIndex } })
    .then(function(response) {
        console.log('AFTER UPDATE', response);
        res.redirect(`/sign/${signIndex}`);
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
    let signIndex = Number(req.params.id);
    Sign.destroy({ where: { id: signIndex } })
    .then(function(response) {
        console.log('sign DELETED', response);
        res.redirect('/sign');
    })
    .catch(function(error) {
        console.log('ERROR', error);
        res.render('404', { message: 'sign was not deleted, please try again...'});
    })
});

module.exports = router;