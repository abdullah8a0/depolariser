import { Schema, model, Document } from "mongoose";
import { InfoCard } from "../../shared/common";

const CardSchema = new Schema({
  date: String,
  CNNCards: Array,
  FOXCards: Array,
});

export interface Card extends Document {
  date: string;
  CNNCards: Array<InfoCard>;
  FOXCards: Array<InfoCard>;
}

const CardModel = model<Card>("Card", CardSchema);

export default CardModel;
