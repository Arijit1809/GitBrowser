import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext()
export const useAuth = () => {
	return useContext(AuthContext)
}
export const AuthProvider = ({ children }) => {
	let navigate = useNavigate()
	const[auth,setAuth] = useState(false)
	const [authError,setAuthError] = useState()
	const [loggedUser,setLoggedUser] = useState()
	const [user, setUser] = useState({
		username: '',
		password: ''
	})
	const login = async (e) => {
		e.preventDefault()
		const uri = 'http://localhost:5001/auth/login'
		const method = 'POST'
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		const response = await fetch(uri,{
			method,
			headers,
			body : JSON.stringify(user)
		})
		if(response.status==401 || response.status==404){
			let data = await response.json()
			setAuthError(data);
			setAuth(false);
		}else{
			let data = await response.json()
			setLoggedUser(data);
			setAuth(true)
			navigate("/")
			console.log(loggedUser);
		}
	}
	const signup = async (e) => {
		e.preventDefault()
		const uri = 'http://localhost:5001/auth/signup'
		const method = 'POST'
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		const response = await fetch(uri,{
			method,
			headers,
			body : JSON.stringify(user)
		})
		if(response.status==401 || response.status==404){
			let data = await response.json()
			setAuthError(data);
			setAuth(false);
		}else{
			let data = await response.json()
			setLoggedUser(data);
			setAuth(true)
			navigate("/")
			console.log(loggedUser);
		}
	}
	const changeUsername = (e) => {
		e.preventDefault()
		setUser(
			prevValue => (
				{
					...prevValue,
					username: e.target.value
				}
			)
		)
	}
	const changePassword = (e) => {
		e.preventDefault()
		setUser(
			prevValue => (
				{
					...prevValue,
					password: e.target.value
				}
			)
		)
	}
	return (
		<AuthContext.Provider value={{user,changeUsername,changePassword,login,signup,auth,loggedUser,setLoggedUser,authError}}>
			{children}
		</AuthContext.Provider>
	)
}