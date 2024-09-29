import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearStorage } from './redux/slices/navSlice';

import { setUser, setUserLoggedIn } from './redux/slices/authSlice';
import { setCurrentPage, setPageList, setMenuItems } from './redux/slices/navSlice';
import { setAppName, setDbName, setFileStorageBucket, setLogoFile, setTheme} from './redux/slices/envSlice';
import * as nlightnlApi from './apis/nlightn'

import Home from "./Home";
import Header from "./components/Header";
import Menu from "./components/Menu.js"


// Set application details:
export const appName = "Data Center Manager"
export const dbName = "main"
export const fileStorageBucketName = "nlightnlabs01"
export const logoFile = "Oomnitza_logo.png"
export const theme = "nlightn labs"
 
function App() {

  const dispatch = useDispatch();
  // const navigateTo = useNavigate()

  // Global States
  const user = useSelector(state => state.authentication.user);
  const userLoggedIn = useSelector(state => state.authentication.userLoggedIn);
  const currentPage = useSelector(state => state.navigation.currentPage);
  const menuItems = useSelector(state => state.navigation.menuItems);
  
  // local states
  const [pages, setPages] = useState([])
  
  // Setup data
  const pageData = [
    { id: 1, section: 1, name: "Home", label: "Home", icon: "HomeIcon", component: <Home/>, showOnMenu: true},
  ];

  const getPages = async ()=>{
    let x = await Promise.all(pageData.map(async (item) => {
      // Ensure the component is rendered before pushing
      return { ...item, component: item.component };
    }));
    setPages(x);

    getMenuItems(x)
  }

  const getMenuItems = async (pageData)=>{
    let modules = pageData.filter(i=>i.showOnMenu===true)
    await Promise.all(modules.map(item=>{
      delete item.component
    }))
    dispatch(setMenuItems(modules))
  }

  const getUsers = async () =>{
    const response = await nlightnlApi.getTable("users")
    console.log("users: ",response.data)
  }

  useEffect(()=>{

    dispatch(clearStorage());
    dispatch(setAppName(appName))
    dispatch(setDbName(dbName))
    dispatch(setFileStorageBucket(fileStorageBucketName))
    dispatch(setLogoFile(logoFile))
    dispatch(setTheme(theme))

    getPages()
    // getUsers()
  },[])

  return (
    <div className="flex-container overflow-hidden" style={{height: "100vh", width: "100vw"}}>
        
        <Header appName={appName} logo={logoFile}/>
     
        <div className="d-flex w-100" style={{height:"100%"}}>
            <div className="d-flex w-100 justify-content-between" style={{height:"100%"}}>
                {pages.length>0 && pageData.find(i=>i.name ===currentPage).component}
                {/* {menuItems.length>0 && <Menu menuItems={menuItems} colorTheme={theme}/> } */}
            </div>
        </div>

    </div>
  );
}

export default App;

