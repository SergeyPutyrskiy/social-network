const express = require('express');
const app = express();
const signupRoutes = require('./routes/signup');

app.get('/', (req, res) => res.send('Hello world!'));
app.use('/signup', signupRoutes);

app.listen(3000, () => console.log('App listen 3000 port'));