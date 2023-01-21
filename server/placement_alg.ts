import Descriptor from "./models/Descriptor";
import DescriptorInterface from "../shared/Descriptor";

export const generateDescriptor = (selctions: string, userId: string): DescriptorInterface => {
  return new Descriptor({
    userId: userId,
    DescVector: [1, 2, 3],
  });
};

export const fecthResults = (descriptor: DescriptorInterface): string => {
  return "Commie";
};
