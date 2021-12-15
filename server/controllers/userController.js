import { Users } from '../models/User.js'

export const login = async (req, res) => {
	console.log("Recieved request for Login")
	const { username, password } = req.body
	const findUser = await Users.findOne({ username })
	if (!findUser) res.status(401).send({ error: "Username does not exist" })
	else {
		const isPasswordCorrect = findUser.password == password
		if (isPasswordCorrect) {
			res.status(200).send(findUser)
		} else {
			res.status(401).send({ error: "You have entered the wrong password" })
		}
	}
}

export const signup = async (req, res) => {
	console.error("Recieved request for Signup")
	const { username, password } = req.body
	const findUser = await Users.findOne({ username })
	if (findUser) res.status(401).send({ error: "Username already taken" })
	else {
		const newUser = new Users({ username, password })
		const response = await newUser.save()
		res.status(200).send(response)
	}
}