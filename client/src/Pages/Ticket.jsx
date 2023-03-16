import React from "react";
import ProfileCard from "../Components/Ticket/ProfileCard";
const Ticket = () => {
  return (
    <main
      className="realtive block"
    >
      <section className="absolute w-full h-full px-40 py-4 bg-center bg-cover "   style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1678931884462-312c820d3e67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80)`,
      }}>
        <ProfileCard />
        <h1>ticket page</h1>
      </section>
    </main>
  );
};

export default Ticket;
