/* ============================================================================================================================================================

   CITTABASE SOLUTIONS - All Rights Reserved.

   ------------------------------------------------------------------------------------------------------------------------------------------------------------

   30-JUL-2023   Jagadeshwaran R      Initial Version             V1

   ** Database Connection Form Page **

============================================================================================================================================================*/

import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Row, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import FnBtnComponent from "../components/buttonComponent";
import FnTooltipComponent from "../components/tooltipComponent";
import FnFormComponent from "../components/formComponent";

const FnDatabaseConnectionForm = ({
  data,
  close,
  viewvalue,
  diverts,
  setdiverts,
  configData
}) => {
  let { authTokens, user } = useContext(AuthContext);
  const [adata, setAdata] = useState({
    created_by: user.user_id,
    last_updated_by: user.user_id,
  });
  const [error, setError] = useState({});
  const [action, setAction] = useState(false);
  let a = [data];
  const { id } = useParams();
  // const [helper, setHelper] = useState([]);
  const [connectionstatus, setConnectionStatus] = useState();

  const [getdbselect, setDBSelect] = useState()


  //formComp test

  const fieldData = [
    { id: 1, name: 'connection_name', label: 'Connection Name', placeholder: 'Enter Connection Name', type: 'text', maxlen: '500', ismandatory: 'Y' },
    { id: 2, name: 'database_name', label: 'Database Name', placeholder: 'Enter Database Name', type: 'text', maxlen: '500', ismandatory: 'Y' },
    { id: 3, name: 'database_type', label: 'Database Type', placeholder: 'Enter Database Type', type: 'select', maxlen: '500', ismandatory: 'Y' },
    { id: 4, name: 'user_name', label: 'User Name', placeholder: 'Enter User Name', type: 'text', maxlen: '100', ismandatory: 'Y' },
    { id: 5, name: 'password', label: 'Password', placeholder: 'Enter Password', type: 'password', maxlen: '200', ismandatory: 'N' },
    { id: 6, name: 'host_id', label: 'Host Id', placeholder: 'Enter Host Id', type: 'text', maxlen: '200', ismandatory: 'Y' },
    { id: 7, name: 'port', label: 'Port', placeholder: 'Enter Port', type: 'number', maxlen: '200', ismandatory: 'Y' },
    { id: 8, name: 'service_name_or_SID', label: 'Service Name/SID', placeholder: 'Enter Service Name/SID', type: 'text', maxlen: '200', ismandatory: 'N' },
  ]


  let selectedData = {
    "database_type": [
      {
        value: "MYSQL",
        label: "MYSQL"
      },
      {
        value: "Oracle",
        label: "Oracle"
      },
      {
        value: "Snowflake",
        label: "Snowflake"
      },
      // {
      //     value: "Mongo",
      //     label: "Mongo"
      // }
    ]
  }

  //  Function for updating perspective details
  const fnUpdateDetails = async () => {
    let res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/upd_rb_db_connect_table/${adata.id}/`,
      {
        method: "PUT",
        body: JSON.stringify(adata),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await res.json();
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        text: "Updated Successfully!",
      }).then(function () {
        close(false);
      });
    } else {
      setError(data);
    }
  };

  //  Function for inserting perspective details
  const fnTestConnection = async () => {
    let res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/rb_test_db_connection`,
      {
        method: "POST",
        body: JSON.stringify(adata),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await res.json();
    if (res.status === 200) {
      setError();
      // setAction();
      setConnectionStatus(data);
      // Swal.fire({
      //   icon: "success",
      //   text: "Created Successfully!",
      // }).then(function () {
      //   close(false);
      // });
    }
    else if (res.status === 500) {
      setConnectionStatus('error')
      setError();
    }
    else {
      setError(data);
    }
  }

  //  Function for inserting perspective details
  const fnSubmitDetails = async () => {
    let res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/ins_rb_db_connect_table`,
      {
        method: "POST",
        body: JSON.stringify(adata),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await res.json();
    if (res.status === 200) {
      setError();
      setAction();
      Swal.fire({
        icon: "success",
        text: "Created Successfully!",
      }).then(function () {
        close(false);
      });
    } else {
      setError(data);
    }
  };

  //  Used for rendering every time action done
  useEffect(() => {
    // const fnGetDetails = async () => {
    //   let res_helper = await fetch(
    //     `${process.env.REACT_APP_SERVER_URL}/api/get_helper`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + String(authTokens.access),
    //       },
    //     }
    //   );
    //   let helper_data = await res_helper.json();
    //   if (res_helper.status === 200) {
    //     if (helper_data) {
    //       setHelper(helper_data);
    //     }
    //   }
    // }
    // fnGetDetails();
    if (diverts === true) {
      const newdata = a.map(
        ({
          id,
          database_type,
          connection_name,
          database_name,
          host_id,
          port,
          user_name,
          password,
          service_name_or_SID,
          created_by,
          last_updated_by,
        }) => ({
          id,
          database_type,
          connection_name,
          database_name,
          host_id,
          port,
          user_name,
          password,
          service_name_or_SID,
          created_by,
          last_updated_by,
        })
      );
      setAdata(...newdata);
      setAction(true);
      setdiverts(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  if (adata.last_updated_by !== user.user_id) {
    setAdata({ ...adata, last_updated_by: user.user_id });
  }

  // Onchange function
  const fnInputHandler = (name, value) => {
    // setAdata({ ...adata, [e.target.name]: e.target.value });
    setAdata((prevState) => ({
      ...prevState,
      [name]: value
    }))

    const errors = { ...error }
    setError(errors)
  };

  // const help = helper.filter(user => String(user.page_no)
  //   .includes(String(id))).map((use) => use);

  
  return (
    <div className="sc_cl_div w-100 px-2">
      {/* <div>
        <Form>
          <Form.Group className="sc_cl_form_alignment">
            <div className="sc_cl_field_alignment" >
              <div className="gap-1">
                <Form.Label className="sc_cl_label" >Database Type <sup className="text-danger fs-6">*</sup>
                </Form.Label>
                <Form.Select
                  className="ms-2 w-25"
                  name={"database_type"}
                  value={getdbselect}
                  onChange={(e) => setDBSelect(e.target.value)}
                  disabled={false}
                  size="sm"
                >
                  <option hidden>---Select---</option>
                  <option value="MYSQL">MYSQL</option>
                  <option value="Oracle">Oracle</option>
                  <option value="Snowflake">Snowflake</option>
                </Form.Select>
              </div>
            </div>
          </Form.Group>
        </Form>
      </div> */}

      <Row className="mt-2 mt-lg-2 sc-cl-main-content">

        <FnFormComponent fields={fieldData} select={selectedData} formData={adata} onchange={fnInputHandler} onsubmit={fnSubmitDetails} errorcode={error} disablevalue={viewvalue} stylename={"sc_cl_input mb-2"} tooltipvalue={false} />

        <div>
          {connectionstatus &&
            (<label>status :
              <span className={`${connectionstatus && connectionstatus == "Connected" ? 'text-success' : 'text-danger'} small`}>
                {connectionstatus ? connectionstatus == "Connected" ? ' success' : ' failure' : ''}</span>
            </label>)
          }
        </div>
        <div className="align-items-center d-flex justify-content-start mt-2 sc_cl_div gap-2">
          <FnBtnComponent onClick={fnTestConnection} children={"Test Connection"} classname={"sc_cl_close_button"} />
          {viewvalue === false &&
            (action ? (
              <FnBtnComponent onClick={fnUpdateDetails} classname={"sc_cl_submit_button"} children={"Update"} />
            ) : (
              <FnBtnComponent onClick={fnSubmitDetails} children={"Submit"} classname={"sc_cl_submit_button"} />
            ))}
          <FnBtnComponent classname={"sc_cl_close_button"} children={"Back"} onClick={() => close(false)} />
        </div>
      </Row>

    </div>
  );
};

export default FnDatabaseConnectionForm;