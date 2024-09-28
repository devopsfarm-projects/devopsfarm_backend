import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  issuedDate: Date;
}

const certificateSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  issuedDate: { type: Date, default: Date.now },
});

const Certificate = mongoose.model<ICertificate>('Certificate', certificateSchema);
export default Certificate;





// // /src/models/certificate.ts
// import mongoose, { Document, Schema } from 'mongoose';

// export interface ICertificate extends Document {
//   name: string;
//   issueDate: Date;
//   userId: mongoose.Types.ObjectId;
// }

// const certificateSchema = new Schema({
//   name: { type: String, required: true },
//   issueDate: { type: Date, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// });

// export default mongoose.model<ICertificate>('Certificate', certificateSchema);
