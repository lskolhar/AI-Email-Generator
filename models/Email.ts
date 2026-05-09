import mongoose, { Schema, Document } from 'mongoose';

export interface IEmail extends Document {
  prompt: string;
  tone: string;
  subject: string;
  body: string;
  createdAt: Date;
}

const EmailSchema: Schema = new Schema({
  prompt: { type: String, required: true },
  tone: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Use existing model if it exists, otherwise create it
export default mongoose.models.Email || mongoose.model<IEmail>('Email', EmailSchema);
