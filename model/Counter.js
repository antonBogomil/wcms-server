import * as mongoose from 'mongoose';

const counterSchema = mongoose.Schema(
  {
      _id: { type: String, required: true },
      sequence_value: { type: Number, default: 1 }
  }
);

// const menuCounter = new Counters({ _id: 'menuId' });
// menuCounter.save();

const Counters = mongoose.model('Counters', counterSchema);

export default Counters;
