import React from "react";
const ProfileCard = ({user}) => {



  return (
    <div className=" bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 my-4 mx-4 sm:mx-12 md:mx-40 lg:mx-12">
      <div className="border-4 border-white px-2 py-4 flex gap-3 ">
        <div className="h-28 w-28 md:h-40 md:w-40 flex items-center justify-center bg-white inline-block rounded-full border-2 border-gray-400">
          <img
            alt="profile-img"
            src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
            className=" w-[90%] rounded-full"
          />
        </div>
        <div className="relative bg-gradient-to-b from-cyan-300 via-green-400  rounded-md flex-1 px-3 py-2">
          <h1 className=" text-slate-800 text-lg md:text-xl uppercase font-semibold"> {user?.userId}</h1>
          <h1 className=" text-slate-800 text-xs md:text-sm ">{user?.email}</h1>
          <h1 className="absolute bottom-10  text-slate-800 text-md font-bold md:text-xl">{user?.userType}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
