import { useState } from "react";
import methodModel from "../../../methods/methods";
import SelectDropdown from "../SelectDropdown";
import "./style.scss";
import ReactQuill from 'react-quill';
import PhoneInput from "react-phone-input-2";
import MultiSelectDropdown from "../MultiSelectDropdown";
import datepipeModel from "../../../models/datepipemodel";
export default function FormControl({
  name,
  id = "",
  valueType = "string",
  onInputChange = (e: any) => { },
  inputValue = "",
  displayValue = "name",
  placeholder = "",
  type = "text",
  options = [],
  error,
  label,
  required = false,
  onChange = () => { },
  maxlength = "",
  minlength = "",
  min = "",
  className = "",
  value,
  disabled = false,
  theme = "",
  isObject = false,
  onkeyDown = (e: any) => { },
  data = "",
  max = ""
}: any) {
  const [text, setText] = useState("");
  const [eye, setEye] = useState(false);


  const add = () => {
    let arr = value || [];
    if (text) {
      arr.push(text);
    }
    onChange(arr);
    setText("");
  };

  const remove = (i: any) => {
    let arr = value || [];
    arr = arr.filter((itm: any, index: any) => index != i);
    onChange(arr);
  };

  const addItem = (v: any) => {
    let arr = value || [];
    let ext = arr?.find((itm: any) => itm == v);

    if (ext) {
      arr = arr.filter((itm: any) => itm != v);
    } else {
      arr.push(v);
    }

    onChange(arr);
  };

  return (
    <>
      <div className="formWrapper relative">
        {label ? (
          <>
            <label className="text-xs mb-2 block">
              {label}{" "}
              {required ? (
                <>
                  <span className="star">*</span>
                </>
              ) : (
                <></>
              )}
            </label>
          </>
        ) : (
          <></>
        )}

        {type == "select" ? (
          <SelectDropdown
            id={`statusDropdown_${id}`}
            displayValue={displayValue}
            className={className}
            valueType={valueType}
            onInputChange={onInputChange}
            inputValue={inputValue}
            placeholder={placeholder}
            intialValue={value || ""}
            name={name}
            theme={theme}
            result={(e: any) => {
              onChange(e.value);
            }}
            isObject={isObject}
            options={options}
            disabled={disabled}
            required={required}
          />
        ) : type == "multiselect" ? (
          <MultiSelectDropdown
            id={`statusDropdown_${id}`}
            displayValue={displayValue}
            className={className}
            placeholder={placeholder}
            intialValue={value || ""}
            result={(e: any) => {
              onChange(e.value);
            }}
            isObject={isObject}
            options={options}
            disabled={disabled}
            required={required}
          />
        )
          : type == "date" ? (
            <input
              type="date"
              name={name}
              className={`${disabled ? "bg-gray-100" : "bg-white"} relative w-full rounded-lg h-10  overflow-hidden px-2 border border-[#00000036]`}
              required={required}
              placeholder={placeholder}
              value={value || ""}
              maxLength={maxlength}
              minLength={minlength}
              min={min}
              disabled={disabled}
              max={max}
              autoComplete="off"
              onChange={(e) => onChange(e.target.value)}
            />
          ) : type == "phone" ? (
            <>
              <PhoneInput
                country="uk"
                value={value}
                placeholder="+44 0000000000"
                enableSearch={true}
                onChange={(e) => onChange(e)}
                countryCodeEditable={true}
              />
            </>
          ) : type == "number" ? (
            <input
              type="text"
              name={name}
              className={`${disabled ? "bg-gray-100" : "bg-white"} relative   w-full rounded-lg h-10  overflow-hidden px-2 border border-[#00000036]`}
              required={required}
              placeholder={placeholder}
              value={value || ""}
              maxLength={maxlength}
              minLength={minlength}
              min={min}
              disabled={disabled}
              autoComplete="off"
              onChange={(e) => onChange(methodModel.isNumber(e))}
            />
          ) : type == "badge" ? (
            <>
              <div className="flex">
                <input
                  type="text"
                  className="relative border border-[#00000036] bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-3"
                  placeholder={placeholder}
                  value={text}
                  disabled={disabled}
                  autoComplete="off"
                  onChange={(e) => setText(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary ml-2"
                  disabled={disabled}
                  onClick={add}
                >
                  Add
                </button>
              </div>
              <div className="">
                {value?.map((itm: any, i: any) => {
                  return (
                    <span className="badge badge-primary m-1">
                      {itm}
                      <i
                        className="fa fa-times ml-1"
                        onClick={() => remove(i)}
                      ></i>
                    </span>
                  );
                })}
              </div>
            </>
          ) : type == "radio" ? (
            <>
              <div className="flex items-center gap-x-4 mt-3">
                {options.map((itm: any) => {
                  return (
                    <div className="">
                      {" "}
                      <label className="border border-[#00000036] px-6 py-2 rounded-lg flex cursor-pointer">
                        <input
                          type="radio"
                          checked={value == itm.id ? true : false}
                          onChange={(e) => onChange(itm.id)}
                          className="mr-2"
                          name={name}
                          autoComplete="off"
                          disabled={disabled}
                        />
                        {itm.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </>
          ) : type == 'textarea' ? <>
            <textarea
              name={name}
              className={`relative border border-[#00000036] bg-white outline-none w-full rounded-lg min-h-[150px] flex items-center gap-2  px-3 pt-2 ${data == "a" ? "abc" : ""}`}
              required={required}
              placeholder={placeholder}
              value={value || ""}
              maxLength={maxlength}
              minLength={minlength}
              disabled={disabled}
              autoComplete="off"
              onChange={(e) => {
                onChange(e.target.value);
              }}
              onKeyDown={onkeyDown}
            />
          </> : type == "editor" ? (
            <>
              <ReactQuill theme="snow" value={value} onChange={onChange} />
            </>
          ) : type == "checkbox" ? (
            <>
              {options.map((itm: any) => {
                return (
                  <label className="flex">
                    <input
                      type="checkbox"
                      checked={value?.includes(itm.id) ? true : false}
                      onChange={(e) => addItem(itm.id)}
                      className="mr-2"
                      autoComplete="off"
                    />
                    {itm.name}
                  </label>
                );
              })}
            </>
          ) : type == 'password' ? <>
            <div className="relative">
              <input
                type={eye ? 'text' : 'password'}
                name={name}
                className="relative  bg-white w-full rounded-lg h-10  overflow-hidden px-2 border border-[#00000036]"
                required={required}
                placeholder={placeholder}
                value={value || ""}
                maxLength={maxlength}
                minLength={minlength}
                min={min}
                disabled={disabled}
                autoComplete="off"
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                onKeyDown={onkeyDown}
              />

              <div className="absolute right-2 inset-y-0 flex items-center text-gray-500 text-sm">
                <i
                  className={eye ? "fa fa-eye" : "fa fa-eye-slash"}
                  onClick={() => setEye(!eye)}
                ></i>
              </div>
            </div>
          </> : (
            <input
              type={type}
              name={name}
              className={`${disabled ? "bg-gray-100" : "bg-white"} relative   w-full rounded-lg h-10  overflow-hidden px-2 border border-[#00000036]`}
              required={required}
              placeholder={placeholder}
              value={(type == 'datetime-local' ? datepipeModel.datetodatepicker(value) : value) || ''}
              maxLength={maxlength}
              minLength={minlength}
              min={min}
              max={max}
              disabled={disabled}
              autoComplete="off"
              onChange={(e) => {
                onChange(e.target.value);
              }}
              onKeyDown={onkeyDown}
            />
          )}

        {error ? (
          <>
            <div className="text-danger small mt-1">{error}</div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
