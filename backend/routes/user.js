const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).jsom('Error: ' + err))
})

router.route('/reg').post((req, res) => {
    const username = req.body.username;
    const passwort = req.body.passwort;
    const alter = Number(req.body.alter);
    const groesse = Number(req.body.groesse)
    const gewicht = Number(req.body.gewicht);
    const geschlecht = req.body.geschlecht;
    const pal = req.body.pal;

    const newUser = new User({
        username,
        passwort,
        alter,
        groesse,
        gewicht,
        geschlecht,
        pal
    });

    newUser.save()
        .then(() => res.json('User added!!'))
        .catch(err => res.status(401).json('Error: ' + err))

});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(402).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(403).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.passwort = req.body.passwort
            user.alter = Number(req.body.alter);
            user.groesse = Number(req.body.groesse)
            user.gewicht = Number(req.body.gewicht)
            user.geschlecht = req.body.geschlecht
            user.pal = Number(req.body.pal)
            
            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err.response));

        })

        .catch(err => res.status(401).json('Error: ' + err));
});





module.exports = router;