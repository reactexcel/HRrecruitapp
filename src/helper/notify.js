import { Toast } from "native-base";

export const notify = (text, type = "default") => {
  Toast.show({
    text: text,
    duration: 3000,
    type: type
  });
};
