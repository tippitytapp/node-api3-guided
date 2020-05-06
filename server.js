const express = require('express'); // importing a CommonJS module
const colors = require('colors');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// global middleware
server.use(express.json()); // built in middleware, no need to mpn install it

server.use(function(req, res, next){
  const today = new Date().toISOString();
  console.log(`A Request Just Happened on ${today} with a ${req.method} method to "${req.url}"`.bgWhite.black)
  next();
})

server.use('/api/hubs', gate, role("fellowship"),hubsRouter);


server.use(gate);

/*
check the headers to see if there is a password property.
if there is, call next();
otherwise return status 401 and you {you : "cannot pass!!"} 
if there is no password return status 400 and {message: "speak friend and enter"}*/


server.get('/moria', (req, res)=>{
  res.status(200).json({
    status: 200,
    message: "OK",
    response: " welcome friends!"
  })
})

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function role(roleName){
  return function (req, res, next){
    let role = req.headers.role;
    if (role ===roleName){
      next();
    }else{
      res.status(403).json({
        you: "have no power"
      })
    }
  }
}
function gate(req, res, next){
  if(!req.headers.password){
    res.status(401).json({
      you: "cannot pass!!"
    })
  }else if(req.headers.password !== "mellons"){
    res.status(400).json({
      message: "speak friend and enter!"
    })
  }else{
    next();
  }
}

module.exports = server;
