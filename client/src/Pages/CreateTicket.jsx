import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import Ticket from "../Services/ticketService";

import ErrorMsg from "../Components/ErrorMsg";
import { ToastContainer, toast } from "react-toastify";
const CreateTicket = () => {

  /**todo: 
   * 1.add error field.
   * 2.make responsive for the desktop.
   * 3. test the api error message
  */
  const initialValues = {
    title: "",
    description: "",
    ticketPriority: "",
    // status : "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title Required"),
    ticketPriority: Yup.number().required("Ticket Priority is Required"),
    description: Yup.string().required("Description is Required "),
  });

  const onSubmit = async (values, submitProps) => {
    // console.log("form data", values);

    const result = await Ticket.createTicket({
      ...values, accessToken : Cookies.get('x-access-token')
    })

    if(result){
      if(result.status === 201){
        (()=>toast.success('Ticket created successfully'))();
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
  return (
    <section
      className="relative w-full h-full"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1679598018476-3987536a45fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        // height : 'calc( 100vh - 3.5rem)'
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        <Form className="relative mx-4" >
          <div className=" bg-slate-50 py-2 px-2">
            <div className="flex justify-between items-center h-16 border-2 border-red-400">
              <div className="w-40 h-full flex items-center justify-start px-4 py-2 ">
                <label htmlFor="title">Title</label>
              </div>
              <div className="h-full w-full flex justify-center items-center">
                <Field type="text" name="title" placeHolder="Enter Title"
                className='border-2 border-gray-300 mr-2 shadow-black shadow-sm rounded-xl text-sm w-full py-2 px-2' />
              </div>
            </div>
            <div className="flex justify-between items-center h-32">
              <div className="w-40 h-full flex items-start justify-start px-4 py-2 ">
                <label htmlFor="description">Description</label>
              </div>
              <div className="h-full w-full flex justify-center items-center">
                <Field
                  as="textarea"
                  name="description"
                  placeHolder="write description"
                  className='border-2 border-gray-300 mr-2 shadow-black shadow-sm rounded-xl text-sm w-full h-[80%] py-2 px-2  '
                />
              </div>
            </div>
            <div className="flex justify-between items-center h-16">
              <div className="w-40 h-full flex items-center justify-start px-4 py-2 ">
                <label htmlFor="priorty">Priority</label>
              </div>
              <div className="h-full w-full flex justify-center items-center">
                <Field as="select" name="ticketPriority"
                className='border-2 border-gray-300 mr-2 shadow-black shadow-sm rounded-xl text-sm w-full py-2 px-2' >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>

                </Field>
              </div>
            </div>
            <div className="flex justify-center items-center  text-white ">
              <button type="sumbit" 
              className="bg-slate-600 py-3 px-6 uppercase font-semibold hover:text-black hover:bg-green-500">create ticket</button>
            </div>
            {/* <div className="errorMsg">
              <ErrorMessage component={ErrorMsg}/>
            </div> */}
          </div>
          
        </Form>
      </Formik>
      <ToastContainer/>
    </section>
  );
};

export default CreateTicket;
