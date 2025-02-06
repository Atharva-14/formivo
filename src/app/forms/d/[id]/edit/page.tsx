"use client";

import DynamicInputField, {
  DynamicInputFieldProps,
} from "@/components/DynamicInputField";
import { useToast } from "@/hooks/use-toast";
import { FormField } from "@/types/Form";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  ForwardRefExoticComponent,
  RefAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    formTitle: "",
    formDescription: "",
  });

  const [inputFields, setInputFields] = useState<FormField[]>([]);

  const inputFieldsRefs = useRef<
    Array<
      RefObject<ForwardRefExoticComponent<
        DynamicInputFieldProps & RefAttributes<unknown>
      > | null>
    >
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewDisabled, setIsPreviewDisabled] = useState(true);

  const router = useRouter();
  const params = useParams();

  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);

    const savedFormData = localStorage.getItem("formData");

    if (savedFormData) {
      const parseData = JSON.parse(savedFormData);

      setInputFields(parseData);
      setIsLoading(false);
    } else {
      const getFormData = async () => {
        const { id } = params;

        try {
          const { data, status } = await axios.get(`/api/forms?id=${id}`);

          if (status === 200) {
            console.log("response", data.form);
            const { formFields, title, description } = data.form;

            // localStorage.setItem("formData", JSON.stringify(formFields));
            setFormData({ formTitle: title, formDescription: description });
            setInputFields(formFields);
          } else {
            console.error("Failed to get form");
          }
        } catch (error) {
          console.log("Error fetching form: ", error);
        } finally {
          setIsLoading(false);
        }
      };

      getFormData();
    }
  }, []);

  const handleDeleteQuestion = (id: FormField["questionId"]) => {
    const updatedItems = inputFields.filter((item) => item.questionId !== id);
    console.log("updatedItems", updatedItems);

    setInputFields(updatedItems);
  };

  const handleSaveAsDraft = () => {
    const updatedAllData = inputFieldsRefs.current.map((inputFieldRef) => {
      if (inputFieldRef.current) {
        return inputFieldRef.current?.getData();
      }
      return null;
    });

    const data = updatedAllData.filter((item) => item !== null);

    localStorage.setItem("formData", JSON.stringify(data));

    saveToDatabase(data);
  };

  const saveToDatabase = async (formFields: any[]) => {
    const { id } = params;

    try {
      const { data, status } = await axios.put("/api/forms/", {
        id,
        title: formData.formTitle,
        description: formData.formDescription,
        formFields,
        isPublished: false,
      });

      if (status === 200) {
        console.log("DB Data", data);
      } else {
        toast({
          title: "Error",
          description: "Failed to save form",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("Error saving form to DB: ", error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddQuestion = () => {
    const newID = crypto.randomUUID();
    const newInputField: FormField = {
      questionId: newID,
      title: "",
      helpText: "",
      fieldType: "",
      options: [],
      required: false,
    };

    setInputFields((prev) => [...prev, newInputField]);
    inputFieldsRefs.current.push(React.createRef());
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-[#00AA45] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-white">
        <div className="mx-auto md:w-[640px] h-auto border-r border-b border-l flex justify-between items-center px-6 py-1 border-gray-200">
          <div className="flex flex-col gap-2">
            <input
              id="formTitle"
              name="formTitle"
              onChange={handleChange}
              value={formData.formTitle}
              className="focus:outline-none w-full sm:w-fit h-fit font-semibold text-base focus:border-b-2 focus:border-gray-800"
              placeholder="Untitled form"
              required
            />
            <input
              id="formDescription"
              name="formDescription"
              onChange={handleChange}
              value={formData.formDescription}
              className="focus:outline-none w-full sm:w-fit h-fit font-light text-sm focus:border-b-2 focus:border-gray-800 "
              placeholder="Description"
              required
            />
          </div>

          <button
            disabled={isPreviewDisabled}
            className={`flex items-center gap-1 border rounded-2xl py-1.5 px-3.5 ${
              isPreviewDisabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <label
              className={`text-xs font-semibold ${
                isPreviewDisabled
                  ? "text-gray-400"
                  : "text-gray-900 cursor-pointer"
              }`}
            >
              Preview
            </label>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.56297 11.6318L11.4376 4.75711M11.4376 4.75711V11.3568M11.4376 4.75711H4.83795"
                stroke="#0D0D0D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow md:w-[640px] md:mx-auto border-l border-r px-6 pb-20">
        <div className="w-full flex flex-col gap-6 pt-6">
          {inputFields.map((inputField: FormField, index) => (
            <div key={inputField.questionId} className="relative w-full">
              <DynamicInputField
                id={inputField.questionId}
                ref={
                  inputFieldsRefs.current[index] ||
                  (inputFieldsRefs.current[index] = React.createRef())
                }
                handleDelete={handleDeleteQuestion}
                inputData={inputField}
              />
            </div>
          ))}

          <div className="flex justify-center items-center">
            <button
              onClick={handleAddQuestion}
              className="flex w-fit items-center border rounded-2xl py-2 px-4 gap-2 border-gray-200"
            >
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.83334 8.00004H8.50001M13.1667 8.00004H8.50001M8.50001 8.00004V3.33337M8.50001 8.00004V12.6667"
                  stroke="#24292E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="font-semibold text-sm">Add Question</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full md:w-[640px] mx-auto border-t px-6 py-4 flex justify-between items-center bg-[#F6F8FAE5]">
        <button
          onClick={handleSaveAsDraft}
          className="flex items-center border rounded-2xl py-1.5 pl-3.5 pr-4 border-[#E1E4E8] gap-1 cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.1668 7.33337V6.66671C13.1668 4.15255 13.1668 2.89547 12.3857 2.11442C11.6047 1.33337 10.3476 1.33337 7.83347 1.33337H7.16687C4.65272 1.33337 3.39564 1.33337 2.6146 2.11441C1.83355 2.89545 1.83354 4.15252 1.83352 6.66666L1.8335 9.33337C1.83347 11.8475 1.83346 13.1046 2.61448 13.8856C3.39553 14.6666 4.65265 14.6667 7.1668 14.6667"
              stroke="#24292E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.8335 4.66663H10.1668M4.8335 7.99996H10.1668"
              stroke="#24292E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M8.83347 13.8846V14.6667H9.61573C9.88867 14.6667 10.0251 14.6667 10.1478 14.6159C10.2705 14.565 10.367 14.4686 10.56 14.2756L13.7757 11.0596C13.9577 10.8776 14.0487 10.7866 14.0974 10.6885C14.19 10.5017 14.19 10.2824 14.0974 10.0956C14.0487 9.99744 13.9577 9.90644 13.7757 9.72444C13.5937 9.54244 13.5027 9.45144 13.4045 9.40277C13.2177 9.31024 12.9983 9.31024 12.8115 9.40277C12.7134 9.45144 12.6223 9.54244 12.4403 9.72444L9.2246 12.9404C9.0316 13.1334 8.93513 13.2298 8.88433 13.3525C8.83347 13.4752 8.83347 13.6116 8.83347 13.8846Z"
              stroke="#0D0D0D"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>

          <span className="font-semibold text-sm text-center text-text-gray-1000">
            Save as Draft
          </span>
        </button>
        <button
          // onClick={handlePublish}
          type="submit"
          // className={`flex items-center border rounded-2xl py-1.5 pr-4 pl-3.5 text-white gap-1 ${
          //   isDisabled || isLoading
          //     ? "bg-green-400 opacity-50 cursor-not-allowed"
          //     : "bg-[#00AA45] border-[#1E874B]"
          // }`}
          className="flex items-center border rounded-2xl py-1.5 pr-4 pl-3.5 text-white gap-1 bg-[#00AA45] border-[#1E874B]"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-t-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></span>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8.38091L6 11.1666L13 4.66663"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <span className="font-semibold text-sm">
            {isLoading ? "Publishing..." : "Publish Form"}
          </span>
        </button>
      </footer>
    </div>
  );
};

export default Page;
