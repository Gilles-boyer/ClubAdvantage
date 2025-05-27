import { useEffect } from "react";

export default function ToastAlert({ toast, setToast, }) {
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ ...toast, show: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, setToast]);

  if (!toast.show) return null;

  return (
    <div className="toast toast-end">
      <div className={`alert ${toast.type === 'success' ? 'alert-success' : 'alert-error'}`}>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
