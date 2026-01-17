import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL


    const nav = useNavigate()

    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const saveForm = async(e)=>{
          e.preventDefault()
          try{
            const formData = {userName,userEmail,userPassword}
            const response = await axios.post(`${BASE_URL}/api/save`,formData)
            alert(response.data.message)
            nav('/login')

            setUserName("")
            setUserEmail("")
            setUserPassword("")

          }
          catch(err){
            console.log(err)
            alert(err.response?.data?.message)
             setUserName("")
            setUserEmail("")
            setUserPassword("")

          }

    }


  return (
    <>
    <div className='container mt-5'>
        <div className='row'>
            <div className='col-12 '>
                <h1 className='fw-bold'>Sign Up </h1>

                <form onSubmit={saveForm}  action="/save" method='post'>
                <label className='form-label'>Name</label>
                <input className='form-control' value={userName} name='userName' onChange={(e)=>setUserName(e.target.value)} type="text" />

                <label className='form-label' >Email</label>
                <input className='form-control' value={userEmail} name='userEmail' onChange={(e)=>setUserEmail(e.target.value)} type="email" />

                <label className='form-label' >Password</label>
                <input className='form-control' value={userPassword} name='userPassword' onChange={(e)=>setUserPassword(e.target.value)} type="password" />

                <button className='btn btn-dark mt-3' type='submit'>Sign Up</button>
                
                </form>

            </div>
        </div>
    </div>
    
    
    
    </>
  )
}

export default SignUp