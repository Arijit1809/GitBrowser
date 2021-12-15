import React, { useState } from 'react'
import {useAuth} from '../../AuthContext'
import './AddRepository.css'
const AddRepository = ({ setModal }) => {
	const {loggedUser,setLoggedUser} = useAuth()
	const [newRepo, setRepo] = useState({
		org: "",
		repoName: ""
	})
	const addRepo = async (e) => {
		e.preventDefault()
		console.log('Gonna add to the user hehe', newRepo)
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		let raw = JSON.stringify({
			"_id": loggedUser._id,
			"repository": newRepo
		});
		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};
		const updateUser = await fetch("http://localhost:5001/addRepo", requestOptions)
		const userData = await updateUser.json()
		setLoggedUser(userData)
		setModal(false)
	}
	return (
		//full screen background on which if we click the modal closes
		<div className='addRepository-backdrop'>
			{/* the modal that we are gonna enter the details in of the repo */}
			<div className='addRepository-modal'>
				<button className='close-modal' onClick={() => { setModal(false) }}>Close</button>
				<form className='add-repo-form' onSubmit={(e) => { addRepo(e) }}>
					<label>
						Owner/Organization
					</label>
					<input
							type="text"
							onChange={(e) => {
								setRepo((prevValue) => (
									{ ...prevValue, org: e.target.value }
								))
							}}
						/>
					<label>
						Repository Name
					</label>
					<input
							type="text"
							onChange={(e) => {
								setRepo((prevValue) => (
									{ ...prevValue, repoName: e.target.value }
								))
							}}
						/>
					<button type="submit">ADD</button>
				</form>
			</div>
		</div>
	)
}

export default AddRepository
