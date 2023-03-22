import React from "react";
import { BallTriangle } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="red"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
