import React from "react";
import ReactDOM  from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './AuthContext'
import App from './App.js'
import './index.css'

ReactDOM.render(
	<BrowserRouter>
		<AuthProvider>
			<App/>	
		</AuthProvider>
	</BrowserRouter>,
	document.getElementById("root")
)