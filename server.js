const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const passport = require('passport')
const users = require('./Routes/API/users');
const app = express();

app.use(
    bodyParser.urlencoded({
        extended:false
    })
)
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;
mongoose.connect(
    db, {useNewUrlParser:true}
)
.then(() => console.log('Connected!'))
.catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport');
//Routes
app.use('/api/users',users);
//Routes END
const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server running on port ${port}`));