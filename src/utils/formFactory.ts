import { createFormFactory } from "@tanstack/react-form";
import { yupValidator } from "@tanstack/yup-form-adapter";
import * as yup from "yup";
export { yup };

export const formFactory = createFormFactory({
  validatorAdapter: yupValidator,
});
