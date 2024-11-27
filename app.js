const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require('cors');
const session = require("express-session");
const multer  = require('multer');

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: ["http://localhost:4000", "https://webapp-dev.edbucket.com"],
    methods: ["POST", "GET", "PUT", "DELETE ","OPTIONS"],
    credentials: true
}));


app.use(
  session({
    secret: "d}P8'y9;vJY%)ZNcx.za&~", 
    resave: false,                    
    saveUninitialized: true,          
    cookie: {
      maxAge: 86400000,    
      secure: false,                
      httpOnly: true,              
    }
  })
);

// Routes
app.use('/api/signup', require('./src/routes/signupRoutes'));
// app.use('/api/login',  require('./src/routes/loginRoutes'));
app.use('/api/university', require('./src/routes/universityRoutes'));
app.use('/api/course', require('./src/routes/courseRoutes'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
