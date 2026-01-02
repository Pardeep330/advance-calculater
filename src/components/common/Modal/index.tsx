import { BsBagCheckFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

export default function Modal({
  result = (e: any) => {},
  body = <>test</>,
  isownclass = "",
  type = "",
  title = "",
  className = "max-w-4xl m-auto",
  footer = "",
  scroll = "",
  length = 0,
  schedule = false,
}) {
  const close = () => {
    result({ event: "close" });
  };

  return (
    <>
      <div className="modal overflow-x-hidden fixed top-0 right-0 left-0 z-[999] justify-center items-center w-full md:inset-0  max-h-full h-full flex">
        <div
          className={`relative flex w-full ${className} mx-auto flex px-3`}
        >
          <div
            className={`${
              schedule ? "" : ""
            } relative bg-white rounded-[15px] shadow w-full`}
          >
            {title != "" ? (
              <div
                className={`${
                  schedule ? "z-[9] relative" : ""
                } flex items-center justify-between p-5 border-b rounded-t`}
              >
                <h3 className="text-xl font-semibold text-gray-900 ">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={close}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            ) : (
              ""
            )}
            {scroll ? (
              <div
                className={`${
                  length > 1 ? "h-[calc(100vh-200px)] " : "h-[calc(100vh-200px)] "
                }  overflow-auto p-3 md:p-4 p-3 md:p-4 space-y-4`}
              >
                {body}
              </div>
            ) : (
              <div
                className={`${
                  type === "yes"
                    ? "p-0"
                    : isownclass
                    ? ""
                    : ""
                }  `}
              >
                {body}
              </div>
            )}
            {footer}
          </div>
        </div>
      </div>
    </>
  );
}
