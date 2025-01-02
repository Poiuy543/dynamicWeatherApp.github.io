import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../reusable-components/inputs/InputTextBox/Input";
import Dropdown from "../../../reusable-components/Dropdowns/Dropdown";
import axios from "../../../api/axios";
import { MASTER_RELIGION_STATUS_CONFIG_URL } from "../../../api/api_routing_urls";

const ConfigureReligionStatus = () => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [religionStatusOptions, setReligionStatusOptions] = useState([]);

  // Fetch Marital Status Options
  const getReligionStatusOptions = async () => {
    try {
      const response = await axios.get(MASTER_RELIGION_STATUS_CONFIG_URL);
      console.log("API Response:", response.data);
      if (
        response.status === 200 &&
        Array.isArray(response.data?.mstReligionStatusList)
      ) {
        const options = response.data.mstReligionStatusList.map((status) => ({
          label: status.religion_name,
          value: status.religion_id,
        }));
        setReligionStatusOptions(options);
      } else {
        console.error("mstReligionStatusList is missing or not an array:", response.data);
        setReligionStatusOptions([]); // Set empty array if no data
      }
    } catch (error) {
      console.error("Error fetching marital status data:", error);
      setReligionStatusOptions([]); // Set empty array in case of error
    }
  };

  useEffect(() => {
    getReligionStatusOptions();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      religion_status: null,
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", {
      name: data.name,
      religion_status: selectedStatus?.value || null,
    });

    reset({
      name: "",
      religion_status: null,
    });
    setSelectedStatus(null);
  };

  return (
    <section className="mt-20">
      <div className="text-lg md:text-xl lg:text-3xl text-center font-bold">
        Configure Religion Status
      </div>

      <div className="mt-10 w-[60vw] mx-auto bg-yellow-50 pt-5 pb-1 px-4 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
            {/* Employee Name Input */}
            <Input
              defaultName="name"
              register={register}
              name="Employee Name"
              required={true}
              pattern={null}
              errors={errors}
              placeholder="Enter employee name"
              setError={setError}
              clearError={clearErrors}
              autoComplete="off"
              type="text"
              classes={`px-3 py-2 text-sm w-full bg-white text-black`}
              onChangeInput={null}
              defaultValue=""
              setValue={setValue}
            />

            {/* Marital Status Dropdown */}
            <Dropdown
              defaultName="religion_status"
              register={register}
              labelname="Religion Status"
              required={true}
              pattern={false}
              errors={errors}
              classes={`rounded-lg text-sm w-full z-40`}
              setError={setError}
              clearError={clearErrors}
              onChangeInput={null}
              control={control}
              data={religionStatusOptions} // Dynamic data
              defaultValue={null}
              setValue={setValue}
              setSelected={setSelectedStatus}
              selected={selectedStatus}
              maxMenuHeight={120}
            />
          </div>

          <div className="mt-10 mb-5 flex justify-center gap-5">
            <button
              type="submit"
              className="bg-primary text-white py-2 px-5 rounded-md text-sm font-medium hover:bg-primary-dark"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="py-2 px-5 border rounded-md text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ConfigureReligionStatus;
