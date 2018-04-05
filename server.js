
var express=require('express');

var app=express();
app.use(express.static(__dirname));

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

var User=require('./user');
var user1=new User({
	name:'Petro',
	age:32,
	salary:5000}
)
app.post('/send',function(req,res){
	console.log(req.body);
	if (req.body.id) {
		User.update({_id:req.body.id},
			// {$set:req.body})
			{$set:{name:req.body.name,age:req.body.age,salary:req.body.salary}},function(err,result){
				console.log(result);
				res.send('update');
			})
	}
	var user1=new User(req.body);
	user1.save(function(err,result){
		if(err)console.log(err);
		console.log(result);
		res.send(result)
	})
})
app.get('/allusers',function(req,res){
	User.find(function(err,result){
		console.log(result);
		res.send(result);
	})
})
app.post('/delete',function(req,res){
	var id=req.body.id;
	console.log(id);
	User.remove({_id:id},function(err,result){
		console.log(result);
		res.send('delete user')
	})
})

app.listen(process.env.PORT||8080);
console.log('Run Server!');