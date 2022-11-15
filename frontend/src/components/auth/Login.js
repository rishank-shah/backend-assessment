import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
}
from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom'
import {login} from '../../api/auth'
import {toast} from 'react-toastify'

function Login(props) {
  let navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")

  const handleLogin = (e) =>{
    e.preventDefault()
    login({email, password})
    .then((res)=>{
      if(res.data.success){
        toast.success("Login Successful")
        setError("")
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        navigate("/movies");
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
      <h1>Login</h1>
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
          setPassword(e.target.value)
        }}
      />

      <span style={{color: "red"}} >{error}</span>

      <MDBBtn className="mb-4" onClick={handleLogin}>Login</MDBBtn>

      <div className="text-center">
        <p>Not a member? <Link to={"/register"}> Register </Link></p>
      </div>

    </MDBContainer>
  );
}

export default Login;