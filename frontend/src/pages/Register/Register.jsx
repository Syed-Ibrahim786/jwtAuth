import React from 'react'
import '../SignIn.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {
  const [formData, setFormData] = useState({
    name:'',
    password:''
})
    const [error, setError] = useState('')
const navigate = useNavigate();
function handleChange(e){

    setFormData({
        ...formData,
        [e.target.name] : e.target.value
    })
}
async function handleSubmit(e) {
    e.preventDefault()
    const res = await fetch("http://localhost:8000/register",{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(formData)
    }
    )
    const data = await res.json()
    localStorage.setItem("authToken",data.token)
    setError(data.message)
    if(res.ok){
        navigate('/contents')
    }
   
}
  return (
    <div className='outer'>
      <div className='main-box'>
        <h2 className='heading'>REGISTER</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your Name</label>
        <input type="text" autoComplete='new-password' value={formData.name} onChange={handleChange} id='name' name='name'/>
        <label htmlFor="password">Enter password</label>
        <input type="password" autoComplete='new-password' value={formData.password} onChange={handleChange} name="password" id="password" />
        <p className='error'>{error}</p>
        <button type='submit'>create account</button>
        <p>Already a user? <a href="/sign-in">sign-in</a></p>
        </form>
      </div>
    </div>
  )
}

export default Register
