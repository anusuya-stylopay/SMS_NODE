const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require('cors');
const session = require("express-session");
const { createLogger, format, transports } = require("winston");

dotenv.config();

const port = process.env.PORT;

const app = express();

// Configure the logger
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console()
  ],
});
module.exports = {app, logger};

// Middleware to log all incoming requests
function logRequest(req, res, next) {
  logger.info({
    message: "Incoming Request",
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });
  next();
}

// Middleware to handle and log errors
function logError(err, req, res, next) {
  logger.error({
    message: "Error Encountered",
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: req.body,
  });
  res.status(500).json({ error: "Internal Server Error" });
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logRequest);
app.use(logError);

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
app.use('/api/otp', require('./src/routes/otpRoutes'));
// app.use('/api/login',  require('./src/routes/loginRoutes'));
app.use('/api/agent', require('./src/routes/agentRoutes'));
app.use('/api/university', require('./src/routes/universityRoutes'));
app.use('/api/course', require('./src/routes/courseRoutes'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
