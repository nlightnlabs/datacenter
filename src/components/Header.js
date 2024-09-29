import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setUserLoggedIn } from '../redux/slices/authSlice'
import { setCurrentPage } from '../redux/slices/navSlice'
import { clearAllStorage } from '../redux/store'; // Import from centralized utility file
import * as iconsApi from "../apis/icons.js"
import logo from '../assets/Oomnitza_logo.png';

const Header = (props) => {

  const appName = props.appName

  const dispatch = useDispatch()

  //Get Global States
  const user = useSelector((state)=>state.authentication.user)
  const userLoggedIn = useSelector((state)=>state.authentication.userLoggedIn)
  
  //Set Local States
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const HeaderStyle = {
    position: "relative",
    height: "75px",
    borderBottom:"1px solid lightgray",
  }

  const [userMenuTop, setUserMenuTop] = useState(null)
  const UserMenuStyle={
    border: "3px solid rgba(200,200,200,0.5)", 
    width: "200px",
    zIndex:999, 
    fontSize: "12px", 
    backgroundColor: "white",
    top: "65px"
  }
  
  const signOut = ()=>{
    dispatch(setUser(null))
    dispatch(setUserLoggedIn(false))
    dispatch(setCurrentPage("SignIn"))
    dispatch(clearAllStorage())
  }
  

  return (
    <div className="flex w-100 justify-between items-center" style={HeaderStyle}>
        
        <div className="flex  w-full md:w-1/2 ms-3 align-items-center">
            <img src={logo} className="h-[30px] w-30px" />
            <div className="text-[24px] text-red-600 ms-1"> Data Center Manager</div>
        </div>

        <div 
          className="flex relative right-0 justify-end items-center"
        >

        </div>

        </div>
  )
}

export default Header