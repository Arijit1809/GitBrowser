import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
	username : {
		type: String,
		required : true,
		unique : true
	},
	password:{
		type: String,
		required : true,
	},
	repositories : {
		type: [],
	}
})

export const Users = mongoose.model('User',UserSchema)