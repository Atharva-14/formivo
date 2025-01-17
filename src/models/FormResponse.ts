import { ResponsesSchema, type FormResponse } from "@/types/FormResponse";
import mongoose, { Schema } from "mongoose";

const FormResponseSchema: Schema<FormResponse> = new Schema(
  {
    formId: {
      type: Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    responses: [ResponsesSchema],
  },
  {
    timestamps: true,
  }
);

const FormResponseModel =
  (mongoose.models.Response as mongoose.Model<Response>) ||
  mongoose.model<Response>("Response", FormResponseSchema);

export default FormResponseModel;
