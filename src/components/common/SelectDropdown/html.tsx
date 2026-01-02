import React, { Fragment } from "react";
import methodModel from "../../../methods/methods";
import "./style.scss";
import Select from "react-select";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Html = ({
  options,
  dynamicStyle = false,
  className = "w-full",
  inputValue = "",
  selectedValues,
  onInputChange = (e: any) => {},
  handleChange = () => {},
  displayValue,
  id = "",
  placeholder,
  required,
  disabled,
  name = "",
  noDefault,
  hideDefaultPosition = false,
  theme = "normal",
}: any) => {
  const categoryVal = () => {
    let ext = options && options.find((item: any) => item.id == selectedValues);
    return ext ? { value: ext.id, label: ext[displayValue] } : "";
  };

  return (
    <>
      {theme == "search" ? (
        <>
          <div
            className={`${className || "right_section capitalize"} capitalize`}
          >
            <Select
              // styles={{
              //   menuPortal: (base) => ({ ...base, zIndex: 999 }),
              // }}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 999 }),
                input: (base) => ({
                  ...base,
                  fontSize: "16px",
                }),
                placeholder: (base) => ({
                  ...base,
                  fontSize: "16px",
                }),
                singleValue: (base) => ({
                  ...base,
                  fontSize: "16px",
                }),
              }}
              menuPortalTarget={document.body}
              options={
                options?.map((itm: any) => {
                  return {
                    value: itm.id,
                    label: methodModel.capitalizeFirstLetterOfEachWord(
                      itm[displayValue]
                    ),
                  };
                }) || []
              }
              placeholder={placeholder}
              value={categoryVal()}
              isClearable={false}
              name={name}
              // formatOptionLabel="bordere"
              // inputValue={inputValue}
              onInputChange={onInputChange}
              onChange={(e: any) => handleChange(e?.value || "")}
              className="text-gray-700  block text-sm options_classs"
              isDisabled={disabled ? true : false}
              required={required}
              // menuIsOpen={true}

            />
          </div>
        </>
      ) : (
        <>
          <div className="selectDropdown">
            <input
              type="hidden"
              name={name}
              required={required}
              value={selectedValues}
            />
            <div className="dropdown addDropdown">
              <Menu as="div" className="relative list_box_active_state ml-auto">
                <div>
                  <Menu.Button
                    disabled={disabled}
                    id={"dropdownMenuButton" + id}
                    className={`capitalize inline-flex w-full border border-[#00000036] justify-start gap-x-1.5 rounded-full bg-white px-3 py-2.5 text-sm font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 ${className}`}
                  >
                    {selectedValues
                      ? methodModel.find(options, selectedValues, "id")?.[
                          displayValue
                        ] || placeholder
                      : placeholder}
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className={`${
                      dynamicStyle ? "" : "max-h-60"
                    }  focus:!outline-none text-sm absolute z-40 w-full ${
                      className ? className : " min-w-[260px]"
                    }  right-0 shadow-lg !py-2 !mt-1.5 overflow-auto bg-white  rounded-lg scrollbar capitalize`}
                  >
                    <div className="mt-2">
                      {hideDefaultPosition ? null : (
                        <>
                          {noDefault ? (
                            <Menu.Item disabled={disabled}>
                              {({ active }) => (
                                <a
                                  className={
                                    selectedValues == ""
                                      ? "text-gray-700 block px-4 py-2 text-sm active"
                                      : "text-gray-700 block px-4 py-2 text-sm"
                                  }
                                  onClick={() => handleChange("")}
                                >
                                  {placeholder}
                                </a>
                              )}
                            </Menu.Item>
                          ) : (
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={
                                    selectedValues == ""
                                      ? "text-gray-700 block px-4 py-2 text-sm active"
                                      : "text-gray-700 block px-4 py-2 text-sm"
                                  }
                                  onClick={() => handleChange("")}
                                >
                                  {placeholder}
                                </a>
                              )}
                            </Menu.Item>
                          )}
                        </>
                      )}
                      {options &&
                        options.map((itm: any) => {
                          return (
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={
                                    selectedValues == itm.id
                                      ? "text-gray-700 block px-4 py-2 text-sm active"
                                      : "text-gray-700 block px-4 py-2 text-sm"
                                  }
                                  onClick={() => handleChange(itm.id)}
                                  key={itm.id}
                                >
                                  {itm[displayValue]}
                                </a>
                              )}
                            </Menu.Item>
                          );
                        })}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* <button disabled={disabled} className={`flex justify-center items-center gap-1 bg-[#1E9ABC] !rounded-full inline-block shadow-btn px-6 py-2.5 hover:opacity-80 text-sm text-white w-fit dropdown-toggle removeBg ${className}`} type="button" id={"dropdownMenuButton" + id} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {selectedValues ? methodModel.find(options, selectedValues, 'id')?.[displayValue] || placeholder : placeholder}
                    </button>
                    <div className="dropdown-menu shadow bg_hover" aria-labelledby={"dropdownMenuButton" + id}>
                        {noDefault ? <a className={selectedValues == '' ? 'text-gray-700 block px-4 py-2 text-sm active disabled' : 'text-gray-700 block px-4 py-2 text-sm disabled'} disabled>{placeholder}</a> : <a className={selectedValues == '' ? 'text-gray-700 block px-4 py-2 text-sm active' : 'text-gray-700 block px-4 py-2 text-sm'} onClick={() => handleChange('')}>{placeholder}</a>}
                        {options && options.map(itm => {
                            return <a className={selectedValues == itm.id ? 'text-gray-700 block px-4 py-2 text-sm active' : 'text-gray-700 block px-4 py-2 text-sm'} onClick={() => handleChange(itm.id)} key={itm.id}>{itm[displayValue]}</a>
                        })}
                    </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Html;
