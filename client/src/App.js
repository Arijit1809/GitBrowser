import React from "react";
import {Route,Routes} from 'react-router-dom'
import Auth from "./components/Auth/Auth";
import Homepage from "./components/Homepage/Homepage";
const App = () => {
	return (
			<Routes>
				<Route path="/auth" element={<Auth/>}/>
				<Route index element={<Homepage/>}/>
			</Routes>
	)
}
export default App
