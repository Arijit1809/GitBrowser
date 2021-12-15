import React,{useState,useEffect} from 'react'
import { useAuth } from '../../AuthContext'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import Repoview from '../Repoview/Repoview'
import AddRepository from '../AddRepository/AddRepository'
import './Homepage.css'

const Homepage = () => {

	let navigate = useNavigate();

	const {auth,loggedUser} = useAuth()

	useEffect(() => {
		if(!auth) navigate('/auth')
		console.log(auth,loggedUser)
	}, [])

	//get repositories from the users array collection and pass it on to the sidebar with the info
	const [repository,setRepository] = useState({ //this is the current repository which we are viewing
		org : "",
		repoName : ""
	})

	const [showModal,setShowModal] = useState(false)

	return (
		<div className='home-container'>
			<div className='home'>
				<Sidebar setRepo={setRepository}/>
				<Repoview repository={repository} setRepo={setRepository}/>
			</div>
			<button className='add-repo' onClick={()=>{setShowModal(true)}}>+</button>
			{showModal&&<AddRepository setModal={setShowModal}/>}
		</div>
		
	)
}

export default Homepage

