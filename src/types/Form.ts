import mongoose, { Schema, Document } from "mongoose";

export interface Options extends Document {
  id: string;
  value: string;
}

const OptionsSchema: Schema<Options> = new Schema({
  id: {
    type: String,
  },
  value: {
    type: String,
  },
});

export interface FormField {
  questionId: string;
  title: string;
  helpText: string;
  fieldType: string;
  required: boolean;
  options: Options[];
}

export const FormFieldSchema: Schema<FormField> = new Schema({
  questionId: {
    type: String,
    required: [true, "Question ID is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  helpText: {
    type: String,
  },
  fieldType: {
    type: String,
    required: [true, "Field type is required"],
    enum: [
      "text",
      "textarea",
      "radio",
      "checkbox",
      "url",
      "number",
      "date",
      "time",
    ],
  },
  required: {
    type: Boolean,
    default: false,
  },
  options: {
    type: [OptionsSchema],
    validate: {
      validator: function (this: FormField, options: Options[]) {
        // If fieldType is "radio" or "checkbox", options must be present
        if (this.fieldType === "radio" || this.fieldType === "checkbox") {
          return Array.isArray(options) && options.length > 0;
        }
        // Otherwise, options should not exist or be an empty array
        return options === undefined || options.length === 0;
      },
      message:
        "Options are required for 'radio' and 'checkbox' field types and should be empty for other field types.",
    },
  },
});

export interface Form extends Document {
  id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  isPublished: boolean;
  createdBy: mongoose.Types.ObjectId;
  formFields: FormField[];
}
