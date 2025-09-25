"use client"
import Lottie from "lottie-react";
import notfound from "../../../public/animations/not-founds.json"
const NotFoundPage = () => {
  return (
    <div className="w-full min-h-[50rem] flex flex-col items-center justify-center  rounded-lg ">
      <Lottie
        animationData={notfound}
        className=" w-[18rem] h-[18rem] lg:w-[45rem] lg:h-[30rem]"
      />
  
    </div>
  );
};

export default NotFoundPage;
