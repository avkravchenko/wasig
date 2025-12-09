import * as yup from "yup";
import "yup-phone-lite";

const phoneSchema = yup
  .string()
  .phone("RU", "Please enter a valid phone number")
  .required()
  .min(11)
  .max(11);

export default phoneSchema;
