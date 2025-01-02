/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import axios from "../../../../../api/axios";
import { MASTER_RELIGION_STATUS_CONFIG_URL } from "../../../../../api/api_routing_urls";

import showToast from "../../../../../utilities/notification/NotificationModal";

import Dashboard from "../../../common/dashboard-components/dashboard.component";

import ReligionStatusList from "./religionStatusList.component";
import AddReligionStatusForm from "./addReligionStatusForm.component";

const ReligionStatusConfig = () => {
  const [currentPage, setCurrentPage] = useState(true);
  const [editReligionStatusDetails, setEditReligionStatusDetails] = useState({});
  const [religionStatusList, setReligionStatusList] = useState([]);

  const getReligionStatusList = async () => {
    try {
      const response = await axios.get(MASTER_RELIGION_STATUS_CONFIG_URL);
      console.log("fetched religion status list:", response.data);
      if (response.status === 200) {
        setReligionStatusList(response?.data?.mstReligionStatusList || []);
      } else {
        showToast("No religion status list found in the system.", "error");
      }
    } catch (error) {
      console.error("getReligionStatusList", error);
      if(!error?.response){
        showToast("No Server Response");
      }else if (error.response.status===422){
        showToast("Some of the inputs were not provided.", "error");
      }else{
        showToast("Whoops!!! This doesn't feel right. There might be an issue. Please contact the administrator", "error");
    }
  }
};

  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      getReligionStatusList();
      setEditReligionStatusDetails({});
  }
  return()=>{
    isMounted=false;
  };
}, []);

  return (
    <section>
      <Dashboard sidebarType="System Admin">
        {currentPage ? (
          <ReligionStatusList
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            getReligionStatusList={getReligionStatusList}
            religionStatusList={religionStatusList}
            setEditReligionStatusDetails={setEditReligionStatusDetails}
          />
        ) : (
          <AddReligionStatusForm
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            getReligionStatusList={getReligionStatusList}
            editReligionStatusDetails={editReligionStatusDetails}
          />
        )}
      </Dashboard>
    </section>
  );
};

export default ReligionStatusConfig;
