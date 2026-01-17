import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
    const {id} = useParams()
    const nav = useNavigate()
    const BASE_URL = import.meta.env.VITE_BACKEND_URL


         const [userName, setUserName] = useState('')
         const [userEmail, setUserEmail] = useState('')
         const [userPhone, setUserPhone] = useState('')
         const [userGender, setUserGender] = useState('')
         const [userDepartment, setUserDepartment] = useState('')
         const [userState, setUserState] = useState('')
         const [userCity, setUserCity] = useState('')
         const [userPincode, setUserPincode] = useState('')
         const [userAddress, setUserAddress] = useState('')
         const [userIspermanent, setUserIspermanent] = useState(false)
         const [image, setImage] = useState(null)
     
    const getData = async()=>{
        try{
            const response = await axios.get(`${BASE_URL}/api/userData/${id}`)
            const u = response.data.data
            setUserName(u.userName)
      setUserEmail(u.userEmail)
      setUserPhone(u.userPhone)
      setUserGender(u.userGender)
      setUserDepartment(u.userDepartment)
      setUserState(u.userState)
      setUserCity(u.userCity)
      setUserPincode(u.userPincode)
      setUserAddress(u.userAddress)
      setUserIspermanent(u.userIspermanent)

        }
        catch(err){
            console.log(err)

        }

    }

    const saveForm=async(e)=>{
        e.preventDefault()
        try{

            const formData = new FormData()
            formData.append("userName",userName)
            formData.append("userEmail",userEmail)
            formData.append("userPhone",userPhone)
            formData.append("userGender",userGender)
            formData.append("userDepartment",userDepartment)
            formData.append("userState",userState)
            formData.append("userCity",userCity)
            formData.append("userPincode",userPincode)
            formData.append("userAddress",userAddress)
            formData.append("userIspermanent",userIspermanent)
            if (image) {
             formData.append("image", image)}



            const response = await axios.put(`${BASE_URL}/api/update/${id}`,formData)
            alert(response.data.message)

             nav('/userData')

            setUserName("")
            setUserEmail('')
            setUserPhone('')
            setUserGender('')
            setUserDepartment('')
            setUserState('')
            setUserCity('')
            setUserPincode('')
            setUserAddress('')
            setUserIspermanent('')
            setImage(null)



        }
        catch(err){
            console.log(err)
            setUserName("")
            setUserEmail('')
            setUserPhone('')
            setUserGender('')
            setUserDepartment('')
            setUserState('')
            setUserCity('')
            setUserPincode('')
            setUserAddress('')
            setUserIspermanent('')
            setImage(null)

        }

    }

    useEffect(() => {
     getData()
    }, [])
    
  return (
    <>
    
    <div className='container'>
        <div className='row'>
            <div className='col-12 text-center'>
                <h1 className='fw-bold'>Update Form</h1>
            </div>

            <div className='col-12'>
                <form onSubmit={saveForm}  action="/update" method='post'>

                <label className='form-label'>Name</label>
                <input type="text" className='form-control' name='userName' value={userName} onChange={(e)=>setUserName(e.target.value)} />

                <label className='form-label'>Email</label>
                <input type="email" className='form-control' name='userEmail' value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} />

                <label className='form-label' >Phone</label>
                <input type="phone" className='form-control' name='userPhone' value={userPhone} onChange={(e)=>setUserPhone(e.target.value)} />

                <label className='form-label' >Gender</label>
                <select className='form-control' name="userGender" id="" value={userGender} onChange={(e)=> setUserGender(e.target.value) }>
                    <option value=""></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                </select>

                <label className='form-label'>Department</label>
                <input type="text" className='form-control' name='userDepartment' value={userDepartment} onChange={(e)=>setUserDepartment(e.target.value)} />

                <label className='form-label' >State</label>
                <input type="text" className='form-control' name='userState' value={userState} onChange={(e)=>setUserState(e.target.value)} />

                <label className='form-label' >City</label>
                <input type="text" className='form-control' name='userCity' value={userCity} onChange={(e)=>setUserCity(e.target.value)} />

                <label className='form-label' >Pincode</label>
                <input type="number" className='form-control' name='userPincode' value={userPincode} onChange={(e)=>setUserPincode(e.target.value)} />

                <label className='form-label' >Address</label>
                <textarea className='form-control' name="userAddress" id="" value={userAddress} onChange={(e)=>setUserAddress(e.target.value)}></textarea>

                <label className='form-check-label'>IsPermanent</label>
                <input  type="checkbox" className='form-check-input' name='userIspermanent'   checked={userIspermanent} onChange={(e)=>setUserIspermanent(e.target.checked)} /> <br />

                <label className='form-label'>Image</label>
                <input type="file" className='form-control'  name='image' onChange={(e)=> setImage(e.target.files[0])} />

                <button className='btn btn-dark mt-3' type='submit'>Submit</button>
                
                </form>

            </div>

        </div>

    </div>
    
    </>
  )
}

export default Edit