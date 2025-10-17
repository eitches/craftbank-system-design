import toast from "react-hot-toast";

type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export const successNotifier = (
  message: string,
  option?: { position?: Position },
) => {
  void toast.success(message, option);
};

export const errorNotifier = (
  message: string,
  option?: { position?: Position },
) => {
  void toast.error(message, option);
};
