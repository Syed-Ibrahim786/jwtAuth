import React, { useState } from 'react'
import '../SignIn.css'
import { useNavigate } from 'react-router-dom';




const SignIn = () => {
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
    const res = await fetch("http://localhost:8000/sign-in",{
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
        <h2 className='heading'>LOGIN</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your Name</label>
        <input type="text" id='name' name='name' autoComplete='new-password' value={formData.name} onChange={handleChange}/>
        <label htmlFor="password">Enter password</label>
        <input type="password" name="password" autoComplete='new-password' id="password" value={formData.password} onChange={handleChange}/>
        <p className='error' >{error}</p>
        <button type='submit'>sign-in</button>
        <p>new user? <a href="/register">create an account</a></p>
</form>
      </div>
    </div>
  )
}

export default SignIn
