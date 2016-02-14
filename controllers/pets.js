//File: controllers/pets.js
var mongoose = require('mongoose');  
var Pets  = mongoose.model('Pets');

//GET - Return all pets in the DB
exports.findAllPetss = function(req, res) {  
    Pets.find(function(err, pets) {
    if(err) res.send(500, err.message);

    console.log('GET /pets')
        res.status(200).jsonp(pets);
    });
};

//GET - Return a pet with specified ID
exports.findByName = function (req, res) {
    Pets.findOne({
        pet: req.params.pet
    }, function (error, response) {
        if (error || !response) {
            res.status(404).send({
                status: 401,
                message: 'not found'
            });
        } else {
            res.send({
                success: true,
                pet: response
            });
        }
    });
}

//POST - Insert a new pet in the DB
exports.addPets = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var pet = new Pets({
        pet:           req.body.pet,
        name:          req.body.name,
        birthdate:     req.body.birthdate,
        genre:         req.body.genre,
        owner:         req.body.owner
    });

    pet.save(function(err, pet) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(pet);
    });
};

//PUT - Update a register already exists
exports.updatePets = function(req, res) {  
    Pets.findById(req.params.id, function(err, pet) {
        pet.pet   = req.body.petId;
        pet.name   = req.body.name;
        pet.birthdate = req.body.birthdate;
        pet.genre   = req.body.genre;
        pet.owner = req.body.owner;

        pet.save(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(pet);
        });
    });
};

//DELETE - Delete a pet with specified ID
exports.deletePets = function(req, res) {  
    Pets.findById(req.params.id, function(err, pet) {
        pet.remove(function(err) {
            if(err) return res.send(500, err.message);
      res.status(200);
        })
    });
};