/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import axios from "../../../../../api/axios";
import { MASTER_RELIGION_STATUS_CONFIG_URL } from "../../../../../api/api_routing_urls";
import HeadingAndButton from "../../../../../reusable-components/HeadingAndButton";
import Input from "../../../../../reusable-components/inputs/InputTextBox/Input";
import Spinner from "../../../../../reusable-components/spinner/spinner.component";
import showToast from "../../../../../utilities/notification/NotificationModal";

const AddReligionStatusForm = ({
  setCurrentPage,
  currentPage,
  getReligionStatusList,
  editReligionStatusDetails,
}) => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const isEdit = Object.keys(editReligionStatusDetails)?.length > 0;

  const defaultValues = {
    religion_id: isEdit ? editReligionStatusDetails?.religion_id : "",
    religion_name: isEdit ? editReligionStatusDetails?.religion_name : "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    setIsFormSubmitting(true);
    const sendDataObj = {
      religion_name: data.religion_name.trim(),
    };
  
    if (isEdit) {
      sendDataObj.religion_id = defaultValues.religion_id;
    }
  
    try {
      const url = isEdit 
        ? `${MASTER_RELIGION_STATUS_CONFIG_URL}/update` 
        : MASTER_RELIGION_STATUS_CONFIG_URL;
  
      const response = await axios.post(url, sendDataObj);
  
      console.log("Server Response Data:", response.data); // Log response data
  
      if (
        response.status === 200 &&
        (isEdit
          ? response.data?.updateMstReligionStatusDetails === "true"
          : response.data?.saveMstReligionStatusDetails === "true")
      ) {
        showToast(
          isEdit
            ? "Religion Status details updated successfully."
            : "Religion Status details saved successfully.",
          "success"
        );
        setCurrentPage(!currentPage);
        getReligionStatusList();
        reset();
      } else {
        showToast(response.data?.errMsg || "An error occurred. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error occurred during submission:", error);
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
      }
      showToast("An error occurred. Please contact the administrator.", "error");
    } finally {
      setIsFormSubmitting(false);
    }
  };
  
  

  return (
    <section className="bg-white min-h-screen py-8">
      <HeadingAndButton
        title="Add Religion Status Details"
        buttonText="Go Back"
        buttonIcon={IoChevronBackCircleOutline}
        onButtonClick={() => setCurrentPage(!currentPage)}
      />

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1">
            <Input
              defaultName="religion_status_name"
              register={register}
              name="religion_status_name" // Ensure it matches your form's register name
              required={true} // Marks the field as required
              errors={errors} // For displaying validation errors
              placeholder="Enter religion status name"
              autoComplete="off" // Prevents browser autofill
              type="text"
              classes={`px-3 py-2 text-sm w-full`} // Input styling
              defaultValue={defaultValues.religion_name} // Pre-fill the input with existing data
              setValue={setValue} // Function to update the value if needed
            />
            {errors.religion_name && (
              <p className="text-red-500 text-sm">{errors.religion_name.message}</p>
            )}
          </div>

          <div className="mt-10 mb-5 w-full grid grid-cols-3">
            {!isFormSubmitting ? (
              <button
                type="submit"
                className="col-start-2 flex justify-self-center items-center bg-primary w-fit text-white py-2 px-5 rounded cursor-pointer"
              >
                <span className="text-sm font-medium">{!isEdit ? "Submit" : "Update"}</span>
              </button>
            ) : (
              <div className="col-start-2 flex justify-self-center items-center bg-primary w-fit text-white py-2 px-5 rounded cursor-pointer">
                <div className="flex gap-x-1 items-center">
                  <p className="text-sm font-medium">{!isEdit ? "Submitting" : "Updating"}</p>
                  <Spinner />
                </div>
              </div>
            )}

            <div
              onClick={() => setCurrentPage(!currentPage)}
              className="justify-self-end py-2 px-5 border rounded cursor-pointer text-sm font-medium"
            >
              Cancel
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddReligionStatusForm;
