const express = require('express');
const http = require('http');

const mongoose = require('mongoose');
const user = require('./models/data');
const methodOverride = require('method-override')




mongoose.connect("mongodb://localhost/rest_app");

const app = express();
const server = http.createServer(app);
app.set('view engine', 'ejs')
var bodyParser = require('body-parser');

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.get('/', async (request, response) => {
  
  let user1 = await user.find();

  response.render('index', { user1: user1 });
})

app.get('/sign_up', function (req, res) {
  res.render('register');
});
app.get('/login', function (req, res) {
  res.render('login');
});
app.post('/register', async (req, res) => {
 
      let users = new user({
          restname: req.body.restname,
          category: req.body.category,
          city: req.body.city,
          state: req.body.state
      });
      await users.save();
    
   res.redirect('/');
  
});
app.get('/edit/:id', async (request, response) => {
  let blog = await user.findById(request.params.id);
  response.render('edit', { blog: blog });
});
app.put('/:id', async (request, response) => {
  request.blog = await user.findById(request.params.id);
  let blog = request.blog;
  blog.restname = request.body.restname;
  blog.category= request.body.category,
  blog.city = request.body.city;
  blog.state = request.body.state;

  
  
  try {
    blog = await blog.save();
    
    response.redirect('/');
  } catch (error) {
    console.log(error);
    response.redirect(`/seblogs/edit/${blog.id}`, { blog: blog });
  }
});

app.delete('/:id', async (request, response) => {
  await user.findByIdAndDelete(request.params.id);
  response.redirect("/");
});

  
server.listen(3000, function(){
    console.log("server is listening on port: 3000");
});