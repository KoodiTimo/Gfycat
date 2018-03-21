bodyParser = require ("body-parser"),
mongoose = require ("mongoose"),
faker = require("faker"),
methodOverride = require("method-override"),
express = require("express"),
generate = require("adjective-animal"),
adjective = require("adjectives"),
app = express();

mongoose.connect("mongodb://localhost/gfycat");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended :true}));
app.use(methodOverride("_method"));
// FAKER ID





// var idea = one+two+three;

// GFYCAT TAIKA-FUNKTIO
function idea(i) {
  var i = i;
  var i = generate.generateName;
  return i;
  console.log(i);
}


var gifSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now()},
  idea: {type: String, default: idea()}
});



var Gif = mongoose.model("Gif", gifSchema);

// 404 NOT found

// RESTFUL ROUTET
app.get("/", function (req, res) {
  res.redirect("/gfycat");
});

// INDEX
app.get("/gfycat", function(req, res) {
  Gif.find({}, function(err, gifs) {
    if(err) {
      console.log("Jokin meni vikaan.");
    } else {
        res.render("index", {gifs: gifs});
    }
  });
});

// NEW Gif
app.get("/gfycat/new", function(req, res){
  res.render("new");
});
// POST GIF
app.post("/gfycat", function(req, res) {

    Gif.create(req.body.gif, function(err, newGif){
      if(err) {
        res.render("new");
      } else {
        res.redirect("/gfycat");

      }
    });
});

// SHOW ROUTE (MAAGINEN OSUUS)
app.get("/gfycat/:idea", function(req, res) {
  Gif.findOne({idea: req.params.idea}, function(err, foundGif) {
    if(err) {

      res.redirect("/gfycat");
    } else {
        res.render("show", {gif: foundGif});
      }
    })
  });
// EDIT ROUTE
app.get("/gfycat/:idea/edit", function(req, res) {
  Gif.findOne({idea: req.params.idea}, function(err, editGif) {

    if(err) {
        res.redirect("/gfycat");
      } else {
          res.render("edit", {gif: editGif});
      }
    })

});

//UPDATE ROUTE
app.put("/gfycat/:idea", function(req, res) {
  Gif.findOneAndUpdate({idea: req.params.idea}, req.body.gif, function(err, updatedGif) {
    if (err) {
      res.redirect("/gfycat");
      console.log("wtf1");
    } else {
        res.redirect("/gfycat/"+req.params.idea);
    }
  })
});

//DESTROY
app.delete("/gfycat/:idea", function(req, res) {

    Gif.findOneAndRemove({idea: req.params.idea}, req.body.gif, function(err, deletedGif) {
      if(err) {
        res.redirect("/gfycat/");

      } else {
        res.redirect("/gfycat/");
      }
    })

});



app.listen(3000, function(){
  console.log("Ylhäällä.");
});
