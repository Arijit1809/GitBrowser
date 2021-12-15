import React,{useState,useEffect} from 'react'
import { useAuth } from '../../AuthContext'
import { useNavigate } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = ({setRepo}) => {

	let navigate = useNavigate();
	const {auth,loggedUser} = useAuth()
	const [repositories,setRepositories] = useState()
	useEffect(() => {
		if(!auth) navigate('/auth')
		else{
			setRepositories(loggedUser.repositories)
		}
	}, [loggedUser])
	const changeRepo=(repository)=>{
		setRepo(repository)
	}
	return (
		<div className='sidebar-container'>
			<div className='sidebar-heading'>
				<h1>Repositories</h1>
			</div>
			<div className='sidebar-list'> 
				{repositories?.map((repository,index)=>{
					return(
						<div className='repo-info' key={index} onClick={()=>{changeRepo(repository)}}>
							<h3>{repository.repoName}</h3>
							{repository.org}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Sidebar
