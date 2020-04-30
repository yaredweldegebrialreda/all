var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var Item=new Schema({
    // Define collection and schema for Items
name:{
    type:String
},
price:{
    type:Number
}
},
{
collection:'items'

});
module.exports=mongoose.model('Item',Item)