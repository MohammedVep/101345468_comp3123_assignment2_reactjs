import { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
export default function AddEmployee() {
    const navigate = useNavigate();
    const [emObj, setemObj] = useState({_id: '', first_name: '', last_name: '', email: '', gender: '', salary: ''});
    const [fname, setfName] = useState('');

    const location = useLocation();

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const successMessage = () => {
        return (
        <div
            className="success"
            style={{
            display: submitted ? '' : 'none',
            }}>
            <h1>User {fname} successfully registered!!</h1>
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
            <h1>Please enter all the fields</h1>
        </div>
        );
    };
    // Handling the name change
    const handlefName = (emp) => {
        emObj.first_name = emp.target.value;
      //  setSubmitted(false);
    };
    const handlelName = (emp) => {
        emObj.last_name = emp.target.value;
       // setSubmitted(false);
    };
    const handleGender = (emp) => {
        emObj.gender = emp.target.value;
      //  setSubmitted(false);
    };
    const handleSalary = (emp) => {
        emObj.salary = emp.target.value;
        //setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (emp) => {
        emObj.email = emp.target.value;
       // setSubmitted(false);
    };

    const handleSubmit = async (emp) => {
        emp.preventDefault();
        if (emObj.first_name === '' || emObj.last_name === '' || emObj.email === '' || emObj.gender === '' || emObj.salary === '') 
        {
        setError(true);
       } else {
            console.log(JSON.stringify(emObj));

          const {data} = await fetch("https://101295960-comp-3123-assignment1-o3o554exa-anik1204.vercel.app/api/employees/", {
                method: 'POST',
                body: JSON.stringify(emObj),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then(function(response) {
                console.log(JSON.stringify(emObj));

                return response.json();
            })
            .then(function(data) {
              //  console.log(JSON.stringify(emObj));

                console.log(data.message);
               navigate("/employees");  
            }).catch(error => console.error('Error:', error));
       }
    };
    return(
        
        <div className="form">

	{/* Calling to the methods */}
	<div className="messages">
		{errorMessage()}
		{successMessage()}
	</div>
    <form>
		{/* Labels and inputs for form data */}
		<label className="label">First Name</label>
		<input className="input"
		defaultValue={emObj.first_name} onChange={(emp) => handlefName(emp)} type="text" />

        <label className="label">Last Name</label>
		<input className="input"
		defaultValue={emObj.last_name} onChange={(emp) => handlelName(emp)} type="text" />

		<label className="label">Email</label>
		<input className="input"
		defaultValue={emObj.email} onChange={(emp) => handleEmail(emp)} type="email" />

		<label className="label">Gender</label>
		<input className="input"
		defaultValue={emObj.gender} onChange={(emp) => handleGender(emp)}type="text" />
        <label className="label">Salary</label>
		<input className="input"
		defaultValue={emObj.salary} onChange={(emp) => handleSalary(emp)} type="number" />

<button onClick={(e) => handleSubmit(e)} type="button">
		Submit
		</button>
	</form>
    </div>
        );
        

}