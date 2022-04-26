import mongoose from 'mongoose';
import { IPoint } from '../types/type'
import { model, Schema } from 'mongoose'
import  Person  from './person'

const pointSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    postal_code: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },
    
    longitude: {
      type: Number,
      required: true,
    },
    icon: {
      type: String
    },
    location_id: {
      type: Number
    },

    persons: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Person',
    },
    require,
  ]
  },
  { timestamps: true }
)

export default model<IPoint>("Point", pointSchema)
