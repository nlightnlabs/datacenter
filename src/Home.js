import React, {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage, setPageList, setMenuItems} from './redux/slices/navSlice'
import Room from './components/Room.js'

const Home = () => {

  const dispatch = useDispatch()
  const pageList = useSelector(state=>state.navigation.pageList)
  const menuItems = useSelector(state=>state.navigation.menuItems).filter(i=>i.section===2)

  useEffect(()=>{
    dispatch(setPageList([...pageList,"Home"]))
  },[])


  const pageStyle ={
    height:"100%", 
    width:"100%",
  }

  return (
    <div className="w-full p-[20px] fade-in" style={pageStyle}>
        <Room />
    </div>
  )
}

export default Home