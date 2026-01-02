import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { PiDotsThreeCircleVerticalLight } from "react-icons/pi";

const OptionDropdown = ({
  position = "absolute",
  disabled = false,
  options = [],
  className = "",
  onChange = (_) => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const scrollX =
        position == "fixed"
          ? window.screenX || window.screenLeft
          : window.scrollX;
      const scrollY =
        position == "fixed"
          ? window.screenY || window.screenTop
          : window.scrollY;
      const rect = buttonRef.current.getBoundingClientRect();

      let left = rect.left + scrollX;
      let top = rect.bottom + scrollY;
      if (position == "fixed") {
        left = rect.left;
        top = rect.bottom;
      }

      setDropdownStyle({
        position: position,
        top: `${top}px`,
        left: `${left}px`,
        minWidth: `${rect.width}px`,
        zIndex: 9999,
        background: "white",
      });
    }
  }, [isOpen]);

  const handleClickFunction = (data) => {
    setIsOpen((prev) => !prev);
    data?.handleOnChange?.();
  };
  return (
    <>
      <button
        type="button"
        disabled={disabled}
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative text-[#333] w-full rounded-lg h-10 flex items-center text-left text-sm gap-2 z-9 overflow-hidden px-2 ${className}`}
      >
        <PiDotsThreeCircleVerticalLight className="text-[40px] font-medium text-[#ccc]" />
      </button>

      {isOpen &&
        createPortal(
          <div ref={dropdownRef}>
            <div
              className="fixed w-full h-full z-[9] top-0 left-0"
              onClick={() => setIsOpen(false)}
            ></div>
            <div
              style={dropdownStyle}
              className="rounded-[5px] border !min-w-[150px] !z-[9] mt-2"
            >
              <div className="overflow-auto max-h-[300px] text-[14px]">
                {options.map((option) => (
                  <>
                    {option?.isVisible ? (
                      <div
                        className="flex gap-2 items-center hover:bg-gray-100 transition-all duration-200 px-4 py-2 cursor-pointer"
                        onClick={() =>{ handleClickFunction(option);setIsOpen(false)}}
                      >
                        <span className="border cursor-pointer hover:opacity-70 rounded-full bg-[#1E5DBC14] p-[3px] min-w-8 w-8 h-8 !text-[#6c6c6c] flex items-center justify-center text-lg">
                          {option?.icon}
                        </span>
                        <p className="font-semibold text-[14px]">
                          {option?.name}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default OptionDropdown;
