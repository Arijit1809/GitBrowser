import React, { useState } from 'react'
import { useAuth } from '../../AuthContext'
import './Auth.css'
const Auth = () => {
	const { user, changeUsername, changePassword, login, signup, authError } = useAuth()
	const [authentication, setAuthentication] = useState('Login')
	return (
		<div className='auth-container'>
			<div>
				<form
					className='auth-form'
					onSubmit={(e) => {authentication === 'Login'?login(e):signup(e)}}
				>
					<label>
						Username:
					</label>
					<input
							type="text"
							value={user.username}
							required
							onChange={(e) => {
								changeUsername(e)
							}}
						/>
					<label>
						Password:
					</label>
					<input
							type="password"
							required
							value={user.password}
							onChange={(e) => {
								changePassword(e)
							}}
						/>
					<button type="submit">
						{authentication === 'Login'?'Login':'Signup'}
					</button>
				</form>
				<p className='auth-error'>
					{authError&&authError?.error}
				</p>
				{authentication === 'Login'?<span>Dont have an account? <span className='change-auth' onClick={() => { setAuthentication('Signup') }}>Signup Now</span></span>:<span>Already have an account? <span className='change-auth' onClick={() => { setAuthentication('Login') }}>Login to your account</span></span>}
			</div>
		</div>
	)
}
export default Auth
