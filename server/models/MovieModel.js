const {Schema,model}=require("mongoose")


const Schemaformat={
     type:String,
     required:true,
     trim:true
}
const MovieSchema = new Schema({
    Moviename:{
        ...Schemaformat,
        unique:true,
    },
    MovieDirector:{
        ...Schemaformat
    },
    MovieRelese:{
        type:Date,
        ...Schemaformat,
        
    },
    MoviePoster:{
        ...Schemaformat,
       
    },
    // Moviepic:[]

})
const  MovieModel=model("BannerMovie",MovieSchema);
module.exports=MovieModel;