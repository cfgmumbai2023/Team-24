//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const multer = require('multer');
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const mysql = require('mysql');
const csv = require('fast-csv');
const app = express();

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "test"
// })
// db.connect(function (err) {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Connected to database.');
// })
// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './uploads/')    
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
 
// var upload = multer({
//     storage: storage
// });
// app.post('/import-csv', upload.single("import-csv"), (req, res) =>{
//     uploadCsv(__dirname + '/uploads/' + req.file.filename);
//     console.log('File has imported :' + err);
// });
// function uploadCsv(uriFile){
//     let stream = fs.createReadStream(uriFile);
//     let csvDataColl = [];
//     let fileStream = csv
//         .parse()
//         .on("data", function (data) {
//             csvDataColl.push(data);
//         })
//         .on("end", function () {
//             csvDataColl.shift();
  
//             db.connect((error) => {
//                 if (error) {
//                     console.error(error);
//                 } else {
//                     let query = 'INSERT INTO users (id, name, email) VALUES ?';
//                     db.query(query, [csvDataColl], (error, res) => {
//                         console.log(error || res);
//                     });
//                 }
//             });
             
//             fs.unlinkSync(uriFile)
//         });
  
//     stream.pipe(fileStream);
// }
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
  email: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);

    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
// multer used
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
  })
  const maxSize = 1 * 1000 * 1000;
  var upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        // var filetypes = /csv;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// csvfile is the name of file attribute
}).single("csvfile");
app.post("/uploadProfilePicture",function (req, res, next) {
        
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    upload(req,res,function(err) {
  
        if(err) {
  
            // ERROR occurred (here it can be occurred due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
        }
        else {
  
            // SUCCESS, image successfully uploaded
            alert("file uploaded")
        }
    })
})
app.get("/", function(req, res){
  res.render("home");
});
app.get("/admin",function(req,res)
{
  res.render("admin")
})
app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
  });

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});


app.get("/submit", function(req, res){
  if (req.isAuthenticated()){
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

// app.get("/update",function(req,res)
// {
//   res.write("form.html")
// })
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

app.post("/register", function(req, res){

  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
    //   res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/");
      });
    }
  });

});

app.post("/login", function(req, res){

  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.sendFile(__dirname+"/upload.html");
      });
    }
  });

});
app.get("/form",function(req,res)
{
  res.render("form");
})
app.post("/form",function(req,res)
{
  console.log("submitted")
})
app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
