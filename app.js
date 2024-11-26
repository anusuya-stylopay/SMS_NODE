const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require('cors');
// const { mountRoutes } = require("./Routes/routes");
// const sequelize = require("./database/db");
// const UserToken = require("./models/userTokens");
// const User = require("./models/users");
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

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}-${file.originalname}`)
//   }
// })

// const upload = multer({ storage: storage })

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

// mountRoutes(app);
// Routes
app.use('/api/signup', require('./src/routes/signupRoutes'));
app.use('/api/login',  require('./src/routes/loginRoutes'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.post("/uploadFile", upload.single("image"), (req, res) => {
//   // console.log(req.body);
//   console.log(req.file);

//   return res.status(200).send({message: "Your file is uploaded."})
// })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
