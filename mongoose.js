var mongoose=require('mongoose');
mongoose.connect('mongodb://Lytuy:71290@ds145750.mlab.com:45750/mydbs');
console.log('mongodb connect');
module.exports=mongoose;