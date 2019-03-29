//Web config===========================================================
const express = require('express');
const bodyparser=require("body-parser");

// mysql config
const mysql=require("mysql2");
const mysqlCon=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Momei#206405",
  database:"webhook_test"
});
mysqlCon.connect(function(err){
  if(err){
    throw err;xw
  }else{
    console.log("Connected!");
  }
});

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
//Web config End===========================================================


var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/whtest', secret: '0930999' }) 
// 上面的 secret 保持和 GitHub 後台設置的一致
 
function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";
 
  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}
 
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(6666)
 
handler.on('error', function (err) {
  console.error('Error:', err.message)
})
 
handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
  console.log(event.payload.commits[0].message);
  let commitMsg = vent.payload.commits[0].message; 

  run_cmd('sh', ['./deploy.sh'], function(text){ console.log(text) });

  let commitTime = Date.now();
  let insertQuery = "INSERT INTO test1(commit_time, commit_msg) VALUES("+commitTime+", "+commitMsg+")";
  console.log(insertQuery);
  mysqlCon.query(insertQuery, (err, result) => {
    if (err) throw err;
    console.log("Insert successfully!")
  })
})



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use('/', express.static('./'));

app.get('/', (req, res) => {
  res.redirect('/index.html');
});

app.get('/record', (req, res) => {
  let query = "select * from test1";
  mysqlCon.query(query, (err, result) => {
    if (err) throw err;
    let total = {};
    total.title = result;
    res.send(total);
  })
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

