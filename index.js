const express = require('express');
const app = express();
const router = express.Router();
const path = require('path')
const user = require('./user.json')
/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile(path.join(__dirname, './home.html'));
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  res.sendFile(path.join(__dirname, "./user.json"));
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  
  let status = Boolean;
  let message = "";

  let response = {
    status: status,
    message: message
  }

  let username = user.username;  
  let password = user.password;

  let qUsername = req.query.username;
  let qPassword = req.query.password;

  if(username === qUsername && password === qPassword){
      response.status = true;
      response.message = "User Is Valid"
  }else if(username !== qUsername){
    response.status = false;
    response.message = "User Name is Invalid"
  }else{
    response.status = false;
    response.message = "Password is Invalid"
  }

  res.send(response);
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  let username = req.params.username;
  res.send(`<b>${username} successfully logout.</b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));