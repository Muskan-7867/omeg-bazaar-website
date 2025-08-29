import { FaCheckCircle } from "react-icons/fa"


const SuccessMessage = ( { successMessage }: { successMessage: string | null}) => {
  return (
    <div className="absolute inset-0 bg-white  flex items-center justify-center z-10 ">
    <div className=" p-6  max-w-sm w-full text-center">
      <FaCheckCircle className="text-primary text-5xl mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
      <p className="text-gray-600 mb-4">{successMessage}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-primary h-2.5 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
  )
}

export default SuccessMessage;
