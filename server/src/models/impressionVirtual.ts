import mongoose from 'mongoose';
import { IImpresVirtual } from '../types/type'
import { model, Schema } from 'mongoose'
import  Person  from './person'

const vitualSchema: Schema = new Schema(
  {
    impres_virtual: {
      type: Number,
      required: true,
  },
},
  { timestamps: true }
)


export default model<IImpresVirtual>("ImpressionVirtual", vitualSchema)
