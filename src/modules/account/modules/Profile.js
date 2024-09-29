import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage, setPageList, setMenuItems} from '../../../redux/slices/navSlice.js'
import { setUser, setUserLoggedIn } from '../../../redux/slices/authSlice'
import * as iconsApi from "../../../apis/icons"
import * as nlightnApi from "../../../apis/nlightn"
import MultiInput from "../../../components/MultiInput"
import PhotoUpload from "../../../components/PhotoUpload"


const Profile = () => {

  const dispatch = useDispatch()

    const [logInErrorMsg, setLogInErrorMsg] = useState("")
    const [logInClassName, setLogInClassName] = useState("d-none")

    const [formData, setFormData] = useState({})

  const handleChange=(e)=>{
    let {name, value} = e.target

    if(name=="email"){
        value = value.toString().toLowerCase()
      }

    setFormData({...formData,...{[name]:value}})
  }

  const validateUser = async(req, res)=>{
    if(Object.keys(formData)==0){
      setLogInErrorMsg(`${String.fromCharCode(10060)} invalid user information.`)
      setLogInClassName("text-danger mt-0 mb-3 animate__animated animate__fadeIn ")
    }
    else{
      const params = {
          email: formData.email,
          pwd: formData.pwd
      }
      const uservalidated = await nlightnApi.authenticateUser(params)
      return uservalidated
    }
      
  }

  const getUserInfo = async (req, res)=>{
      const params = {
        email: formData.email
      }
      const userInfo = await nlightnApi.getUserInfo(params)
      return userInfo
    }

  const handleSubmit = async (e)=>{

    e.preventDefault()

    const userValidated = await validateUser()
    if(userValidated){  
        const user_data = await getUserInfo()
        dispatch(setUser(user_data))
        dispatch(setUserLoggedIn(true))
        dispatch(setCurrentPage("Home"))     
    }else{
        setLogInErrorMsg(`${String.fromCharCode(10060)} invalid user information.`)
        setLogInClassName("text-danger mt-0 mb-3 animate__animated animate__fadeIn ")
    }
}
      
  const handleForgotPassword = ()=>{
    dispatch(setCurrentPage("ForgotPassword"))
  }

  const user = useSelector(state=>state.authentication.user)

  return (

      <div className="d-flex flex-column w-100 m-auto" style={{maxWidth:"50%", minWidth:"400px"}}>
      
      <div className="d-flex align-items-center justify-content-between w-100">
        <label className="page-title">Profile</label>
        <div className="d-flex">
            <button className="btn btn-primary" onClick={(e)=>handleSubmit(e)}>Save</button>
        </div>
      </div>
      
      
      <div className="d-flex w-100 bg-light border rounded-3 shadow align-items-center" style={{height:"200px"}}>
          
          <div 
            className="d-flex align-items-center justify-content-center ms-5" 
            style={{height:"150px", width:"150px", overflow:"hidden", borderRadius:"150px", border: "1px solid lightgray"}}>
              <img src={user.photo_url != null? user.photo_url : `${iconsApi.generalIcons}/profile_icon.png`}></img>
          </div>

          <div className="d-flex flex-column ms-5">
            <h2 style={{fontWeight: "bold"}}>{user.full_name}</h2>
            <h4 style={{color: "gray"}}>{user.job_title}</h4>
            <h4 style={{color: "gray"}}>{user.company_name}</h4>
          </div>

        </div>

        <div className="d-flex w-100 align-items-top justify-content-center mt-2">
               
            <div className="d-flex bg-light flex-column border rounded-3 shadow p-3 w-25 mt-2 me-1">
            
            <h6>Login Information</h6>
              <MultiInput
                  id="email"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange = {(e)=>handleChange(e)}
                  label="Email"
              />
              
              <MultiInput
                  id="pwd"
                  name="pwd"
                  placeholder="pwd"
                  value={formData.pwd}
                  onChange = {(e)=>handleChange(e)}
                  label="Password"
                  type="password"
              />

            </div>

            <div className="d-flex bg-light flex-column border rounded-3 shadow p-3 w-75 mt-2 ms-2">
              <h4>Profile Information</h4>
              <MultiInput
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange = {(e)=>handleChange(e)}
                  label="First Name"
              />

              <MultiInput
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange = {(e)=>handleChange(e)}
                  label="Last Name"
              />

              <MultiInput
                  id="company_name"
                  name="company_name"
                  placeholder="Company Name"
                  value={formData.company_name}
                  onChange = {(e)=>handleChange(e)}
                  label="Company Name"
              />

              <MultiInput
                  id="job_title"
                  name="job_title"
                  placeholder="Job Title"
                  value={formData.job_title}
                  onChange = {(e)=>handleChange(e)}
                  label="Job Title"
              />

              <MultiInput
                  id="business_unit"
                  name="business_unit"
                  placeholder="Business Unit"
                  value={formData.business_unit}
                  onChange = {(e)=>handleChange(e)}
                  label="Business Unit"
              />

              <PhotoUpload
                  id="profile_photo"
                  name="profile_photo"
                  placeholder="Profile Photo"
                  value={formData.profile_photo}
                  onChange = {(e)=>handleChange(e)}
                  label="Profile Photo"
                  marginBottom = "10px"
              />

            </div>
        </div>

      </div>

  )
}

export default Profile