import express from 'express'
const app = express()
import cors from 'cors'
import mongoose from 'mongoose'
import authRoute from './routes/authRoute.js'
import {Users} from './models/User.js'

app.use(express.json())
app.use(cors())
app.use('/auth',authRoute)
app.post('/addRepo',async (req,res)=>{
	console.log("request to add repo")
	const {_id,repository} = req.body
	const user = await Users.findById(_id);
	user.repositories.push(repository)
	const updatedUser = await user.save()
	res.status(200).send(updatedUser)
})
app.post('/delRepo',async (req,res)=>{
	console.log("request to delete repo")
	const {_id,repository} = req.body
	const user = await Users.findById(_id);
	user.repositories = user.repositories.filter((r)=>{
		return(JSON.stringify(r)!=JSON.stringify(repository))
	})
	const updatedUser = await user.save()
	res.status(200).send(updatedUser)
})

const CONNECTION_URL = 'mongodb+srv://gitbrowser:gitbrowser@cluster0.xcdwf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const options = { useNewUrlParser: true, useUnifiedTopology: true }
const PORT = 5001
mongoose.connect(CONNECTION_URL,options,(error)=>{
	if(error){
		console.log(error)
	}else{
		app.listen(PORT,()=>{
			console.log(`Backend server running on port ${PORT} and connected to database`)
		})
	}
})