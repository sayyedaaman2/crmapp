import React from "react";
import ProfileCard from "../Components/Ticket/ProfileCard";
import { useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import TicketList from "../Components/Ticket/Table/TicketList";
import Loader from '../Components/Loader'
import {Add} from '@mui/icons-material'
const Ticket = () => {
  const navigate = useNavigate();
  const {data, isLoading} = useSelector(state=> state.user);

  if(isLoading){
    return <Loader/>
  }
  return (
    <main
      className="realtive block w-full"
    >
      <section className="absolute w-full h-full  lg:px-40 lg:py-4 bg-center bg-cover "   style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1678931884462-312c820d3e67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80)`,
      }}>
        <ProfileCard user={data} />
        <TicketList/>
        {/* <div className="bg-white fixed bottom-10 left-1/2 -translate-x-1/2 cursor-pointer text-blue-400 mx-auto inline-block p-4 border-2 border-black rounded-full hover:bg-green-500 hover:text-white " onClick={()=> navigate('/createticket')}>
      <Add  />

        </div> */}
      </section>
    </main>
  );
};

export default Ticket;
