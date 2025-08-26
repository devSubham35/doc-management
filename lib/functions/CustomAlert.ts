import { toast } from "sonner";

class CustomAlert {
  static success = (message: string) => {
    toast.success(message);
  };
  static error = (message: string) => {
    toast.error(message);
  };
  static warning = (message: string) => {
    toast.warning(message);
  };
}

export default CustomAlert;
