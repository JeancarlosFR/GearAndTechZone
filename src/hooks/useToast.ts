import { toast } from "react-toastify";

export const useToast = () => {
  const mostrarAlertaSuccess = (mensaje: string) => {
    toast.success(mensaje, {
      position: "top-left",
      autoClose: 2000,
    });
  };

  const mostrarAlertaError = (mensaje: string) => {
    toast.error(mensaje, {
      position: "top-left",
      autoClose: 2000,
    });
  };

  return { mostrarAlertaSuccess, mostrarAlertaError };
};