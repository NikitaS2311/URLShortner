import mongoose from 'mongoose';

try{
    await mongoose.connect("mongodb://localhost:27017/mongoose_middleware");
}catch(error){
    console.error(error);
    process.exit();
}

const userSchema = mongoose.Schema({
    name:{type: String, required:true},
    email: {type: String, required: true, unique: true},
    age:{ type:Number, required: true, min: 5},
    createdAt:{type: Date, default: Date.now()},
    updatedAt:{type: Date, default: Date.now()},
});

//step  2: creating a model
const Users = mongoose.model("user", userSchema)

//step3: insert the data
await Users.updateOne({ email:"singh2002nikki"},{$set: {age:21}});
await mongoose.connection.close();