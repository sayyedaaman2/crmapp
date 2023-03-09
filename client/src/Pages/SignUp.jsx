import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CustomerPic from "../img/profile-icon.png";
import EngineerPic from "../img/profileEng-icon.png";
import constant from "../utils/constant";

import Auth from "../Services/userService";
import ErrorMsg from "../Components/ErrorMsg";

function SignUp() {
  const [userType, setUserType] = useState(constant.userType.customer);

  useEffect(() => {
    console.log("updated userType", userType);
  }, [userType]);
  const initialValues = {
    name: "",
    email: "",
    userId: "",
    password: "",
    userType: userType,
  };

  const onSubmit = async (values, submitProps) => {
    // console.log("form data", values);

    //Post request write here
    const result = await Auth.signUp(values);

    if (result) {
      if (result.status === 201) {
        (() => toast.success("Successfully SignUp..."))();
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
    name: Yup.string()
      .required(" Name Required")
      .matches(/^[a-zA-Z\s]*$/g, `Invaild Name`),
    email: Yup.string()
      .email("Invalid email format")
      .required(" Email Required"),
    userId: Yup.string()
      .required("UserId Required")
      .matches(/^[a-zA-Z][^\s-]+$/, "Invalid UserId !"),
    password: Yup.string()
      .required(" Password Required ")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Invalid password format !"
      ),
    userType: Yup.string()
      .required("Required CUSTOMER | ENGINEER")
      .oneOf([constant.userType.customer, constant.userType.engineer]),
  });

  function userTypeHandler(e) {
    if (userType === constant.userType.customer) {
      setUserType(constant.userType.engineer);
    } else {
      setUserType(constant.userType.customer);
    }
  }

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
          <div className="bg-white w-[10rem] border-2 border-slate-800 rounded-full  mx-auto my-9 transcplate ">
            {userType === constant.userType.customer ? (
              <img className="w-44" src={CustomerPic} alt="customer-pic" />
            ) : (
              <img className="w-44" src={EngineerPic} alt="engineer-pic" />
            )}
          </div>

          <div className=" w-full left-0 translate-x-0  border-2 border-gray-400 rounded-lg bg-cyan-200  sm:w-[50%] sm:relative sm:left-1/2 sm:-translate-x-1/2">
            <Form className="w-[95%] mx-auto text-center mt-2 bg-zinc-400 rounded-sm p-2">
              <table className="w-full ">
                <tbody>
                  <tr className="row">
                    <td className="label">Name</td>
                    <td className="input-field" maxLength="10">
                      <Field
                        type="text"
                        className="input-box"
                        name="name"
                        placeholder="Enter your name"
                      />

                      <ErrorMessage name="name" component={ErrorMsg} />
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="label">Email</td>
                    <td className="input-field" maxLength="20">
                      <Field
                        type="email"
                        className="input-box"
                        name="email"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage name="email" component={ErrorMsg} />
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="label">UserId</td>
                    <td className="input-field" maxLength="10">
                      <Field
                        type="text"
                        className="input-box"
                        name="userId"
                        placeholder="Enter your userId"
                      />
                      <ErrorMessage name="userId" component={ErrorMsg} />
                    </td>
                  </tr>
                  <tr className="row">
                    <td className="label">Password</td>
                    <td className="input-field" maxLength="20">
                      <Field
                        type="password"
                        className="input-box"
                        name="password"
                        placeholder="Enter your password"
                      />
                      <ErrorMessage name="password" component={ErrorMsg} />
                    </td>
                  </tr>
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
            <div className=" mx-3 mb-5 h-12 grid grid-cols-2 text-center bg-pink-200 rounded-bl-md rounded-br-md text-sm ">
              <div className="grid items-center hover:text-blue-700">
                <Link to="/login" className="login-href">
                  I have already Account
                </Link>
              </div>
              <div className="grid items-center hover:text-blue-700">
                {userType === constant.userType.customer ? (
                  <button
                    className="login-href"
                    onClick={() => userTypeHandler()}
                  >
                    SignUp as Engineer
                  </button>
                ) : (
                  <button
                    className="login-href"
                    onClick={() => userTypeHandler()}
                  >
                    SignUp as Customer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Formik>
      <ToastContainer theme="dark" />
    </>
  );
}

export default SignUp;
