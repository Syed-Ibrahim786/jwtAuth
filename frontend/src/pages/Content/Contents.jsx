import React, { useEffect } from 'react'
import { useState } from 'react'

const Contents = () => {
  const[user,setUser] = useState('')

  useEffect(()=>{
    async function fetchData(){
    const token = localStorage.getItem("authToken")
    const res = await fetch("http://localhost:8000/contents",
      {
        method:'GET',
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
    const data = await res.json()
    setUser(data?.user || "guest")
  }
  fetchData()  
},[])
  return (
    <div>
      <h1>hello {user}</h1>
    </div>
  )
}

export default Contents
