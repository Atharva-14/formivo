import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Dropdown from "./Dropdown";
import { Switch } from "./ui/switch";
import { FormField } from "@/types/Form";
import { Options as FormOptions } from "@/types/Form";

interface LocalOptions {
  label: string;
  value: React.ReactNode;
}

const options: LocalOptions[] = [
  {
    label: "Short answer",
    value: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 7.5H10.8333"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 12.5H17.5"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Long answer",
    value: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 5H10.8333"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 10H17.5"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 15H17.5"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Single select",
    value: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1792_1208)">
          <path
            d="M10.0001 18.3334C14.6025 18.3334 18.3334 14.6025 18.3334 10.0001C18.3334 5.39771 14.6025 1.66675 10.0001 1.66675C5.39771 1.66675 1.66675 5.39771 1.66675 10.0001C1.66675 14.6025 5.39771 18.3334 10.0001 18.3334Z"
            stroke="#0D0D0D"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M10.0001 13.3334C11.841 13.3334 13.3334 11.841 13.3334 10.0001C13.3334 8.15913 11.841 6.66675 10.0001 6.66675C8.15913 6.66675 6.66675 8.15913 6.66675 10.0001C6.66675 11.841 8.15913 13.3334 10.0001 13.3334Z"
            fill="#0D0D0D"
            stroke="#0D0D0D"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1792_1208">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    label: "Multiple select",
    value: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48"
        height="48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "URL",
    value: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.91675 12.0835L12.0834 7.91675"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14.0386 12.1746L16.2132 10C17.9289 8.28427 17.9289 5.50252 16.2132 3.78679C14.4975 2.07107 11.7157 2.07107 10 3.78679L7.82537 5.96142M12.1746 14.0386L10 16.2132C8.28427 17.929 5.50253 17.929 3.7868 16.2132C2.07107 14.4975 2.07107 11.7157 3.7868 10L5.96142 7.82538"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Number",
    value: (
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.97298 2.5L5.63965 17.5"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M17.7229 13.3334H2.7229"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18.9729 5.83337H3.9729"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M15.6397 2.5L12.3064 17.5"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Date",
    value: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 1.66675V3.33341M5 1.66675V3.33341"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99633 10.8333H10.0038M9.99633 14.1666H10.0038M13.3259 10.8333H13.3334M6.66675 10.8333H6.67422M6.66675 14.1666H6.67422"
          stroke="#0D0D0D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.91675 6.66675H17.0834"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.08325 10.2027C2.08325 6.57162 2.08325 4.75607 3.12669 3.62803C4.17012 2.5 5.84949 2.5 9.20825 2.5H10.7916C14.1503 2.5 15.8298 2.5 16.8732 3.62803C17.9166 4.75607 17.9166 6.57162 17.9166 10.2027V10.6307C17.9166 14.2618 17.9166 16.0773 16.8732 17.2053C15.8298 18.3333 14.1503 18.3333 10.7916 18.3333H9.20825C5.84949 18.3333 4.17012 18.3333 3.12669 17.2053C2.08325 16.0773 2.08325 14.2618 2.08325 10.6307V10.2027Z"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 6.66675H17.5"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Time",
    value: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48"
        height="48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="6" x2="12" y2="12" />
        <line x1="12" y1="12" x2="15" y2="15" />
      </svg>
    ),
  },
];

export interface DynamicInputFieldProps {
  id: FormField["questionId"];
  handleDelete: (id: FormField["questionId"]) => void;
  inputData: FormField;
}

