interface popup {

  type: string;
  message: string;
}
const PaymentPopUp = ({ popup }: { popup: popup }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xl bg-opacity-50`}
    >
      <div
        className={`p-6 rounded-lg shadow-xl max-w-md w-full mx-4 ${
          popup.type === "success"
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        }`}
      >
        <div className="flex items-center">
          {popup.type === "success" ? (
            <svg
              className="w-6 h-6 text-green-500 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-red-500 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          <h3
            className={`text-lg font-medium ${
              popup.type === "success" ? "text-green-800" : "text-red-800"
            }`}
          >
            {popup.message}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopUp;
