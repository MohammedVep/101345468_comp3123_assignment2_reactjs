import { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';


export default function Signup() {
const navigate = useNavigate();
// States for registration
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);
const [errCode, setErrCode] = useState(1);

// Handling the name change
const handleName = (e) => {
	setName(e.target.value);
	setSubmitted(false);
};

// Handling the email change
const handleEmail = (e) => {
	setEmail(e.target.value);
	setSubmitted(false);
};

// Handling the password change
const handlePassword = (e) => {
	setPassword(e.target.value);
	setSubmitted(false);
};

// Handling the form submission
const handleSubmit = async (e) => {
	e.preventDefault();
	if (name === '' || email === '' || password === '') {
	setError(true);
	} else {
		const {data} = await fetch('https://101345468-comp-3123-assignment-1-h4ec9e3wi-mohammedvep.vercel.app/api/user/signup', {
			method: 'POST',
			body: JSON.stringify({
				username: name,
				email: email,
				password: password,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			}
		})
		.then(function(response) {
			return response.json()
		})
		.then(function(data) {
			console.log(data.message);
			setErrCode(data.message);
			setError(true);
			navigate("/");
		}).catch(error => console.error('Error:', error));
	}
};

// Showing success message
const successMessage = () => {
	return (
	<div
		className="success"
		style={{
		display: submitted ? '' : 'none',
		}}>
		<h1>User {name} successfully registered!!</h1>
	</div>
	);
};

// Showing error message if error is true
const errorMessage = () => {
	return (
	<div
		className="error"
		style={{
		display: error ? '' : 'none',
		}}>
        {errCode===1 ? <h1>Please enter all the fields</h1> : <h1>{errCode}</h1>}
	</div>
	);
};

return (
	<div className="form">
	<div>
		<h1>User Registration</h1>
	</div>

	{/* Calling to the methods */}
	<div className="messages">
		{errorMessage()}
		{successMessage()}
	</div>


    
	<form>
		{/* Labels and inputs for form data */}
		<label className="label">Username</label>
		<input onChange={handleName} className="input"
		value={name} type="text" />

		<label className="label">Email</label>
		<input onChange={handleEmail} className="input"
		value={email} type="email" />

		<label className="label">Password</label>
		<input onChange={handlePassword} className="input"
		value={password} type="password" />

		<button onClick={handleSubmit} className="btn" type="submit">
		Submit
		</button>
	</form>
	</div>
);
}