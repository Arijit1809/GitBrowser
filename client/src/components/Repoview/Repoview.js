import React,{useState,useEffect} from 'react'
import {useAuth} from '../../AuthContext'
import Branches from '../Branches/Branches'
import Issues from '../Issues/Issues'
import './Repoview.css'
const Repoview = ({repository,setRepo}) => {
	const {loggedUser,setLoggedUser} = useAuth()
	const [error,setError] = useState(true)
	const delRepo = async (e) => {
		e.preventDefault()
		console.log('Gonna del from user', repository)
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		let raw = JSON.stringify({
			"_id": loggedUser._id,
			"repository": repository
		});
		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};
		const updateUser = await fetch("http://localhost:5001/delRepo", requestOptions)
		const userData = await updateUser.json()
		setRepo((prevValue)=>{
			return(
				{
					...prevValue,
					org : "",
					repoName : ""
				}
			)
		})
		setLoggedUser(userData)
		console.log(loggedUser)
	}
	const [tab,setTab] = useState('Branches')
	const [page,setPage] = useState(1)
	useEffect(()=>{
		const url = `https://api.github.com/repos/${repository.org}/${repository.repoName}`
		const getRepo = async () =>{
			const repoData = await fetch(url)
			if(repoData.status==404){
				setError(true)
			} else{
				setError(false)
				const data = await repoData.json();
				console.log(data)
			} 
		}
		getRepo()
	},[repository])
	if(repository.org==='' && repository.repoName==='') return <div className='select-repo-error'>Select a repository</div>
	if(error) return(
		<div className='exist-repo-error'>
			The repository doesnt exist 
			<button onClick={(e)=>{delRepo(e)}}>Delete</button>
		</div>
	)
	if(!error)return (
		<div className='repoview-container'>
			<div className='repoview-repo-info'>
				<h1>
					{repository.org}/{repository.repoName}
				</h1>
				<button className='delete-repo' onClick={(e)=>{delRepo(e)}}>Delete</button>
			</div>
			<div className='repo-container'>
				<div className='tab-select'>
					<div onClick={()=>{setTab('Branches')}}>Branches</div>
					<div onClick={()=>{setTab('Issues')}}>Issues</div>
					<div onClick={()=>{
						setPage(prev=>prev+1)}
						}>Next Page</div>
					<div onClick={()=>{
						page>1?setPage(prev=>prev-1):setPage(prev=>prev)}
						}>Previous Page</div>
				</div>
				<div className='branch-issues-container'>
					{!error&&tab==='Branches'&&<Branches repository={repository} page={page}/>}
					{!error&&tab==='Issues'&&<Issues repository={repository} page={page}/>}
				</div>
			</div>
		</div>
	)
}

export default Repoview
