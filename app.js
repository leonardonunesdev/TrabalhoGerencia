var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cmd = require('node-cmd');
var $ = require('jquery');

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

var urlencodeParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

//direciona para a tela de Host Resource
app.get('/host', function (req, res) {
    res.sendFile(__dirname + "/host-resources.html");
})

//direciona para a tela de UC Davies
app.get('/uc', function (req, res) {
    res.sendFile(__dirname + "/uc-davies.html");
})

//pega o valor dos inputs das páginas e executa esse valor no prompt do computador e retorna o resultado para a a tela de "Resultado" 
app.post('/processUc', urlencodeParser, function (req, res) {
    var oid = req.body.oid.toString();
    console.log("OID: "+oid);
    cmd.get(oid, function (err, data, stderr) {
        console.log("Resultado:"+data);
        res.end(data);
    })
})

app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000.");
})