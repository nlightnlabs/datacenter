import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setUserLoggedIn } from '../../../redux/slices/authSlice'
import { setCurrentPage } from '../../../redux/slices/navSlice'
import * as iconsApi from "../../../apis/icons"
import * as nlightnApi from "../../../apis/nlightn"
import MultiInput from "../../../components/MultiInput"
// import {useNavigate} from 'react-router-dom'

const SignUp = () => {

  const dispatch = useDispatch()
  // const navigateTo = useNavigate()
  const [formData, setFormData] = useState()
 
  const [formClassList, setFormClassList] = useState("form-group needs-validation")
  const [emailErrorMsg, setEmailErrorMsg] = useState("Valid email")
  const [emailErrorClassName, setEmailErrorClassName] = useState("d-none text-active")
  const [emailValided, setEmailValidated] = useState(false)
  const [pwdErrorMsg, setPwdErrorMsg] = useState("Password matches")
  const [pwdErrorClassName, setPwdErrorClassName] = useState("d-none text-active")
  const [pwdValided, setPwdValidated] = useState(false)
  const [businessUnits, setBusinessUnits] = useState([])

  useEffect(()=>{
    console.log(formData)
  },[formData])

  const handleChange = (e)=>{
      let {name, value} = e.target
      if(name=="email"){
        value = value.toString().toLowerCase()
      }
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  }

  const handleBlur=(e)=>{
    const {name, value} = e.target

    if(name=="email"){
      let email = formData.email.toString()
        if(email.search("@")<=0 || email.search(/\./g)<=0){
          setEmailErrorMsg(`${String.fromCharCode(10060)} Invalid email`)
          setEmailErrorClassName("d-block text-danger fs-small mt-2")
          setEmailValidated(false)
      }else{
          setEmailErrorMsg(`${String.fromCharCode(9989)} Valid email`)
          setEmailErrorClassName("X d-block text-success fs-small mt-2")
          setEmailValidated(true)
      }        
    }

    if (name=="confirm_pwd"){
      const pwd = formData.pwd
      const confirmPwd = value
      if(confirmPwd!==pwd){
          setPwdErrorMsg(`${String.fromCharCode(10060)} Password doesn't match`)
          setPwdErrorClassName("d-block text-danger fs-small mt-2")
          setPwdValidated(false)
      }else{
          setPwdErrorMsg(`${String.fromCharCode(9989)} Password matches`)
          setPwdErrorClassName("X d-block text-success fs-small mt-2")
          setPwdValidated(true)
      }
  }
  }
  const handleSubmit = async (e)=>{
    
    e.preventDefault()
    const form = e.target
    
  
      if(!form.checkValidity() || !emailValided || !pwdValided ){
        e.preventDefault();
      }
      else{
          const params = formData
          console.log(formData)
          try{
            const response = await nlightnApi.addUser(params)
            console.log(response)
            alert(response)

            if(response =="User Exists"){
                alert("User account exists. Please re-enter a different email.")

            }else{
              dispatch(setUser(formData))
              dispatch(setUserLoggedIn(true))
              dispatch(setCurrentPage("Home"))
              // navigateTo("/")
          }
          }
          catch(error){
            console.log(error)
          }
      }
      setFormClassList('form-group was-validated')
    
}

const getBusinessUnits = async ()=>{
    
    try{
      const response = await nlightnApi.getTable("business_units")
      const businessUnitData = response.data
      console.log(businessUnitData)

      let businessUnitList = []
      businessUnitData.map(item=>{
        businessUnitList.push(item.name)
      })
      setBusinessUnits(businessUnitList.sort())

    }catch(error){
      console.log(error)
    }
    
  }

  useEffect(()=>{
    getBusinessUnits()
  },[])

  const pageStyle ={
    height:"100vh", 
    width:"100vw",
    backgroundImage: "linear-gradient(0deg, rgb(200,225, 255), white)"
  }


  return (
    <div className="d-flex position-relative justify-content-center fade-in w-100" style={pageStyle}>
        
        <div className="d-flex position-absolute flex-column w-100" style={{top: "100px", maxWidth:"400px"}}>
          
        <h3 style={{color: "rgb(0,100,225)"}}>New User Sign Up</h3>
          
          <div className="d-flex flex-column bg-light border shadow shadow p-3 rounded-2 justify-content-center">
          
          <div  className="d-flex flex-column" style={{height: "500px", overflowY:"auto"}}>

          <div className="form-floating mb-3 p-1">
                <input id = "email" name= "email" type="email" className="form-control form-control text-primary" onChange={handleChange} onBlur={handleBlur} placeholder="Email" required></input>
                <label htmlFor="email" className="form-label text-body-tertiary small">
                    Email
                    <span style={{color: "red"}}>*</span>
                </label>
                <div className={emailErrorClassName} style={{fontSize: 12}}>{emailErrorMsg}</div>
            </div>

            <div className="d-flex justify-content-between mb-3 p-1">
              <div className="form-floating w-50 me-1">
                <input id = "pwd" name= "pwd" type ="password" className="form-control form-control text-primary" onChange={handleChange}  placeholder="Password" required></input>
                  <label htmlFor="pwd" className="form-label text-body-tertiary small">
                      Password
                      <span style={{color: "red"}}>*</span>
                  </label>
              </div>
              <div className="form-floating w-50 ms-1">
                  <input id = "confirm_pwd" name= "confirm_pwd" type ="password" className="form-control form-control text-primary" onBlur={handleBlur} placeholder="Password" required></input>
                  <label htmlFor="confirm_pwd" className="form-label text-body-tertiary small">
                      Confirm Password
                      <span style={{color: "red"}}>*</span>
                  </label>
                <div className={pwdErrorClassName} style={{fontSize: 12}}>{pwdErrorMsg}</div>
              </div>
            </div>

            <div className="d-flex justify-content-between mb-3 p-1">
              
              <div className="form-floating w-50 me-1">
                  <input id = "first_name" name= "first_name" type="text" className="form-control text-primary" onChange={handleChange} placeholder="Username" required></input>
                  <label htmlFor="first_name" className="form-label text-body-tertiary small">
                      First Name
                      <span style={{color: "red"}}>*</span>
                  </label>
              </div>

              <div className="form-floating w-50 ms-1">
                  <input id = "last_name" name= "last_name" type="text" className="form-control text-primary" onChange={handleChange} placeholder="Username" required></input>
                  <label htmlFor="last_name" className="form-label text-body-tertiary small">
                  Last Name
                  <span style={{color: "red"}}>*</span>
                  </label>
              </div>

            </div>

            <div className="form-floating mb-3 p-1">
                <input id = "company_name" name= "company_name" type="text" className="form-control form-control text-primary" onChange={handleChange} placeholder="Company name" required></input>
                <label htmlFor="company_name" className="form-label text-body-tertiary small">
                    Company Name
                <span style={{color: "red"}}>*</span>
                </label>
                </div>

            <div className="form-floating mb-3 p-1">
              <input id = "job_title" name= "job_title" type="text" className="form-control form-control text-primary" onChange={handleChange} placeholder="Job Title"></input>
              <label htmlFor="job_title" className="form-label text-body-tertiary small">Job Title</label>
            </div>

            <div className="form-floating mb-3 p-1">
              <select 
                id = "business_unit" 
                name = "business_unit" 
                className="form-select text-primary" 
                placeholder="What business unit are you with"
                onChange={handleChange} 
                >
                <option value="" style={{color: "lightgray"}}></option>
                {businessUnits.map(item=>(
                  <option className="option light" key={businessUnits.indexOf(item)+1}>{item}</option>
                ))}
              </select>
              <label htmlFor="supplier" className="form-label text-body-tertiary">Business Unit</label>
            </div>
            <div className="form-floating mb-3 p-1">
                <input id = "mobile_phone" name= "mobile_phone" type="tel" className="form-control form-control text-primary" onChange={handleChange} placeholder="Mobile Phone"></input>
                <label htmlFor="mobile_phone" className="form-label text-body-tertiary small">Mobile Phone</label>
            </div>

            </div>
            
            <div className="d-flex flex-column justify-content-center mt-3">
              <div className="d-flex justify-content-center">
                  <button name="signUpButton" className="btn btn-primary" data-bs-toggle="button" type="submit" onClick={(e)=>handleSubmit(e)}>Sign Up</button>
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
                        Sign In
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

export default SignUp