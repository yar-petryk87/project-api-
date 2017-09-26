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
app.get('/' , function (req, res) {
	
  res.render(
  		'index' , 
  		{ heading: `ЕНЕЇДА` ,
  		  strings: user })
 
})

app.get('/:id' , function (req, res) {
	
	var data = user.filter(function(element) {

		return element.id == req.params.id ;
	});

  res.render(
  		'index' , 
  		{ heading: `ЕНЕЇДА ` ,
  		  remark: `рядок ${req.params.id}` ,
  		  strings: data })
 
});

app.post('/add' , function(req , res) {
	/*var newuser = {
		"id": user[user.length-1].id + 1 ,
		"data": req.body.newraw
	};

	user.push(newuser);*/

	res.render(
		'index' , {
			w: "jr"
		});
	
})



app.listen(port , function() {
	console.log("Everything is OK")
})
