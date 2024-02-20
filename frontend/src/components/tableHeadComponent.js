/* ============================================================================================================================================================

   CITTABASE SOLUTIONS - All Rights Reserved.

   ------------------------------------------------------------------------------------------------------------------------------------------------------------

   30-Aug-2022   Jagadeshwaran R      Initial Version             V1

   ** This Page is to define table head component  **

============================================================================================================================================================*/

import { useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const FnTableHead = ({ columns, fnHandlesorting, action }) => {
  const [order, setOrder] = useState("asc");

  const fnHandleSortingChange = (col, index) => {
    var element = document.getElementsByClassName("sc_cl_sortup");
    for (var i = 0; i < element.length; i++) {
      document
        .getElementsByClassName("sc_cl_sortup")
      [i].classList.remove("text-primary");
      document
        .getElementsByClassName("sc_cl_sortdown")
      [i].classList.remove("text-primary");
    }

    if (order === "asc") {
      fnHandlesorting(col, order);
      document
        .getElementById(col)
        .getElementsByClassName("sc_cl_sortdown")[0]
        .classList.remove("text-primary");
      document
        .getElementById(col)
        .getElementsByClassName("sc_cl_sortup")[0]
        .classList.add("text-primary");
      setOrder("desc");
    }
    if (order === "desc") {
      fnHandlesorting(col, order);
      document
        .getElementById(col)
        .getElementsByClassName("sc_cl_sortdown")[0]
        .classList.add("text-primary");
      document
        .getElementById(col)
        .getElementsByClassName("sc_cl_sortup")[0]
        .classList.remove("text-primary");
      setOrder("asc");
    }
  };

  return (
    <thead className="card-header text-left custom-cursor-pointer">
      {action ? (
        <tr>
          {columns &&
            columns.map((data, index) => (
              <th
                key={data}
                className="sc_cl_th "
                id={data}
                onClick={() => fnHandleSortingChange(data, index)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column f-left">
                    {data.replaceAll("_", " ")}
                  </div>

                  <div className="d-flex f-right flex-column">
                    <MdKeyboardArrowUp
                      id="sc_id_sortup"
                      className="sc_cl_sortup"
                    />
                    <MdKeyboardArrowDown
                      id="sc_id_sortdown"
                      className="sc_cl_sortdown"
                    />
                  </div>
                </div>
              </th>
            ))}
          <th className="sc_cl_th text-center">
            <div className="d-flex align-items-center">
              <div className="d-flex col-11 flex-column text-center">
                Action
              </div>

              <div className="d-flex f-right flex-column">
                <MdKeyboardArrowUp className="sc_cl_sortup sc_cl_visabilitynone" />
                <MdKeyboardArrowDown className="sc_cl_sortdown sc_cl_visabilitynone" />
              </div>
            </div>
          </th>
        </tr>
      ) : (
        <tr>
          {columns &&
            columns.map((data, index) => (
              <th
                key={data}
                className="sc_cl_th"
                id={data}
                onClick={() => fnHandleSortingChange(data, index)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column f-left">
                    {data.replaceAll("_", " ")}{" "}
                  </div>

                  <div className="d-flex f-right flex-column">
                    <MdKeyboardArrowUp
                      id="sc_id_sortup"
                      className="sc_cl_sortup"
                    // sc_cl_visabilitynone
                    />
                    <MdKeyboardArrowDown
                      id="sc_id_sortdown"
                      className="sc_cl_sortdown"
                    // sc_cl_visabilitynone
                    />
                  </div>
                </div>
              </th>
            ))}
        </tr>
      )}
    </thead>
  );
};

export default FnTableHead;
