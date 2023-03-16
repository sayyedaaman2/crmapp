import React from "react";

const ProfileCard = () => {
  return (
    <section className="bg-white h-fit rounded-lg p-4">
      <div className=" w-full bg-yellow-400 flex gap-4 px-6 py-4 border-none">
        <div className="border-white bg-white shadow-lg shadow-black border-2 box-border w-[20%]">
          <img
            alt="profile-img"
            src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
            className=" shadow-xl rounded-full align-middle border-none "
          />
        </div>
        <div className="border-red-400 bg-red-500 border-2 w-[80%] p-4">
                <div className="bg-white h-full ">
            userId:test123

                </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
