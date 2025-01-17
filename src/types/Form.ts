import mongoose, { Schema, Document } from "mongoose";

export interface Options extends Document {
  label: string;
  value: string;
}

const OptionsSchema: Schema<Options> = new Schema({
  label: {
    type: String,
  },
  value: {
    type: String,
  },
});

export interface FormField {
  questionId: mongoose.Types.ObjectId;
  label: string;
  placeholder: string;
  fieldType: string;
  required: boolean;
  options: Options[];
}

export const FormFieldSchema: Schema<FormField> = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    required: true,
  },
  label: {
    type: String,
    required: [true, "Label is required"],
  },
  placeholder: {
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
  options: [OptionsSchema],
});

export interface Form extends Document {
  title: string;
  description: string;
  isPublished: boolean;
  createdBy: mongoose.Types.ObjectId;
  formFields: FormField[];
}
