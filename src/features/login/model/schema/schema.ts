import * as yup from "yup";
import "yup-phone-lite";

const phoneSchema = yup
  .string()
  .phone("RU", "Please enter a valid phone number")
  .required()
  .min(12)
  .max(12);

export default phoneSchema;
