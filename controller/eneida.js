var express = require('express');
var app = express();
var port = process.env.PORT || 8000 ;
var bodyParser = require('body-parser') ;
var path = require('path');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine' , 'pug')

var eneida = require('./model/eneida');

function fetchUser (id) {
	let data = eneida.filter(function(element) {

		return element.id == id ;
	});
	return data ;
}

app.get('/' , function (req, res) {
	
  res.render(
  		'index' , 
  		{ heading: `ЕНЕЇДА` ,
  		  strings: eneida,
  		  params: '' })
 
})

app.get('/get' , function (req, res) {

	let id = req.query.id;
  res.render(
  		'info' , 
  		{ heading: `ЕНЕЇДА ` ,
  		  remark: 'рядок ' + id ,
  		  strings: fetchUser(id),
  		  params: 'id=' + id })
 
});



app.post('/add' , function(req , res) {
	let id = req.query.id;
	let data = fetchUser(id) ;
	var newrow = {
		"id": eneida[eneida.length-1].id + 1 ,
		"data": req.body.newraw
	};

	eneida.push(newrow);
	data.push(newrow);
	res.redirect('/');
	res.render(
		'index' , {
			heading: `ЕНЕЇДА ` ,
  		  	remark: `додано успішно ` ,
  		  	strings: data,
  		  	params: 'id=' + id
		});
});


app.get('/edit' , function (req, res) {
	let id = req.query.id;
	let data = fetchUser(id) ;

  res.render(
  		'index' , 
  		{ heading: `ЕНЕЇДА` ,
  		  strings: [],
  		  buf: data[0],
  		  params: 'id=' + id });

 
})

app.post('/update' , function(req , res) {
	let id = req.query.id;
	eneida.forEach((usr) => {
		if (usr.id == id) {
			usr.data = req.body.buffer;
			res.redirect('/');
		}
	});
	
	res.render(
		'index' , {
			heading: `ЕНЕЇДА ` ,
  		  	remark: `success` ,
  		  	strings: []
		});

});


app.post('/delete' , function(req , res) {
	let  row_id = req.body.row_id;
	eneida = eneida.filter(function(usr) {
		return usr.id != row_id;
	});
	//res.redirect('/');
	res.render('index' , {
	 heading: `ЕНЕЇДА `, 
	 remark: `the row ${row_id} deleted`, 
	 strings: eneida });

});

app.listen(port , function() {
	console.log("Everything is OK")
})

module.exports = app ;