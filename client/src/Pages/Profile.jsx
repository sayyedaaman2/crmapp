import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getUser } from "../app/user/actions";

import Loader from "../Components/Loader";
import Auth from "../Services/userService";
const Profile = () => {
  const dispatch = useDispatch();

  const { data, isLoading } = useSelector((state) => state.user);
  const [image, setImage] = useState("");

  useEffect(() => {}, [data]);
  if (isLoading) {
    return <Loader />;
  }

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const uploadFile = async () => {
    const result = await Auth.uploadImage({
      image,
      accessToken: Cookies.get("x-access-token"),
    });

    console.log("result", result?.data?.message);
    if (result) {
      if (result.status === 200) {
        (() => toast.success(result?.data?.message))();
        
        setTimeout(()=>{
          dispatch(getUser());

        },6000)
        return ;
      }
    }

    if (result.response) {
      if (result.response.status === 400) {
        (() => toast.error(result.response.data.message))();
      } else {
        (() => toast.error(result.response.data.message))();
      }
    }
  };

  return (
    <>
      <main className="profile-page">
        <section className="realtive block h-500-px">
          <div
            className="absolute w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="realtive py-16 bg-gray-200">
          <div className="container mx-auto px-16">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-10">
              <div className="px-0">
                <div className="flex justify-between">
                  <div className="w-full lg:w-3/12 px-4 flex justify-center">
                    <div className="relative w-full">
                      {data?.image ? (
                        <img
                          alt="profile-img"
                          src={data?.image}
                          className=" shadow-xl rounded-full h-[6rem] md:h-[10rem]  lg:h-52  lg:absolute lg:-top-24 "
                        />
                      ) : (
                        <img
                          alt="profile-img"
                          src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                          className=" shadow-xl rounded-full h-28 lg:h-52 align-middle border-none absolute -m-12 ml-1 lg:-ml-16 max-w-150-px"
                        />
                      )}
                    </div>
                  </div>

                  <div className="  w-auto  lg:w-4/12  flex justify-end">
                    <div className=" bg-pink-100 h-fit py-2 px-6">
                      <div className=" text-center">
                        <span className=" text-sm lg:text-xl font-bold block uppercase tracking-wide text-gray-600">
                          22
                        </span>
                        <span className="text-sm  lg:text-xl">Ticket</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-xl lg:text-4xl font-semibold leading-normal mb-2 text-gray-700">
                    {data?.userId}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2  text-sm lg:text-lg ">
                      {data?.name}
                    </i>
                  </div>
                  <div className="mb-2 ">
                    <i className=" mr-2 text-sm lg:text-lg"> {data?.email}</i>
                  </div>
                  <div className="mb-2 ">
                    <i className=" mr-2  text-sm lg:text-lg ">
                      {" "}
                      {data?.userType}
                    </i>
                  </div>
                </div>
              </div>
              <div className="  bg-slate-800 w-full  px-4 lg:text-center">
                <div className="py-6 px-3">
                  <input type="file" onChange={handleImage} className="bg-slate-400 w-full mb-4 lg:mb-0 md:w-1/2 lg:w-1/3 mr-4"/>
                  <button
                    className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={uploadFile}
                  >
                  update Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer theme="dark" />
      </main>
    </>
  );
};

export default Profile;
