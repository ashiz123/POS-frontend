export const ValidationError = ({ children }) => {
  return <span className="error-text">{children}</span>;
};

export const SuccessMessage = ({ children, onClose }) => {
  return (
    <div className="flex items-center justify-between gap-3 p-4 m-5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-3">
        {/* Success Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-500"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span className="text-sm font-semibold tracking-wide">{children}</span>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="p-1 hover:bg-emerald-100 rounded-md transition-colors text-emerald-500 hover:text-emerald-700"
        title="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

export const InfoMessage = ({ children }) => {
  return <span className="info-text">{children}</span>;
};

export const WarningMessage = ({ children }) => {
  return <span className="warning-text">{children}</span>;
};

export const ErrorMessage = ({ children }) => {
  return <span className="error-message">{children}</span>;
};
