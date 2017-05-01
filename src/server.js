const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var app = express();

// var logger = (req, res, next) => {
//   console.log('Logging...');
//   next();
// }
// app.use(logger)

//body parser middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, '../public')))

var people = [
  {
    name:'Jeff',
    age:30
  },
  {
    name:'Mavis',
    age:27
  }
]

app.get('/json', (req, res)=>{
  res.send(people)
})


app.listen(3000, () => {
  console.log('Server running on 3000');
})
