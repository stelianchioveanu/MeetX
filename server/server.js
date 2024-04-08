const express = require('express');
const cors = require("cors");
const cookieSession = require("cookie-session");
require('dotenv').config();
const multer = require("multer");
const upload = multer();

var corsOptions = {
    origin: process.env.ORIGIN_CORS
};

const PORT = process.env.PORT;

const app = express();
app.use(cors(corsOptions));

app.use(upload.any());

app.use(
    cookieSession({
      name: process.env.NAME_COOKIE,
      secret: process.env.SECRET_COOKIE,
      maxAge: 24 * 60 * 60 * 1000,
    })
  );

app.get('/', (req, res) => {
  res.send('Welcome to MeetX!');
});

require("./app/routes/auth.routes")(app);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});