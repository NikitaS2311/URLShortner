import mongoose from "mongoose";
//step 1: to connect to mongodb server
try{
    await mongoose.connect("mongodb://localhost:27017/");
    mongoose.set("debug", true);// this will make sure to display the data


}catch(error){
    console.error(error);
    process.exit();
}
// Step - 2 Create Schema

const userSchema = mongoose.Schema({
    name:{type: String, required:true},
    email: {type: String, required: true, unique: true},
    age:{ type:Number, required: true, min: 5},
    createdAt:{type: Date, default: Date.now()},
});

// Step - 3: Creating models
const Users = mongoose.model("User", userSchema);
await Users.create({name:"Nikita", age :31, email:"singh2002"})

await mongoose.connection.close();
