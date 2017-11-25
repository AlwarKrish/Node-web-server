const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

//middleware
 //dirname stores the path to the directoey

app.use(express.static(__dirname + '/public'));
app.use((req,res,next) => {  //used to keep track server logs
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log',log + '\n' , (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();  //without this the browser wont be able to access the contents though connected to the server
});

app.use((req, res, next) => {
  res.render('maintainance.hbs');
});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/',(req,res) =>{
  //res.send('<i><h1>hello express ji</h1></i>');
  // res.send({
  //   name : 'Alwar',
  //   likes: [
  //     'Biking',
  //     'cities'
  //   ]
  // });
  res.render('root.hbs', {
  pageTitle : 'Home',
  currentYear : new Date().getFullYear(),
  msg : 'welcome to our wepage'
});
});


app.get('/about', (req, res) => {
  res.render('about.hbs' , {
  pageTitle : 'About Page',
  currentYear : new Date().getFullYear()
});
});
app.get('/bad', (req,res) =>{
  res.send({
  errorMessage : 'There is a error'
});
});





app.listen(3000 , () => {
  console.log('The server has started at 3000');
});
