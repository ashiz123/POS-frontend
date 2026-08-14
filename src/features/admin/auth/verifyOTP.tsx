import React, { useState, useRef, useEffect } from "react";
import { verifyOtp } from "../../../services/admin/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const VerifyOTP = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { setUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (!value) return; // Backspace is now handled by onKeyDown

    const newOtp = [...otp];
    // Take the last char (helps if user types over an existing number)
    const char = value.substring(value.length - 1);
    newOtp[index] = char;
    setOtp(newOtp);

    // Move forward
    if (index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      // 1. Stop the browser's default behavior
      e.preventDefault();

      const newOtp = [...otp];

      if (otp[index]) {
        // 2. Logic: If the current box has a value, just clear it
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // 3. Logic: If current box is already empty, jump back AND clear that one
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length === 6) {
      console.log("Verifying OTP:", finalOtp);
      const loggedInUser = await verifyOtp(finalOtp);
      setUser(loggedInUser.userData);
      console.log("User logged in:", loggedInUser);
      navigate("/business/select");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 font-sans text-slate-800">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Security Verification
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Enter the 6-digit code sent to your device.
          </p>
        </div>

        {/* Input Circuit */}
        <div className="flex gap-2 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              name="otp"
              title="otp"
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-800 focus:border-primary-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            />
          ))}
        </div>

        {/* Submit Switch */}
        <button
          type="submit"
          disabled={otp.some((val) => val === "")}
          className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] uppercase tracking-widest text-sm"
        >
          Verify Code
        </button>

        <button
          type="button"
          className="mt-4 text-xs font-bold text-primary-600 hover:text-primary-800 uppercase tracking-tighter"
        >
          Resend Code
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
