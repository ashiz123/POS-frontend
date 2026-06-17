import React, { useState } from "react";

export const LoginTerminalComponent: React.FC = () => {
  const [pin, setPin] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleNumberClick = (num: string) => {
    if (pin.length < 6) {
      setPin((prev) => prev + num);
      setError(null);
    }
  };

  const handleClear = () => setPin("");

  const handleLogin = async () => {
    if (pin.length < 4) {
      setError("Please enter a valid PIN.");
      return;
    }

    setIsLoading(true);
    try {
      // Logic would call your signInForTerminal service here
      console.log("Authenticating terminal with PIN:", pin);
      // await authService.signInForTerminal({ pin });
    } catch (err: any) {
      console.log(err);
      setError("Invalid PIN. Please try again. ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Terminal Login</h1>
          <p className="text-sm text-gray-500">
            Enter your access PIN to open the till
          </p>
        </div>

        {/* PIN Display */}
        <div className="mb-8 flex justify-center gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`h-4 w-4 rounded-full border-2 border-blue-500 transition-all duration-200 ${
                pin.length > i ? "bg-blue-500 scale-110" : "bg-transparent"
              }`}
            />
          ))}
        </div>

        {error && (
          <p className="mb-4 text-center text-sm font-medium text-red-500">
            {error}
          </p>
        )}

        {/* Keypad Grid */}
        <div className="grid grid-cols-3 gap-4">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="flex h-16 items-center justify-center rounded-xl bg-gray-50 text-xl font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:scale-95 transition-all"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="flex h-16 items-center justify-center rounded-xl bg-red-50 text-sm font-bold text-red-600 hover:bg-red-100"
          >
            CLEAR
          </button>
          <button
            onClick={() => handleNumberClick("0")}
            className="flex h-16 items-center justify-center rounded-xl bg-gray-50 text-xl font-semibold text-gray-700 hover:bg-blue-50"
          >
            0
          </button>
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="flex h-16 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "..." : "ENTER"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginTerminalComponent;
