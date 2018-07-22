const app = require('express')();
const bodyParser = require('body-parser');
const models = require('./models');
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const profile = require('./routes/profile');
const token = require('./routes/token');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/signup', signup);
app.use('/signin', signin);
app.use('/profile', profile);
app.use('/token', token);

//{force: true}
models.sequelize.sync()
.then(() => {
  app.listen(3000, () => console.log('App listen 3000 port'));
})
.catch(err => console.log('Sequelize sync error ', err));