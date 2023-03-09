import React from "react";

function Home() {
  return (
    <>
      <div className="h-screen bg-gradient-to-r to-red-200 via-cyan-200  from-cyan-500 flex justify-center items-start ">
        <div className=" w-full  bg-white absolute top-24 left-1/2 -translate-x-1/2  md:w-1/2  ">
          <div className="bg-cover border-2  border-purple-300">
            <img src="https://images.unsplash.com/photo-1675274838343-47d84bd8bb18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=855&q=80" alt="mainPage"></img>
          </div>
          <div className="h-24 px-5 py-4  md:-translate-x-1/2 md:absolute md:top-16 md:left-1/2">
            <div className=" text-xs font-serif text-center font-bold uppercase">
              <span className="   text-2xl  md:text-white md:text-4xl">Welcome</span> <br />{" "}
              <span className="text-md md:text-2xl">t</span>o  Customer Realtion Management{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
