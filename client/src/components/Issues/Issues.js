import React, { useState, useEffect } from 'react'
import './Issues.css'
const Issues = ({ repository,page }) => {
	const [issues, setIssues] = useState()
	const [loading, setLoading] = useState(true)
	const [error,setError] = useState(false)
	useEffect(() => {
		const url = `https://api.github.com/repos/${repository.org}/${repository.repoName}/issues?per_page=30&state=all&page=${page}`
		const getIssues = async () => {
			const issueData = await fetch(url)
			if(issueData.status!==200){
				setError(true)
				setLoading(false)
			}
			else{
				const issuesDataJSON = await issueData.json();
				setIssues(issuesDataJSON)
				setError(false)
				setLoading(false)
			}
		}
		getIssues()
	}, [repository,page])

	if (loading) return <div className='loading'>Loading...</div>
	if(error) return <div className='error'>We are sorry there was an error please try again!</div>
	return (
		<div>
			<div className='issues-container'>
				{issues?.length!=0&&issues?.map((issue) => {
					return (
						<div key={issue.id}>
							<IssueCard issue={issue} />
						</div>
					)
				})}
			</div>
		</div>
	)
}

const IssueCard = ({ issue }) => {
	const {
		title, body, html_url, user, state, comments, created_at
	} = issue
	return (
		<div className='issue-container'>
			<div className='issue-info'>
				<div>
					<h3>{title}</h3>
					<p>{body}</p>
				</div>
				<div className='issue-state'>
					{state}
				</div>
			</div>
			<div className='user-info'>
				<img src={user.avatar_url} />
				<span>{user.login}</span>
			</div>
			<div>
				{comments} comments...
			</div>
		</div>
	)
}

export default Issues
