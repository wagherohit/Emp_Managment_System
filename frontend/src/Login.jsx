import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const nav = useNavigate()
    const BASE_URL = import.meta.env.VITE_BACKEND_URL


    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')


    const saveForm = async(e)=>{
        e.preventDefault()
        try{
            const formData = {userEmail,userPassword} 
            const response = await axios.post(`${BASE_URL}/api/login`,formData)
            console.log(response.data)
            alert(response.data.message)

            localStorage.setItem("token",response.data.token)

            nav('/userData')
            setUserEmail("")
            setUserPassword("")


        }
        catch(err){
            console.log(err)
            alert(err.response?.data?.message)
            setUserEmail("")
            setUserPassword("")

        }
    }


  return (
    <>
    <div className='container mt-5'>
        <div className='row'>
            <div className='col-12'>

                <form onSubmit={saveForm} action="/login" method='post'>

                <label className='form-label'>Email</label>
                <input type="email" value={userEmail} className='form-control' onChange={(e)=>setUserEmail(e.target.value)} name='userEmail' />

                <label className='form-label'>Password</label>
                <input type="password" value={userPassword} className='form-control' onChange={(e)=>setUserPassword(e.target.value)} name='userPassword' />

                <button className='btn btn-dark mt-3' type='submit'>Log IN</button>
                
                
                </form>

            </div>

        </div>

    </div>
    
    
    </>
  )
}

export default Login