import { useState } from 'react';
//import EditEmployee from './editEmployee';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate 
  } from "react-router-dom";


export default function Employees() {
    const navigate = useNavigate();
    const [empData, setEmpData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [aEmpData, setAEmpData] = useState([]);
    const getEmployees = async() => {
        const response = await fetch('https://101345468-comp-3123-assignment-1/CMEomQ2Lx5zenpajs4YFv3LyKuXc/api/employee', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            setEmpData(data);
            setLoading(false);
        }).catch(error => console.error('Error:', error));
    };

    const getEmp = async (emp) => {
        const response = await fetch("https://101345468-comp-3123-assignment-1/CMEomQ2Lx5zenpajs4YFv3LyKuXc/api/employees/"+emp, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            setAEmpData(data);
        }).catch(error => console.error('Error:', error));
    }

const editEmp = (emp) => {
    console.log(emp);
    navigate("/employees/edit",  { state: { data: emp }});  
   // return <EditEmployee emObj = {e}></EditEmployee>
}

const addEmployee = (emp) => {
    emp.preventDefault();
    navigate("/employees/add");  
   // return <EditEmployee emObj = {e}></EditEmployee>
}


const delEmp = async (emp) => {
    const {data} = await fetch("https://https://vercel.com/mohammedvep/101345468-comp-3123-assignment-1/CMEomQ2Lx5zenpajs4YFv3LyKuXc/api/employees/"+emp._id, {
                method: 'DELETE'
            })
            .then(function(data) {
            console.log(data.message);
            setLoading(true);
            }).catch(error => console.error('Error:', error));
}

    if(loading===true) getEmployees();
return (
    <>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react-dom.js"></script>

    <div id="loader" style={{
		display: loading ? '' : 'none',
		}} class="loader"></div>
        <h1>Employee List</h1>
    <body>
    
    <table align='center'>
    <button onClick={(e) => addEmployee(e)} className="button" id="addemp" type="submit" >Add Employee</button>
    <tbody id="emptbl">
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Actions</th>
        </tr>
    {
         empData.map( (emp,key) =>
         <tr key={key}>
             <td>{emp.first_name}</td>
              <td>{emp.last_name}</td>
             <td>{emp.email}</td>
              <td>{emp.gender}</td>
              <td>{emp.salary}</td>
             <td><button onClick={() => editEmp(emp)} className="button" type="submit" >Edit Employee</button>
             <button onClick={() => delEmp(emp)} className="delbutton" type="submit" >Delete Employee</button></td>
         </tr>
         )
       }
       
    </tbody>
    
    </table>
    </body>
    </>

);
}
