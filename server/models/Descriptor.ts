import { Schema, model, Document } from "mongoose";

const DescriptorSchema = new Schema({
  userId: String,
  DescVector: Array,
});

export interface Descriptor extends Document {
  userId: string;
  DescVector: Array<number>;
  _id: string;
}

const DescriptorModel = model<Descriptor>("Descriptor", DescriptorSchema);

export default DescriptorModel;
