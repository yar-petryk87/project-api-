var express = require('express');
var app = express();
var port = process.env.PORT || 8000 ;
var bodyParser = require('body-parser') ;
var path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine' , 'pug')



var user = [
	{
		"id"   :	"1"	,
		"data" : "Еней був парубок моторний"
	} ,

	{
		"id"   :	"2"	,
		"data" : "І хлопець хоть куди козак,"
	} ,

	{
		"id"   :	"3"	,
		"data" : "Удавсь на всеє зле проворний,"
	} ,

	{
		"id"   :	"4"	,
		"data" : "Завзятіший од всіх бурлак."
	} ,

	{
		"id"   :	"5"	,
		"data" : "Но греки, як спаливши Трою,"
	} ,

	{
		"id"   :	"6"	,
		"data" : "Зробили з неї скирту гною,"
	} ,

	{
		"id"   :	"7"	,
		"data" : "Він, взявши торбу, тягу дав;"
	} ,

	{
		"id"   :	"8"	,
		"data" : "Забравши деяких троянців,"
	} ,

	{
		"id"   :	"9"	,
		"data" : "Осмалених, як гиря, ланців,"
	} ,

	{
		"id"   :	"10"	,
		"data" : "П'ятами з Трої накивав."
	} 




]

function fetchUser (id) {
	let data = user.filter(function(element) {

		return element.id == id ;
	});
	return data ;
}

app.get('/' , function (req, res) {
	
  res.render(
  		'index' , 
  		{ heading: `ЕНЕЇДА` ,
  		  strings: user,
  		  params: '' })
 
})

app.get('/get' , function (req, res) {
	let id = req.query.id;
  res.render(
  		'index' , 
  		{ heading: `ЕНЕЇДА ` ,
  		  remark: 'рядок ' + id ,
  		  strings: fetchUser(id),
  		  params: 'id=' + id })
 
});

app.post('/add' , function(req , res) {
	let id = req.query.id;
	let data = fetchUser(id) ;
	var newuser = {
		"id": user[user.length-1].id + 1 ,
		"data": req.body.newraw
	};

	user.push(newuser);
	data.push(newuser);
	

	res.render(
		'index' , {
			heading: `ЕНЕЇДА ` ,
  		  	remark: `додано успішно ` ,
  		  	strings: data,
  		  	params: 'id=' + id
		});
})


app.get('/edit' , function (req, res) {
	let id = req.query.id;
	let data = fetchUser(id) ;

  res.render(
  		'index' , 
  		{ heading: `ЕНЕЇДА` ,
  			strings: [],
  		  buf: data[0],
  		  params: 'id=' + id })
 
})

app.post('/update' , function(req , res) {
	let id = req.query.id;
	user.forEach((usr) => {
		if (usr.id == id) {
			usr.data = req.body.buffer;
		}
	});
	

	

	res.render(
		'index' , {
			heading: `ЕНЕЇДА ` ,
  		  	remark: `success` ,
  		  	strings: []
		});
})

app.listen(port , function() {
	console.log("Everything is OK")
})
