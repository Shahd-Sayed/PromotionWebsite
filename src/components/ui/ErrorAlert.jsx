
const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-sm text-red-600">{message}</p>
    </div>
  );
};

export default ErrorAlert;
