import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setUserLoggedIn } from '../../../redux/slices/authSlice'
import { setCurrentPage } from '../../../redux/slices/navSlice'
import * as iconsApi from "../../../apis/icons"
import * as nlightnApi from "../../../apis/nlightn"
import MultiInput from "../../../components/MultiInput"

// import {useNavigate} from "react-router-dom"

const SignIn = () => {

    const dispatch = useDispatch()
    // const navigateTo = useNavigate()

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
    if(Object.keys(formData)===0){
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

    const userValidated = await validateUser()
    if(userValidated){  
        const user_data = await getUserInfo()
        dispatch(setUser(user_data))
        dispatch(setUserLoggedIn(true))
        dispatch(setCurrentPage("Home"))
        // navigateTo("/")
    }else{
        setLogInErrorMsg(`${String.fromCharCode(10060)} invalid user information.`)
        setLogInClassName("text-danger mt-0 mb-3 animate__animated animate__fadeIn ")
    }
}
      

  const pageStyle ={
    height:"100vh", 
    width:"100vw",
    backgroundImage: "linear-gradient(0deg, rgb(200,225, 255), white)"
  }


  return (
    <div className="d-flex position-relative justify-content-center fade-in w-100" style={pageStyle}>
        
        <div className="d-flex position-absolute flex-column w-100" style={{top: "100px", maxWidth:"400px"}}>

            <h3 style={{color: "rgb(0,100,225)"}}>Sign in</h3>

            <div className="d-flex bg-light w-100 flex-column p-3 mt-1 shadow rounded-3" >
                    <MultiInput
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange = {(e)=>handleChange(e)}
                        label="Email"
                    />
                   
                    <MultiInput
                        id="pwd"
                        name="pwd"
                        value={formData.pwd}
                        onChange = {(e)=>handleChange(e)}
                        label="Password"
                        type="password"
                    />

                    <div className={logInClassName}>{logInErrorMsg}</div>
   
                <div className="d-flex flex-column w-100 mt-3">
                    <div className="d-flex justify-content-center w-100">
                        <button className="btn btn-primary" onClick={(e)=>handleSubmit(e)}>Submit</button>
                    </div>
                    <label 
                        className="d-flex justify-content-center mt-3 hovered"
                        style={{color: "gray", cursor: "pointer"}}
                        // onClick={(e)=>navigateTo("/ResetPassword")}
                        >
                        Forgot Password
                    </label>

                    <label 
                        className="d-flex justify-content-center mt-1 hovered"
                        style={{color: "gray", cursor: "pointer"}}
                        // onClick={(e)=>navigateTo("/SignUp")}
                        >
                        New User Sign Up
                    </label>

                </div>
                
            </div>

            <div className="mt-3 justify-content-center w-50 m-auto">
                 <img 
                    src={`${iconsApi.generalIcons}/nlightn_labs_logo_animated.gif`} 
                    style={{height:"100%", width:"100%"}}
                />      
            </div>
        </div>

    </div>
  )
}

export default SignIn