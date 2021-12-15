import React,{useState,useEffect} from 'react'
import './Branches.css'
const Branches = ({repository,page}) => {
	const [branches,setBranches] = useState([])
	const [loading,setLoading] = useState(true)
	const [error,setError] = useState(false)
	useEffect(()=>{
		const url = `https://api.github.com/repos/${repository.org}/${repository.repoName}/branches?page=${page}&per_page=30`
		console.log(url)
		const getBranches = async () =>{
			const branchesData = await fetch(url)
			if(branchesData.status!==200){
				setError(true)
				setLoading(false)
			}else{
				const branchesDataJSON = await branchesData.json();
				setBranches(branchesDataJSON)
				setError(false)
				setLoading(false)
			}
		}
		getBranches()
	},[repository,page])
	if(loading) return <div className='loading'>Loading...</div>
	if(error) return <div className='error'>We are sorry there was an error please try again!</div>
	return (
		<div>
			<div>
				{branches?.map((branch,index)=>{
					return(
						<div className='branch-item' key={index}>
							<span>Branch name : </span><span>{branch.name}</span>
							{/* Commit : <span>{branch.commit.url}</span>  */}
							{/* sha for commit : <span>{branch.commit.sha}</span> */}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Branches
