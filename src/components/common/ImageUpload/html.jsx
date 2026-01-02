import React, { useState } from "react";
import methodModel from "../../../methods/methods";
import { FiPlus } from "react-icons/fi";
import ImageLarge from "../../Imagelarge";

const Html = ({
  inputElement,
  uploadImage,
  img,
  remove,
  loader,
  model,
  multiple,
  required,
  accept,
  err,
  type,
  label = "",
  isClear
}) => {
  const [isOpenimage, setIsOpenimage] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState()
  const handleClick = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setIsOpenimage(true);
  };
  return (
    <>
      <label
        className={`block cursor-pointer text-gray-500 bg-white border flex items-center justify-center min-h-10 border-dashed border-[#00358575] focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2 text-center ${img && !multiple ? "d-none" : ""
          }`}
      >
        <input
          type="file"
          className="hidden"
          ref={inputElement}
          accept={accept}
          multiple={multiple ? true : false}
          disabled={loader}
          onChange={(e) => {
            uploadImage(e);
          }}
        />
        <div className="flex  items-center justify-center">
          <FiPlus className="min-w-5 text-lg text-[#1E5DBC] me-2" />
          <span>{label || "Please upload images"}</span>
        </div>
      </label>

      {loader ? (
        <div className="text-success text-center mt-2">
          Uploading... <i className="fa fa-spinner fa-spin"></i>
        </div>
      ) : (
        <></>
      )}

      {type == 'img' ? <>
        {multiple ? (
          <>
            <div className="imagesRow flex gap-3 flex-wrap">
              {img &&
                img?.map((itm, i) => {
                  return (
                    <div className="imagethumbWrapper">
                      <img
                        onClick={() =>
                          handleClick(img, i)
                        }
                        src={methodModel.noImg(itm, 'img')}
                        className="thumbnail cursor-pointer w-[100px] h-[100px] object-contain p-2 shadow-md bg-white"
                      />
                      {isClear ? <i
                        className="fa fa-times"
                        title="Remove"
                        onClick={(e) => remove(i)}
                      ></i> : ""}
                    </div>
                  );
                })}
            </div>
          </>
        ) : (
          <>
            {img ? (
              <div className="imagethumbWrapper">
                <img onClick={() =>
                  handleClick([img], "0")
                } src={methodModel.noImg(img, 'img')} className="thumbnail cursor-pointer  w-[100px] h-[100px] object-cover " />
                {isClear ? <i
                  className="fa fa-times"
                  title="Remove"
                  onClick={(e) => remove()}
                ></i> : ""}
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </> : <>
        {img ? <>
          {multiple ? <>
            <div className="flex gap-4 flex-wrap">
              {img?.map((itm, i) => {
                return <div className="imagethumbWrapper mt-5 bg-white shadow-md p-1 rounded-md">
                  <a className="flex items-enter justify-center" target="_new" href={methodModel.document(itm, model)}>
                    <span class="material-symbols-outlined text-[30px]">draft</span>
                  </a>
                  <i
                    className="fa fa-times"
                    title="Remove"
                    onClick={(e) => remove(i)}
                  ></i>
                </div>
              })}
            </div>
          </> : <>
            <div className="imagethumbWrapper">
              <a className="" target="_new" href={methodModel.document(img, model)}>
                <span class="material-symbols-outlined text-[50px]">draft</span>
              </a>
              <i
                className="fa fa-times"
                title="Remove"
                onClick={(e) => remove()}
              ></i>
            </div>

          </>}

        </> : <></>}

      </>}



      {required && !img ? (
        <div className="text-danger">{err ? err : "Image is Required"}</div>
      ) : (
        <></>
      )}
      <ImageLarge
        isOpen={isOpenimage}
        setIsOpen={setIsOpenimage}
        images={selectedImage}
        name={[]}
        role={[]}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </>
  );
};
export default Html;
