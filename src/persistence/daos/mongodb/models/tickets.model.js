import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
 
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
    required: true,
  },

  
  code: {
    type: String,
    required: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },

  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String, 
    required: true,
  },

});

export const TicketModel = mongoose.model('tickets', ticketSchema);