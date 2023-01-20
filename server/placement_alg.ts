import Descriptor from "./models/Descriptor";
import DescriptorInterface from "../shared/Descriptor";

export const generateDescriptor = (selctions: string): DescriptorInterface => {
  return new Descriptor({
    userId: "test",
    DescVector: [1, 2, 3],
  });
};
