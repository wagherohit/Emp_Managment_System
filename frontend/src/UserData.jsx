import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const UserData = () => {
  const nav = useNavigate()

  const [data, setData] = useState([])


  const getData = async()=>{
    try{

      const response = await axios.get("http://localhost:3000/api/userData")
      console.log(response.data.data)
      setData(response.data.data)


    }
    catch(err){
      console.log(err)

    }
  }

  const deleteuser= async(id)=>{
         try{

          await axios.delete(`http://localhost:3000/api/delete/${id}`)
          alert('data deleted Succesfully')

          const result = data.filter((val)=>val._id != id)
          setData(result)
          

         }
         catch(err){

          console.log("User Not Deleted",err)
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
          <h1 className='fw-bold'>User Data</h1>
        </div>
        <div className='col-12'>
          <button onClick={()=>nav('/userForm')} className='btn btn-dark'>UserForm</button>
        </div>
        <div className='col-12 mt-5'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col' >Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Image</th>
                <th scope='col'>Phone</th>
                <th scope='col'>Gender</th>
                <th scope='col'>Department</th>
                <th scope='col'>State</th>
                <th scope='col'>City</th>
                <th scope='col'>Pincode</th>
                <th scope='col'>Address</th>
                <th scope='col'>Permanents</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val,idx)=>{
                return(
                  <tr >
                    <td scope='row'>{val.userName}</td>
                    <td>{val.userEmail}</td>
                    <td><img src={`http://localhost:3000/${val.image}`} width={50} className='img-fluid' alt="" /></td>
                    <td>{val.userPhone}</td>
                    <td>{val.userGender}</td>
                    <td>{val.userDepartment}</td>
                    <td>{val.userState}</td>
                    <td>{val.userCity}</td>
                    <td>{val.userPincode}</td>
                    <td>{val.userAddress}</td>
                    <td>{val.userIspermanent ? "Permanent" : "Temporary"}</td>
                    <td><button className='btn btn-danger' onClick={() =>window.confirm("Are you sure?") ? deleteuser(val._id): null}>Delete</button>
                    <button className='btn btn-success' onClick={() => nav(`/edit/${val._id}`)}>Edit</button></td>
                  </tr>
                )

              })}
            </tbody>

          </table>

        </div>

      </div>

    </div>
    
    
    </>
  )
}

export default UserData