const DynamicInputField = forwardRef(
  ({ id, handleDelete, inputData }: DynamicInputFieldProps, ref) => {
    const [selectedOption, setSelectedOption] = useState<LocalOptions>(() => ({
      ...(options.find((x) => x.label === inputData?.fieldType) || {
        label: "Short answer",
        value: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 7.5H10.8333"
              stroke="#0D0D0D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.5 12.5H17.5"
              stroke="#0D0D0D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      }),
    }));

    const [formData, setFormData] = useState<FormField>({
      questionId: id,
      fieldType: "",
      title: "",
      helpText: "",
      required: false,
      options: [],
    });

    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleCheckChange = () => {
      setFormData((prev) => ({
        ...prev,
        required: !prev.required,
      }));
    };

    const [radioOptions, setRadioOptions] = useState<Array<FormOptions>>([
      {
        id: crypto.randomUUID(),
        value: "Option 1",
      } as FormOptions,
      {
        id: crypto.randomUUID(),
        value: "Option 2",
      } as FormOptions,
    ]);

    const handleSelect = (selected: LocalOptions) => {
      setSelectedOption(selected);
    };

    const handleRadioOptionChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      id: string
    ) => {
      const { value } = e.target;

      setRadioOptions((prevOptions) => {
        return prevOptions.map((option) =>
          option.id === id ? { ...option, value } : option
        ) as FormOptions[];
      });

      // Ensure formData is updated with latest radioOptions
      setFormData((prevItems) => ({
        ...prevItems,
        options: radioOptions.map((option) =>
          option.id === id ? { ...option, value } : option
        ) as FormOptions[],
      }));
    };

    const handleAddRadioOption = () => {
      const newID = crypto.randomUUID();
      const updatedOptions: FormOptions[] = [
        ...radioOptions,
        { id: newID, value: "Option" } as FormOptions,
      ];

      setRadioOptions(updatedOptions);
      setFormData((prevItems) => ({ ...prevItems, options: updatedOptions }));
    };

    const handleDeleteRadioOption = (id: string) => {
      const updatedOptions = radioOptions.filter((option) => option.id !== id);

      setRadioOptions(updatedOptions);
      setFormData((prevItems) => ({ ...prevItems, options: updatedOptions }));
    };

    const handleSubmit = () => {
      return {
        ...formData,
        fieldType: selectedOption.label,
        options: ["Single select", "Multiple select"].includes(
          selectedOption.label
        )
          ? radioOptions
          : formData.options,
      };
    };

    useImperativeHandle(ref, () => ({
      getData: () => handleSubmit(),
    }));

    useEffect(() => {
      if (inputData) {
        setFormData(inputData);

        if (
          inputData.fieldType === "Single select" ||
          inputData.fieldType === "Multiple select"
        ) {
          setRadioOptions(inputData.options || []);
        }
      }
    }, [inputData]);

    DynamicInputField.displayName = "DynamicInputField";

    return (
      <div className="w-full  p-4 border rounded-3xl flex flex-col gap-2 border-[#E1E4E8] bg-white">
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-row gap-2 ">
            <div className="w-full flex flex-col gap-1">
              <input
                type="text"
                id="title"
                name="title"
                onChange={(e) => handleChange(e)}
                value={formData.title}
                placeholder="Write a question"
                className="font-inter text-sm font-semibold leading-5 text-left focus:outline-none text-gray-1000 w-full"
              />
              <input
                type="text"
                id="helpText"
                name="helpText"
                value={formData.helpText}
                onChange={(e) => handleChange(e)}
                placeholder="Write a help text or caption (leave empty if not needed)."
                className="font-inter text-xs font-normal leading-4 text-left focus:outline-none text-gray-1000 w-full"
              />
            </div>

            <div className="flex items-center">
              <Dropdown
                options={options}
                onSelect={handleSelect}
                selOpt={selectedOption || options[0]}
              />
            </div>

            <button className="text-gray-500 cursor-move md:ml-2">
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.375 3.23828H4.38029M4.375 8.23828H4.38029M4.375 13.2383H4.38029M11.0364 3.23828H11.0417M11.0364 8.23828H11.0417M11.0364 13.2383H11.0417"
                  stroke="rgba(107, 114, 128, var(--tw-text-opacity))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="w-full flex flex-col gap-2">
            {selectedOption?.label === "Short answer" && (
              <input
                id="shortAnswer"
                name="shortAnswer"
                onChange={(e) => handleChange(e)}
                type="text"
                readOnly
                className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
              />
            )}

            {selectedOption?.label === "Long answer" && (
              <textarea
                id="longAnswer"
                name="longAnswer"
                onChange={(e) => handleChange(e)}
                readOnly
                className="w-full h-20 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
              />
            )}

            {selectedOption?.label === "Single select" && (
              <div className="flex flex-col gap-2">
                {radioOptions &&
                  radioOptions.map((option, index) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="single-select"
                        value={option.value}
                        disabled
                        className="h-4 w-4 focus:outline-none focus:ring-2 focus:ring-light"
                      />
                      <input
                        type="text"
                        value={option.value}
                        onChange={(e) => handleRadioOptionChange(e, option.id)}
                        className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
                      />
                      {index < radioOptions.length - 1 && (
                        <button
                          type="button"
                          className="text-text-gray-1000 hover:text-red-500"
                          onClick={() => handleDeleteRadioOption(option.id)}
                        >
                          ✕
                        </button>
                      )}
                      {index === radioOptions.length - 1 && (
                        <button
                          type="button"
                          className="text-text-gray-1000 hover:text-[#00AA45]"
                          onClick={handleAddRadioOption}
                        >
                          <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.9729 8.00004H8.63957M13.3062 8.00004H8.63957M8.63957 8.00004V3.33337M8.63957 8.00004V12.6667"
                              stroke="#0D0D0D"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {selectedOption?.label === "Multiple select" && (
              <div className="flex flex-col gap-2">
                {radioOptions.map((option, index) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="multiple-select"
                      value={option.value}
                      disabled
                      className="h-4 w-4 focus:outline-none focus:ring-2 focus:ring-light"
                    />
                    <input
                      type="text"
                      value={option.value}
                      onChange={(e) => handleRadioOptionChange(e, option.id)}
                      className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
                    />
                    {index < radioOptions.length - 1 && (
                      <button
                        type="button"
                        className="text-text-gray-1000 hover:text-red-500"
                        onClick={() => handleDeleteRadioOption(option.id)}
                      >
                        ✕
                      </button>
                    )}
                    {index === radioOptions.length - 1 && (
                      <button
                        type="button"
                        className="text-text-gray-1000 hover:text-[#00AA45]"
                        onClick={handleAddRadioOption}
                      >
                        <svg
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.9729 8.00004H8.63957M13.3062 8.00004H8.63957M8.63957 8.00004V3.33337M8.63957 8.00004V12.6667"
                            stroke="#0D0D0D"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {selectedOption?.label === "URL" && (
              <input
                id="url"
                name="url"
                onChange={(e) => handleChange(e)}
                type="url"
                readOnly
                className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
              />
            )}

            {selectedOption?.label === "Number" && (
              <input
                id="number"
                name="number"
                onChange={(e) => handleChange(e)}
                type="number"
                readOnly
                className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
              />
            )}

            {selectedOption?.label === "Date" && (
              <input
                id="date"
                name="date"
                onChange={(e) => handleChange(e)}
                type="date"
                readOnly
                className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
              />
            )}

            {selectedOption?.label === "Time" && (
              <input
                id="time"
                name="time"
                onChange={(e) => handleChange(e)}
                type="time"
                readOnly
                className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
              />
            )}
          </div>

          <div className="w-full gap-3 flex items-center justify-end p-2.5">
            <button onClick={() => handleDelete(id)}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6H5H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 6V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V6M10 6V4C10 3.44772 10.4477 3 11 3H13C13.5523 3 14 3.44772 14 4V6M14 10V17M10 10V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Switch button */}
            <div className="w-fit flex items-center gap-2">
              <label
                htmlFor={id.toString()}
                className="font-inter text-sm font-normal leading-4 text-left focus:outline-none text-gray-1000 select-none"
              >
                Required
              </label>
              <Switch
                name="required"
                id={id.toString()}
                checked={formData.required}
                onCheckedChange={handleCheckChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default DynamicInputField;
