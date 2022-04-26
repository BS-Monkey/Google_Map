import mongoose from 'mongoose';
import { IImpresLive } from '../types/type'
import { model, Schema } from 'mongoose'

const liveSchema: Schema = new Schema(
  {
    impres_live: {
      type: Number,
      required: true,
  },
},
  { timestamps: true }
)


export default model<IImpresLive>("ImpressionLive", liveSchema)
