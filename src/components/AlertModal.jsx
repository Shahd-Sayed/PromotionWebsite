import Swal from "sweetalert2";

export const showAlert = ({
  title,
  text,
  icon = "success",
  onConfirm,
  showCancel = false,
  confirmText = "OK",
  cancelText = "Cancel",
}) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: showCancel,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    allowOutsideClick: false,
    background: "#1F2937",
    color: "#FFFFFF",
    iconColor: icon === "success" ? "#10B981" : "#EF4444",
    customClass: {
      confirmButton:
        "bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-lg transition-all",
      cancelButton:
        "bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-all",
    },
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    }
  });
};
