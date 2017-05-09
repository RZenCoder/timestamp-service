const express = require('express');
const app = express();

app.use(express.static('public'))
app.get('/', function(req, res){
  res.send('index.html');
})
app.get('/date/:val', function(req, res, next){
  var val = req.params.val;
  var time = new Date(val);
  var options = {
    day: "numeric",
    month: "long",
    year: "numeric"
  }

  if(isNaN(val)){
    var natural = time.toLocaleDateString("en-uk", options)
    var unix = time.getTime() / 1000;
  }
  else {
    var unix = val;
    var natural = new Date(val * 1000).toLocaleDateString("en-uk", options)
  }

  res.json({"unix": unix, "natural": natural});
})


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  console.log('app is now listening on port 3000');
});
