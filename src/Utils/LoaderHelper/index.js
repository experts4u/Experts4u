import { Loader_Ref } from "Utils/RefsHelper";

export const StartLoader = () => {
  Loader_Ref.current.startLoader();
};

export const StopLoader = () => {
  Loader_Ref.current.stopLoader();
};
