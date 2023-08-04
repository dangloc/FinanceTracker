
function Modal({ show, onClose, children }) {
  return (
    <>
      
      <div
        style={{
          transform: show ? "translateX(0%)" : "translateX(-200%)",
        }}
        className="absolute top-0 left-0 w-full h-full  z-50 transform transition-all duration-500"
      >
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-70 z-[10]"></div>
        <div className="h-screen relative">
          <div className="container absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50  m-auto max-w-2xl h-[80vh] rounded-3xl bg-gradient-to-tl from-blue-100 via-purple-100 to-pink-100 py-6 px-4 overflow-auto" >
            <button
              className="w-10 h-10 rounded-full bg-red-700 text-white font-bold mb-4"
              onClick={() => onClose(false)}
            >
              X
            </button>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
