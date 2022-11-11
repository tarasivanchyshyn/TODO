import mongoose from 'mongoose';

const todoSchema = mongoose.Schema(
  {
    id: String,
    done: { type: Boolean, default: false },
    text: {
      type: String,
      required: [true, 'Please add a text value']
    },
    creationDate: String,
    expirationDate: String
  },
  {
    versionKey: false
  }
);

export default mongoose.model('Todo', todoSchema);
