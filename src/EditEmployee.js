import { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
export default function EditEmployee() {
    const navigate = useNavigate();
    const [emObj, setemObj] = useState({_id: '', first_name: '', last_name: '', email: '', gender: '', salary: ''});
    const [fname, setfName] = useState('');

    const location = useLocation();

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);



    const timeout = (delay) => {
        return new Promise( res => setTimeout(res, delay) );
    }

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

          const {data} = await fetch("https://101345468-comp-3123-assignment-1-h4ec9e3wi-mohammedvep.vercel.app/api/employees/"+emObj._id, {
                method: 'PUT',
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
                console.log(JSON.stringify(emObj));

                console.log(data.message);
               navigate("/employees");  
            }).catch(error => console.error('Error:', error));
       }
    };

    const loadEmp = (e) => {
        emObj.first_name=e.first_name;
        emObj.last_name=e.last_name;
        emObj.email=e.email;
        emObj.gender=e.gender;
        emObj.salary=e.salary;
        emObj._id=e._id;
     //   setLoading(false);
    }
   if(emObj._id === '') loadEmp(location.state.data);
   console.log(JSON.stringify(emObj));
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

<button onClick={(emp) => handleSubmit(emp)} type="button">
		Submit
		</button>
	</form>
    </div>
        );
        

}