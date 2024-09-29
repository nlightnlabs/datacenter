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
    <div className="w-100 p-3 fade-in" style={pageStyle}>
        <div className="d-flex w-100 p-3">
           <Room />
        </div>
    </div>
  )
}

export default Home