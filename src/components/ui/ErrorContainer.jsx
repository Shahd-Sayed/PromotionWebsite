import ErrorAlert from "./ErrorAlert";

const ErrorContainer = ({ message,  }) => {
  if (!message) return null;

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 space-y-4">
      <ErrorAlert message={message} />    
    </div>
  );
};

export default ErrorContainer;
