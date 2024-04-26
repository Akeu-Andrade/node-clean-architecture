import mongoose from 'mongoose';

const BuySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Buy = mongoose.model('Buy', BuySchema);

export default Buy;