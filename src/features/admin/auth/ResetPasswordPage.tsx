import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../../services/admin/user";
import ResetPasswordForm from "../../../components/resetPasswordForm";

export const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const { token } = useParams();

  console.log(token);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(
    token ? "" : "Invalid or missing reset token.",
  );
  const [success, setSuccess] = useState("");

  const handleResetPassword = async ({ newPassword, confirmPassword }) => {
    if (!token) {
      setError(
        "Missing reset token. Please request a new password reset link.",
      );
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await resetPassword(token, newPassword, confirmPassword);
      console.log(res);
      setSuccess(
        res.data?.message || "Password successfully reset! You can now log in.",
      );
    } catch (err: any) {
      const serverMessage =
        err.data?.message ||
        "Failed to reset password. Please try again or request a new link.";
      setError(serverMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const goLoginPage = () => {
    navigate("/business/login");
  };

  return (
    <ResetPasswordForm
      onSubmit={handleResetPassword}
      error={error}
      success={success}
      isLoading={isLoading}
      onGoLogin={goLoginPage}
    />
  );
};

export default ResetPasswordPage;
