import React, {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage, setPageList, setMenuItems} from '../../../redux/slices/navSlice'
import CardButton from "../../../components/CardButton.js"


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
        <div className="page-title">AI Lab</div>
        <div className="d-flex w-100 p-3">
          {menuItems.length> 0 && menuItems.map(item=>(
             <CardButton 
                key = {item.id}
                item = {item}
              />
          ))}
        </div>
    </div>
  )
}

export default Home