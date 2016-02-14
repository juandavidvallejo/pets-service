exports = module.exports = function(app, mongoose) {

  var petSchema = new mongoose.Schema({
  	pet:         { type: Number },
    name:        { type: String },
    birthdate:   { type: Date },
    genre:       { type: String, enum:
      ['Perro', 'Gato']
    },
    owner:       { type: Number }
  });

  mongoose.model('Pets', petSchema);

};