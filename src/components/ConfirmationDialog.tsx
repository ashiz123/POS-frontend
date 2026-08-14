import React from "react";
import { AlertTriangle, X, Check, Trash2 } from "lucide-react";

/**
 * A professional, reusable Confirmation Dialog for your POS.
 *
 * @param {boolean} isOpen - Controls visibility.
 * @param {string} title - The header text.
 * @param {string} message - The body text explanation.
 * @param {function} onConfirm - Function to run on success.
 * @param {function} onCancel - Function to run on close.
 * @param {string} type - 'danger' for destructive actions, 'info' for general.
 */
export const ConfirmationDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  type = "danger",
}) => {
  if (!isOpen) return null;

  const colors = {
    danger: {
      bg: "bg-red-50",
      text: "text-red-700",
      icon: <Trash2 className="w-6 h-6 text-red-600" />,
      btn: "bg-red-600 hover:bg-red-700 text-white",
    },
    info: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: <AlertTriangle className="w-6 h-6 text-blue-600" />,
      btn: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    primary: {
      bg: "bg-primary-50",
      text: "text-primary-700",
      icon: <AlertTriangle className="w-6 h-6 text-primary-600" />,
      btn: "bg-primary-600 hover:bg-primary-700 text-white",
    },
  };

  const active = colors[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-full ${active.bg}`}>{active.icon}</div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold transition ${active.btn} flex items-center justify-center gap-2`}
          >
            {type === "danger" ? (
              <Trash2 className="w-4 h-4" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// export default function ExampleUsage() {
//   const [isDialogOpen, setIsDialogOpen] = React.useState(false);

//   return (
//     <div className="p-10">
//       <button
//         onClick={() => setIsDialogOpen(true)}
//         className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold"
//       >
//         Delete Item
//       </button>

//       <ConfirmationDialog
//         isOpen={isDialogOpen}
//         type="danger"
//         title="Delete Transaction?"
//         message="This action is permanent and cannot be undone. Are you sure you want to proceed?"
//         onCancel={() => setIsDialogOpen(false)}
//         onConfirm={() => {
//           console.log("Item deleted");
//           setIsDialogOpen(false);
//         }}
//       />
//     </div>
//   );
// }
