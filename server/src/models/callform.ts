import { IPhoneCall } from '../types/type'
import { model, Schema } from 'mongoose'


const callformSchema: Schema = new Schema(
  {
    call_type: {
      type: String,
      required: true,
    },

    start: {
      type: Number,
      required: true,
    },
    
    end: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
},
  { timestamps: true }
)

export default model<IPhoneCall>("FormCall", callformSchema)
