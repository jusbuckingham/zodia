const express = require('express');
const router = express.Router();
const axios = require("axios").default;
const { Sign } = require('../models');

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
        res.render('signs/index', { signs: signList })
    })
    .catch(function(err) {
        console.log('ERROR', err);
        res.json({ message: 'Error occured, please try again....'});
    });
});

router.get('/new', function(req, res) {
    res.render('signs/new');
});

// GET to Edit page
router.get('/edit/:id', function(req, res) {
    let signIndex = Number(req.params.id);
    Sign.findByPk(signIndex)
    .then(function(sign) {
        if (sign) {
            sign = sign.toJSON();
            res.render('signs/edit', { sign });
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


router.get('/:id', function(req, res) {
    console.log('PARAMS', req.params);
    let signIndex = Number(req.params.id);
    console.log('IS THIS A NUMBER?', signIndex);
    Sign.findByPk(signIndex)
    .then(function(sign) {
        if (sign) {
            sign = sign.toJSON();
            console.log('IS THIS A sign?', sign);
            res.render('signs/show', { sign });
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
        sign_name: req.body.sign_name,
        description: req.body.description,
        background: req.body.background,
        dates: req.body.dates
    })
    .then(function(newSign) {
        console.log('NEW SIGN', newSign.toJSON());
        newSign = newSign.toJSON();
        res.redirect(`/signs/${newSign.id}`);
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
        sign_name: req.body.sign_name,
        description: req.body.description,
        background: req.body.background,
        dates: req.body.dates
    }, { where: { id: signIndex } })
    .then(function(response) {
        console.log('AFTER UPDATE', response);
        res.redirect(`/signs/${signIndex}`);
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
        res.redirect('/signs');
    })
    .catch(function(error) {
        console.log('ERROR', error);
        res.render('404', { message: 'sign was not deleted, please try again...'});
    })
});

// 3rd party api
// app.get('/', function(req, res) {
// var options = {
//     method: 'POST',
//     url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
//     params: {sign: 'scorpio', day: 'today'},
//     headers: {
//       'x-rapidapi-host': 'sameer-kumar-aztro-v1.p.rapidapi.com',
//       'x-rapidapi-key': ''
//     }
//   };
  
//   axios.request(options).then(function (response) {
//       console.log(response.data);
//   }).catch(function (error) {
//       console.error(error);
//   })

// });

module.exports = router;
