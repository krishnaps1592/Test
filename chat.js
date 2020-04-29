const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/get-number', (req,res)=>{
    res.send('Hello world')
})

app.post('/send-number', (req, res) => {
   
    console.log(req.body)
    io.emit('message', req.body);
    res.sendStatus(200);
  })

  io.on('connection', () =>{
    console.log('a user is connected')
  })

  http.listen('3000',function(){
    
  })

var server = app.listen(3000, () => { 
    console.log(`server is running on port`, server.address().port);
   });