const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PollScheme = new mongoose.Schema({
  pollname:{
      type:String
  },
  
    pollslist:[
      {
        contenstantName:{
            type:String
        },
        votes: [
            {
              user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
              }
            }
          ]
        }
        ]



       

   


});


module.exports= Poll =mongoose.model('poll',PollScheme)

