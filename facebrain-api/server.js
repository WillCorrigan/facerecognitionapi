const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'smartbrain'
  }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');




const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working!') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, knex) })
app.put('/image', (req, res) => { image.handleImage(req, res, knex) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

var port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
})