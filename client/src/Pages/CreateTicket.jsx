import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import Ticket from "../Services/ticketService";
import { Rating } from "@mui/material";
import ErrorMsg from "../Components/ErrorMsg";
import { ToastContainer, toast } from "react-toastify";
const CreateTicket = () => {
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();
  /**todo:
   * 1.add error field.
   * 2.make responsive for the desktop.
   * 3. test the api error message
   */
  const initialValues = {
    title: "",
    description: "",
    ticketPriority: 2,
    // status : "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title Required"),
    ticketPriority: Yup.number().required("Ticket Priority is Required"),
    description: Yup.string().required("Description is Required "),
  });

  const onSubmit = async (values, submitProps) => {
    console.log("form data", values);

    const result = await Ticket.createTicket({
      ...values,
      accessToken: Cookies.get("x-access-token"),
    });

    if (result) {
      if (result.status === 201) {
        (() => toast.success("Ticket created successfully"))();
        setIsValid(false); // reset validity

        // navigate('/')

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
        isValid={isValid} // add the isValid property
        setIsValid={setIsValid} // pass the setIsValid function
      >
        <Form className="relative top-14  mx-4 py-4 px-2 lg:mx-52 border-gray-400 shadow-md shadow-gray-600 rounded-lg bg-slate-500 h-auto box-border">
          <div className=" bg-slate-50 py-2 px-2 ">
            <div className="flex justify-between items-center h-16 border-2 ">
              <div className="w-40 h-full flex items-center justify-start px-4 py-2 ">
                <label htmlFor="title">Title</label>
              </div>
              <div className="h-full w-full flex justify-center items-center">
                <Field
                  type="text"
                  name="title"
                  placeHolder="Enter Title"
                  className="border-2 border-gray-300 mr-2 shadow-black shadow-sm rounded-xl text-sm w-full py-2 px-2"
                />
              </div>
            </div>
            <div className="relative flex justify-between items-center h-32 lg:h-52 border-2">
              <div className="w-40 h-full flex items-start justify-start px-4 py-2 ">
                <label htmlFor="description">Description</label>
              </div>
              <div className=" h-full  w-full flex justify-center items-start mt-4 ">
                <Field
                  as="textarea"
                  name="description"
                  placeHolder="write description"
                  className="border-2 border-gray-300 mr-2 shadow-black shadow-sm rounded-xl text-sm w-full h-[80%] py-2 px-2 resize-none "
                />
              </div>
            </div>
            <div className="flex justify-between items-center h-16 border-2">
              <div className="w-40 h-full flex items-center justify-start px-4 py-2 ">
                <label htmlFor="priorty">Priority</label>
              </div>
              <div className="h-full w-full flex justify-center items-center">
                <Field name="ticketPriority">
                  {({ field, form, meta }) => (
                    <Rating
                      defaultValue={2}
                      
                      name={field.name}
                      value={field.value}
                      onChange={(event, newValue) => {
                        form.setFieldValue(field.name, newValue);
                      }}
                    />
                  )}
                </Field>
              </div>
            </div>
            <div className="flex justify-center items-center  text-white mt-5 ">
              <button
                type="sumbit"
                disabled={!isValid} // add the disabled property

          
                className="bg-slate-600 py-3 px-6 uppercase font-semibold hover:text-black hover:bg-green-500 disabled:bg-gray-200 disabled:hover:text-white"
              >
                create ticket
              </button>
            </div>
            <div className="mt-5">
              <ErrorMessage name="title" component={ErrorMsg} />
              <ErrorMessage name="description" component={ErrorMsg} />
            </div>
          </div>
        </Form>
      </Formik>
      <ToastContainer />
    </section>
  );
};

export default CreateTicket;
