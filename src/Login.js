import { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

export default function Login() {
const navigate = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);
const [errCode, setErrCode] = useState(1);

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
	if (email === '' || password === '') {
		setError(true);
		setErrCode(1);
	} else {
		//setSubmitted(true);
		setError(false);
			const {data} = await fetch('https://101345468-comp-3123-assignment-1-h4ec9e3wi-mohammedvep.vercel.app/api/user/login', {
					method: 'POST',
					body: JSON.stringify({
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
					navigate("/employees");
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
		<h1>User {email} successfully logged in!!</h1>
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
		<h1>User Login</h1>
	</div>

	{/* Calling to the methods */}
	<div className="messages">
		{errorMessage()}
		{successMessage()}
	</div>

	<form>
		{/* Labels and inputs for form data */}

		<label className="label">Email</label>
		<input onChange={handleEmail} className="input"
		value={email} type="email" />

		<label className="label">Password</label>
		<input onChange={handlePassword} className="input"
		value={password} type="password" />

		<button onClick={handleSubmit} className="btn" type="submit">
		Submit
		</button>

		<a href="/signup">New User? Sign up here.</a>
	</form>
	</div>
);
}