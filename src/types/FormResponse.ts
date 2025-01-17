import mongoose, { Schema, Document } from "mongoose";

export interface Responses extends Document {
  questionId: mongoose.Types.ObjectId;
  answer: string;
}

export const ResponsesSchema: Schema<Responses> = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  answer: {
    type: Schema.Types.Mixed,
  },
});

export interface FormResponse extends Document {
  formId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  responses: Responses[];
}

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

const FormResponse =
  (mongoose.models?.Response as mongoose.Model<Response>) ||
  mongoose.model<Response>("Response", FormResponseSchema);

export default Response;
