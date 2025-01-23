export default function Popup({ isOpen, onClose, title, children, footerButtons }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div className="bg-white rounded-lg shadow-xl w-[500px] max-h-[90vh] px-6 pt-6 pb-4 relative overflow-hidden">
          {/* Close Button */}
          <button
            className="absolute top-0 right-2 text-primary text-lg font-bold"
            onClick={onClose}
          >
            &times;
          </button>
  
          {/* Title */}
          {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
  
          {/* Dynamic Content with Scroll */}
          <div className="mb-6 overflow-y-auto max-h-[65vh] pr-2">
            {children}
          </div>
  
          {/* Footer Buttons */}
          {footerButtons && (
            <div className="flex justify-between gap-4">
              {footerButtons.map((button, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 flex-1 rounded-full ${
                    button.variant === "primary"
                      ? "bg-red-500 text-white text-sm font-medium"
                      : "border border-primary text-sm font-medium text-primary"
                  }`}
                  onClick={button.onClick}
                  disabled={button.disabled}
                >
                  {button.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  