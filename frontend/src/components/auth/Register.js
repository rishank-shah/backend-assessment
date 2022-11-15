import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
}
from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom'
import {register} from '../../api/auth'
import {toast} from 'react-toastify'

function Register(props) {
  let navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")

  const handleRegister = (e) =>{
    e.preventDefault()
    register({email, password})
    .then((res)=>{
      if(res.data.success){
        toast.success("Registered Successful")
        setError("")
        navigate('/login')
      }else{
        toast.error(res.data.message || "Something went wrong")
        setError(res.data.message)
      }
    })
    .catch((err)=>{
      toast.error(err.response.data.message || "Something went wrong")
      setError(err.response.data.message)
      console.log(err.response.data.data)
    })
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h1>Register</h1>
      <MDBInput 
        wrapperClass='mb-4' 
        label='Email address' 
        id='form1'
        type='email' 
        onChange={(e)=> {
          setError("")
          setEmail(e.target.value)
        }}
      />

      <MDBInput 
        wrapperClass='mb-4' 
        label='Password' 
        id='form2' 
        type='password'
        onChange={(e)=> {
          setError("")
          if(e.target.value.length < 8){
            setError("Password length should be greater than 8")
          }
          setPassword(e.target.value)
        }}
      />

      <span style={{color: "red"}} >{error}</span>

      <MDBBtn onClick={handleRegister} className="mb-4">Register</MDBBtn>

      <div className="text-center">
        <p><Link to={"/login"}> Login </Link></p>
      </div>

    </MDBContainer>
  );
}

export default Register;