import mongoose from 'mongoose';

const todoSchema = mongoose.Schema(
  {
    done: {
      type: Boolean,
      required: [true, 'Please add a done value'],
      default: false
    },
    text: {
      type: String,
      required: [true, 'Please add a text value']
    },
    creationDate: {
      type: String,
      required: [true, 'Please add a creationDate value']
    },
    expirationDate: {
      type: String,
      required: [true, 'Please add an expirationDate value']
    },
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
