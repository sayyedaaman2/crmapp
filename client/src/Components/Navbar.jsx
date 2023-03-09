import logo from "../img/logo.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'

// import { userStatus } from "../utils/constant";
import {getUser} from '../app/user/actions'

function Navbar() {


  const [menuBtn, setMenuBtn] = useState(false);
  const [activeMenu, setActiveMenu] = useState("menu");
  
  
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  console.log('user',user)
  useEffect(()=>{
    dispatch(getUser())
  },[])
  
  
  
  useEffect(() => {}, [menuBtn]);
  function toggler() {
    setMenuBtn(!menuBtn);
    console.log("toggler");
    activeMenu === "menu"
      ? setActiveMenu(" menu_active menu")
      : setActiveMenu("menu");
  }
  return (
    <>
      <nav className="relative nav_bg ">
        <div className=" mx-2 flex gap-4 justify-between items-center sm:mx-6 md:justify-evenly">
          <div className="w-10 m-2 basis-10">
            <img className="w-full" src={logo} alt="logo-img" />
          </div>
          <div className=" basis-auto font-bold uppercase text-xs sm:text-lg md:basis-1/2">
            <NavLink to="/" className="">
              Customer Realtion Management
            </NavLink>
          </div>

          <div className={activeMenu}>
            <ul className="md:flex">
              <li className="menu-items">
                <NavLink to="/" className="menu-href">
                  Home{" "}
                </NavLink>
              </li>

              <li className="menu-items">
                <NavLink to="/signup" className="menu-href">
                  SignUp
                </NavLink>
              </li>
              <li className="menu-items">
                <NavLink to="/login" className="menu-href">
                  Login
                </NavLink>
              </li>
              <li className="menu-items">
                <NavLink to="/about" className="menu-href">
                  About{" "}
                </NavLink>
              </li>
            </ul>
          </div>
          <div
            className="basis-1/12 md:hidden  flex items-center justify-center text-center "
            onClick={toggler}
          >
            {menuBtn ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
              </svg>
            ) : (
              <div
                className="h-full w-full flex
               justify-center item-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                >
                  <path
                    fill="#000"
                    d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm1 5a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2H4z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
