import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IHistory extends Document {
  userId: IUser['_id'];
  calculationDetails: object;
  date: Date;
}

const HistorySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  calculationDetails: { type: Object, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IHistory>('History', HistorySchema);