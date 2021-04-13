const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var SSE = require('express-sse');
var sse = new SSE();

const app = express();
app.use(express.static('public'));
app.use(bodyParser());

app.get('/countdown', sse.init);

app.post('/toto', function (req, res) {
  console.log(req.body);
  sse.send(req.body.sse);
  res.sendStatus(200);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

function countdown(res, count) {
  res.write('data: ' + count + '\n\n');
  if (count) setTimeout(() => countdown(res, count - 1), 5000);
  else res.end();
}

app.listen(3002, () => console.log('SSE app listening on port 3000!'));
