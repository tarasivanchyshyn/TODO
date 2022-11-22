import mongoose from 'mongoose';

const todoSchema = mongoose.Schema(
  {
    done: { type: Boolean, default: false },
    text: {
      type: String,
      required: [true, 'Please add a text value']
    },
    creationDate: String,
    expirationDate: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    versionKey: false
  }
);

export default mongoose.model('Todo', todoSchema);
