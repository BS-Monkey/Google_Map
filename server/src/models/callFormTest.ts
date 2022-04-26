import { IPhoneCallTest } from '../types/type'
import { model, Schema } from 'mongoose'


const callformtestSchema: Schema = new Schema(
  {
    textValue: {
      type: String,
      required: true,
    },

    radioValue: {
      type: String,
      required: true,
    },
    
    checkboxValue: [{
      type: String,
      required: true,
    }],

    dateValue: {
      type: Date,
      required: true,
    },
    dropdownValue: {
      type: String,
      required: true,
    },

    sliderValue: {
      type: Number,
      required: true,
    },
},
  { timestamps: true }
)

export default model<IPhoneCallTest>("FormCallTest", callformtestSchema)
