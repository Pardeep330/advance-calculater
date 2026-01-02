import React, { useEffect, useState } from "react";
import { HiOutlineArrowDown, HiOutlineArrowUp } from "react-icons/hi";
import Pagination from "react-pagination-js";
import { useSelector } from "react-redux";
import environment from "../../environment";

const Table = ({
  className = "",
  data = [],
  theme = "table",
  ListHtml = (e) => {},
  rowClass = "",
  columns = [],
  topHead = [],
  count = 50,
  total = 0,
  page = 1,
  result = (e) => {},
  nodata = "Data Not Found",
  filters,
  Totalcal,
  valign = null,
  isOpen = false,
}) => {
  const [pageSize, setPageSize] = useState(count);
  columns = columns.filter((itm) => !itm?.hide);
  const user = useSelector((state) => state.user);
  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    result({ event: "count", value: parseInt(e.target.value) });
  };

  const handlePaginate = (e) => {
    result({ event: "page", value: e });
  };

  const view = (row) => {
    result({ event: "row", row: row });
  };

  const headclick = (itm) => {
    if (itm.sort) {
      result({ event: "sort", value: itm.key });
    }
  };

  // Generate options array based on the total value
  const generateOptions = () => {
    const options = [];
    for (let i = 10; i <= total; i += 10) {
      options.push(i);
    }
    return options;
  };

  const addHight = () => {
    let value = false;
    const path = window.location.pathname;
    const length = data.length;
    if (
      isOpen &&
      (path === "/invoice" || path === "/job/business") &&
      length <= 3
    ) {
      value = true;
    }
    return value;
  };

  const bgColour = (data) => {
    let value = false;
    const path = window.location.pathname;
    if (
      (path === "/customers" || path == "/contractor") &&
      data?.loggedInOnce == true
    ) {
      value = true;
    }
    return value;
  };

  const bgColourwhite = (data) => {
    let value = false;
    const path = window.location.pathname;
    if (
      (path === "/customers" || path == "/contractor") &&
      data?.loggedInOnce == false
    ) {
      value = true;
    }
    return value;
  };

  return (
    <>
      <div className={`${className}`}>
        {total ? (
          <>
            {/* Table view */}
            {theme === "table" && (
              <div className="bg-white rounded-[20px] pb-8">
                <div
                  className={`${
                    addHight() ? "h-[600px]" : ""
                  } relative rounded-[20px] overflow-x-auto !outline-0 pb-3`}
                >
                  <table className="w-[100%] !outline-0 text-sm text-left">
                    <thead className="text-xs bg-[#E4F3F7] capitalize  ">
                      {/* Top header */}
                      {topHead?.length ? (
                        <tr className="bg-gray-200 border-b border-black">
                          {topHead.map((itm, i) => (
                            <th
                              scope="col"
                              className={`px-2 py-3 font-[400] text-[#000] ${
                                topHead.length - 1 === i
                                  ? ""
                                  : "border-r border-black"
                              }`}
                              colSpan={itm?.colSpan || 0}
                              key={i}
                            >
                              {itm.name}
                            </th>
                          ))}
                        </tr>
                      ) : null}
                      {/* Main header */}
                      <tr>
                        {columns.map((itm) => (
                          <th
                            scope="col"
                            className={`px-2 py-3 font-[400] text-[#000]  ${
                              itm.sort ? "cursor-pointer" : ""
                            } ${itm?.className}`}
                            key={itm.key}
                          >
                            <span className="inline-flex items-center gap-1">
                              <span> {itm.name} </span>
                              {itm.sort ? (
                                <>
                                  <span
                                    className=""
                                    onClick={() => headclick(itm)}
                                  >
                                    <HiOutlineArrowDown className=" inline text-sm" />
                                  </span>
                                </>
                              ) : null}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Table data */}
                      {/* {data.map((itm) => (
                      <tr
                        onClick={() => view(itm)}
                        className={` ${
                          itm.status === "pending"
                            ? "text-black cursor-pointer border-b-[3px] border-[#fff] bg-[#95df9524]"
                            : itm?.status === "in-progress" &&
                              itm?.completionRequest
                            ? "text-black cursor-pointer border-b-[3px] border-[#fff] bg-[#ff00001a]"
                            : itm?.status === "in-progress"
                            ? "text-black cursor-pointer border-b-[3px] border-[#fff]  bg-[#d6fb7f24]"
                            : itm?.status === "completed"
                            ? "text-black bg-[#7cb9f317] border-b-[3px] border-[#fff]"
                            : "bg-white border-b   hover:bg-gray-50 "
                        }`}
                        // className="bg-white border-b   hover:bg-gray-50 "
                        key={itm.id}
                        valign={`${valign ? "top" : ""}`}
                      >
                        {columns.map((citm) => (
                          <td
                            className={`px-2 py-4 ${citm.className}`}
                            key={citm.key}
                          >
                            {citm.render(itm) || "--"}
                          </td>
                        ))}
                      </tr>
                    ))} */}
                      {data.map((itm) => {
                        const allIds =
                          itm?.contractorJobStatus?.map(
                            (item) => item?.contractor_id
                          ) || [];

                        const rowClass =
                          itm.status === "pending"
                            ? "text-black cursor-pointer border-[#fff] bg-[#95df9524] border-t-[5px]"
                            : itm?.status === "in-progress" &&
                              itm?.completionRequest &&
                              (user?.role?._id == environment.contractorRoleId
                                ? allIds?.includes(user?.id || user?._id)
                                : true)
                            ? "text-black cursor-pointer border-[#fff] bg-[#ff00001a] border-t-[5px]"
                            : itm?.status === "in-progress"
                            ? "text-black cursor-pointer border-[#fff] bg-[#d6fb7f24] border-t-[5px]"
                            : itm?.status === "completed"
                            ? "text-black bg-[#7cb9f317] border-[#fff] border-t-[5px]"
                            : "";

                        return (
                          <tr
                            onClick={() => view(itm)}
                            className={
                              window.location.pathname === "/job/business" ||
                              window.location.pathname === "/job"
                                ? "rowforjob"
                                : bgColour(itm)
                                ? "text-black cursor-pointer border-[#fff] !bg-[#d6fb7f24] border-t-[5px]"
                                : bgColourwhite(itm)
                                ? "text-black cursor-pointer border-[#fff] !bg-white border-t-[5px]"
                                : ""
                            }
                            key={itm.id}
                            valign={valign ? "top" : ""}
                          >
                            {columns.map((citm) => (
                              <td
                                className={`px-2 py-4 column-set ${rowClass} ${citm.className}`}
                                key={citm.key}
                              >
                                {citm.render(itm) || "--"}
                              </td>
                            ))}
                          </tr>
                        );
                      })}

                      {Totalcal?.isTotalRow ? (
                        <tr className="border-b border-t-[2px] ">
                          <td className="px-2 py-4 font-[600] text-black">
                            Total
                          </td>
                          <td className="px-2 py-4 "></td>
                          <td className="px-2 py-4"></td>
                          <td className="px-2 py-4 font-[600] text-black">
                            {" "}
                            £
                            {parseFloat(
                              Totalcal?.total_bonus_and_labour_amt || 0
                            ).toFixed(2)}
                          </td>
                          <td className="px-2 py-4 font-[600] text-black">
                            {" "}
                            £
                            {parseFloat(
                              Totalcal?.total_bonus_and_labour_cis || 0
                            ).toFixed(2)}
                          </td>
                          <td className="px-2 py-4 font-[600] text-black">
                            {" "}
                            £
                            {parseFloat(
                              Totalcal?.total_non_cis_amt || 0
                            ).toFixed(2)}
                          </td>
                          <td className="px-2 py-4 font-[600] text-black">
                            {" "}
                            £
                            {parseFloat(
                              Totalcal?.total_non_cis_after_deduction || 0
                            ).toFixed(2)}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* List view */}
            {theme === "list" && (
              <div className={`rowClass ${rowClass}`}>
                {data.map((itm, index) => (
                  <ListHtml key={index} row={itm} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {count < total && (
              <div className="paginationWrapper flex-wrap gap-3 flex items-center justify-between mt-15 px-4">
                <p className="text-sm text-gray-500">
                  Show{" "}
                  <select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="border rounded-md px-2 py-1"
                  >
                    {/* Dynamically generated options */}
                    {generateOptions().map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>{" "}
                  from {total} data
                </p>
                <Pagination
                  currentPage={page}
                  totalSize={total}
                  sizePerPage={pageSize}
                  changeCurrentPage={handlePaginate}
                />
              </div>
            )}
          </>
        ) : (
          // <div className="p-4 text-center">{nodata}</div>
          <div className="rounded-[20px] bg-white pb-8">
            <div
              className={`${
                addHight() ? "" : ""
              }  relative overflow-x-auto !outline-0 pb-3`}
            >
              <table className="w-[100%] !outline-0 text-sm text-left">
                <thead className="text-xs bg-[#E4F3F7] capitalize  ">
                  {/* Top header */}
                  {topHead?.length ? (
                    <tr className="">
                      {topHead.map((itm, i) => (
                        <th
                          scope="col"
                          className={`px-2 py-3 font-[400] text-[#000] ${
                            topHead.length - 1 === i ? "" : ""
                          }`}
                          colSpan={itm?.colSpan || 0}
                          key={i}
                        >
                          {itm.name}
                        </th>
                      ))}
                    </tr>
                  ) : null}
                  {/* Main header */}
                  <tr>
                    {columns.map((itm) => (
                      <th
                        scope="col"
                        className={`px-2 py-3 font-[400] text-[#000]   ${
                          itm.sort ? "cursor-pointer" : ""
                        } ${itm?.className}`}
                        onClick={() => headclick(itm)}
                        key={itm.key}
                      >
                        <span className="inline-flex items-center gap-1">
                          <span> {itm.name} </span>
                          {itm.sort ? (
                            <>
                              <span className="">
                                <HiOutlineArrowDown className=" inline text-sm" />
                              </span>
                            </>
                          ) : null}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="14" className="px-2 py-4">
                      <div className="text-center">
                        <img
                          src="/assets/img/no-data.png"
                          className="w-[150px] mx-auto "
                        />
                        {nodata}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
