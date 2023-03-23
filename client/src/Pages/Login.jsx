import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../app/user/userSlice";

import LoginPic from "../img/login-icon.png";
import Auth from "../Services/userService";
import ErrorMsg from "../Components/ErrorMsg";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    userId: "",
    password: "",
  };

  const onSubmit = async (values, submitProps) => {
    // console.log("form data", values);

    //Post request write here
    const result = await Auth.login(values);
    // console.log("result ",result)
    if (result) {
      if (result.status === 200) {
        const token = result.data.accessToken;
        Cookies.set("x-access-token", token);
        Cookies.set('id',result.data.userId)
        console.log("token", token);
        (() => toast.success("Successfully Login..."))();
        dispatch(addUser(result.data));
        setTimeout(() => {
          navigate("/");
        }, 6000);

        return;
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
  const validationSchema = Yup.object({
    userId: Yup.string()
      .required("UserId Required")
      .matches(/^[a-zA-Z][^\s-]+$/, "Invalid UserId !"),
    password: Yup.string()
      .required(" Password Required ")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Invalid password format !"
      ),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
        className="h-screen bg-yellow-100 shadow-slate-500 shadow-inner block box-border"
      >
        <div className="border-2  mx-auto box-border">
          <div className="bg-gradient-to-tr from-lime-100 to-teal-400 w-[10rem]  border-2 border-slate-800 rounded-full  mx-auto my-9 transcplate  ">
            <img className="w-40 " src={LoginPic} alt="customer-pic" />
          </div>

          <div className=" w-full left-0 translate-x-0  border-2 border-gray-400 rounded-lg bg-cyan-200  sm:w-[50%] sm:relative sm:left-1/2 sm:-translate-x-1/2">
            <Form className="w-[95%] mx-auto text-center mt-2 bg-zinc-400 rounded-sm p-2">
              <table className="w-full ">
                <tbody>
                  <tr className="row">
                    <td className="label">
                      <div>UserId</div>
                    </td>
                    <td className="input-field" maxLength="10">
                      <Field
                        type="text"
                        className="input-box"
                        name="userId"
                        placeholder="Enter your userId"
                      />
                    </td>
                    <td>
                      <ErrorMessage name="userId" component={ErrorMsg} />
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="label">
                      <div>Password</div>
                    </td>
                    <td className="input-field" maxLength="20">
                      <Field
                        type={showPassword ? "text" : "password"}
                        className="input-box"
                        name="password"
                        autoComplete="false"
                        placeholder="Enter your password"
                      />
                    </td>
                    <td>
                      <ErrorMessage name="password" component={ErrorMsg} />
                    </td>
                  </tr>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="border-2 border-black px-2 rounded-md bg-white text-xs  h-5"
                      onClick={tooglePasswordVisibility}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </tbody>
              </table>
              <br />
              <ErrorMessage name="userType" component={ErrorMsg} />
              <button
                className="bg-gradient-to-b from-teal-100  to-teal-400 h-10 w-20 border-2 border-black shadow-black shadow-md rounded-lg hover:bg-black hover:text-white"
                type="submit"
              >
                Submit
              </button>
            </Form>
            <div className=" mx-3 mb-5 h-12 grid grid-cols-1 text-center bg-pink-200 rounded-bl-md rounded-br-md text-sm ">
              <div className="grid items-center hover:text-blue-700">
                <Link to="/signup" className="login-href">
                  Create a Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Formik>
      <ToastContainer theme="dark" />
    </>
  );
}

export default Login;
