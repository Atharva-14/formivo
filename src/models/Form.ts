import { FormFieldSchema, type Form } from "@/types/Form";
import mongoose, { Schema } from "mongoose";

const FormSchema: Schema<Form> = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  formFields: [FormFieldSchema],
});

const FormModel =
  (mongoose.models?.Form as mongoose.Model<Form>) ||
  mongoose.model<Form>("Form", FormSchema);

export default FormModel;
