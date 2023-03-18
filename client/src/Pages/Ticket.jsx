import React, { useState } from "react";
import ProfileCard from "../Components/Ticket/ProfileCard";
import {useDispatch, useSelector} from 'react-redux'
const Ticket = () => {
  
  const {data, isLoading, isSuccess, errorMessage} = useSelector(state=> state.user);
  return (
    <main
      className="realtive block"
    >
      <section className="absolute w-full h-full  lg:px-40 lg:py-4 bg-center bg-cover "   style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1678931884462-312c820d3e67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80)`,
      }}>
        <ProfileCard user={data} />
        <h1>ticket page</h1>
      </section>
    </main>
  );
};

export default Ticket;
