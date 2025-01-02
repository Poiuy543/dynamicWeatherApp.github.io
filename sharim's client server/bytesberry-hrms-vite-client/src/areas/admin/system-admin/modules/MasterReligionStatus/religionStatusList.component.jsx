/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

import { FiEdit2 } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import { MdAdd } from "react-icons/md";

import axios from "../../../../../api/axios";
import { MASTER_RELIGION_STATUS_CONFIG_URL } from "../../../../../api/api_routing_urls";

import HeadingAndButton from "../../../../../reusable-components/HeadingAndButton";
import DeleteModal from "../../../../../reusable-components/modals/DeleteModal";

import showToast from "../../../../../utilities/notification/NotificationModal";

const ReligionStatusList = ({
  setCurrentPage,
  currentPage,
  getReligionStatusList,
  religionStatusList,
  setEditReligionStatusDetails,
}) => {
  
  const [showDelete, setShowDelete] = useState(false);
  const [religionStatusDeleteId, setReligionStatusDeleteId] = useState(null);

  const onClickEdit = (religionStatusObj) => {
    console.log("Edit Clicked: ", religionStatusObj); // Debug to verify the object
    setEditReligionStatusDetails(religionStatusObj); // Sets the selected object for editing
    setCurrentPage(!currentPage); // Navigates to the edit page/form
  };

  const onClickDelete = async () => {
    try {
      let response = "";
      if (religionStatusDeleteId) {
        console.log("Deleting Religion Status with ID:", religionStatusDeleteId);//...

        response = await axios.post(
          `${MASTER_RELIGION_STATUS_CONFIG_URL}/delete`,
          {
            religion_id: religionStatusDeleteId,
          }
        );
        setShowDelete(false);
      }

      if (response.status === 200) {
        showToast(
          "Religion Status details have been deleted successfully.",
          "success"
        );
        getReligionStatusList();
      } else {
        showToast("Failed to delete religion status details.", "error");
      }
    } catch (error) {
      console.log("Delete Religion Status Error", error);
      showToast("An error occurred while deleting the religion status.", "error");
    } finally {
      setEditReligionStatusDetails(null);
    }
  };
  
console.log("Religion Status List: ", religionStatusList);//Arjun's

  const handleSave = async (updatedName, selectedId) => {
    try {
      const response = await axios.post(
        `${MASTER_RELIGION_STATUS_CONFIG_URL}/update`,
        {
          religion_name: updatedName,
          religion_id: selectedId,
        }
      );

      if (response.status === 200) {
        showToast("Religion status updated successfully!", "success");
        await getReligionStatusList(); // Refresh the list
        setCurrentPage(!currentPage); // Navigate back to list
      } else {
        showToast(response.data.errMsg || "Update failed!", "error");
      }
    } catch (error) {
      console.error("Error updating religion status:", error);
      showToast("Server error. Please try again later.", "error");
    }
  };

  return (
    <section className="py-8 bg-white min-h-screen">
      <div>
        <HeadingAndButton
          title="Religion Status Configuration"
          buttonText="  Add Religion Status"
          buttonIcon={MdAdd}
          onButtonClick={() => {
            setCurrentPage(!currentPage);
            setEditReligionStatusDetails({});
          }}
        />

        <div className="mt-10">
          <table className="w-full border">
            <thead>
              <tr className="border-b">
                <th className="pl-4 py-2 w-[10%] text-start">Sl. No.</th>
                <th className="w-[80%] text-start">Religion Status Name</th>
                <th className="w-[10%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {religionStatusList?.length > 0 ? (
                <>
                  {religionStatusList?.map((mapObj, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-slate-50" : "bg-slate-100"
                      }`}
                    >
                      <td className="pl-4 py-4">{index + 1}</td>

                      <td className="pl-4 py-4">{mapObj?.religion_name}</td>   {/*religion_status_namae */}

                      <td className="flex gap-x-4 items-center justify-center py-4">
                        <FiEdit2
                          color="green"
                          size={14}
                          onClick={() => onClickEdit(mapObj)}
                          className="cursor-pointer"
                        />
                        <BsTrash3
                          color="red"
                          size={16}
                          onClick={() => {
                            setReligionStatusDeleteId(
                              mapObj?.religion_status_id || null
                            );
                            setShowDelete(true);
                          }}
                          className="cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="text-center text-sm font-semibold">
                  <td colSpan={3} className="py-4">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        open={showDelete}
        setOpen={setShowDelete}
        message={"This entry will be deleted permanently. Are you sure?"}
        onDelete={onClickDelete}
      />
    </section>
  );
};

export default ReligionStatusList;
