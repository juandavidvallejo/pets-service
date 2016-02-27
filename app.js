var express        = require("express"), 
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose       = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/pets', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

// Import Models and Controllers
var models = require('./models/pets')(app, mongoose);
var PetsCtrl = require('./controllers/pets');

// Route
var router = express.Router();
router.get('/', function(req, res) {  
   res.send("Hello World!");
});
app.use(router);

// API routers
var pets = express.Router();

pets.route('/pets/')
	.get(PetsCtrl.findAllPetss)
	.post(PetsCtrl.addPets);

pets.route('/pets/:pet')
	.get(PetsCtrl.findByPetId)
	.put(PetsCtrl.updatePets)
	.delete(PetsCtrl.deletePets);

app.use('/api', pets);

// Start Server
app.listen(3000, function(){
	console.log("Server runing on http://localhost:3000");
})