import React from "react";
import {useNavigate} from 'react-router-dom'
import { useSelector} from 'react-redux'
import Loader from "../Components/Loader";
function Home() {
  const navigate = useNavigate();
  const {data, isLoading} = useSelector(state=> state.user)

  if(isLoading){
    return <Loader/>
  }
  return (
    <>
      <div className="h-full bg-gradient-to-r to-red-200 via-cyan-200  from-cyan-500 flex justify-center items-start ">
        <div className=" w-full  bg-white absolute top-24 left-1/2 -translate-x-1/2  md:w-1/2  ">
          <div className="bg-cover border-2  border-purple-300">
            <img src="https://images.unsplash.com/photo-1675274838343-47d84bd8bb18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=855&q=80" alt="mainPage"></img>
          </div>
          <div className="h-24 px-5 py-4  md:-translate-x-1/2 md:absolute md:top-16 md:left-1/2">
            <div className=" text-xs font-serif text-center font-bold uppercase">
              <span className="   text-2xl  md:text-white md:text-4xl">Welcome</span> <br />{" "}
              <span className="text-md md:text-2xl">t</span>o  Customer Relation Management{" "}
            </div>
          </div>
          {
            data && (
              <div className="w-full flex justify-center items-center bg-slate-200">
              <button type="button" className=' border-2 border-gray-200 rounded-lg w-full lg:w-24 text-center py-2 my-2 font-bold bg-cyan-400 text-black hover:bg-white hover:text-black ' onClick={()=>navigate("/ticket")}>Click Me</button>
    
              </div>
            )
          }
        
        </div>
      </div>
    </>
  );
}

export default Home;
