import { useState } from "react";

//Advance than just doing useState<Record<string, string>>
type FormErrors<T> = Partial<Record<keyof T | "root", string>>;

const useForm = <T>(initalFormData, validation) => {
  const [formData, setFormData] = useState<T>(initalFormData);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleImageSelect = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
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
      console.log(newErrors);
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
    success,
    setSuccess,
    loading,
    setLoading,
    handleImageSelect,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
