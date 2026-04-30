import { useState } from "react";
import type { RegisterData } from "../validations/registerValidations";

//Advance than just doing useState<Record<string, string>>
type FormErrors = Partial<Record<keyof RegisterData | "root", string>>;

const useForm = (initalFormData, validation) => {
  const [formData, setFormData] = useState(initalFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e, callback) => {
    e.preventDefault();
    const result = validation.safeParse(formData);

    if (!result.success) {
      const newErrors = {};
      result.error.issues.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    callback(result);
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
