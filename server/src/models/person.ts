import { IPerson } from "../types/type";
import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const personSchema: Schema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
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
    rank: {
        type: String,
        required: true,
    },
    person_id: {
        type: Number,
        required: true,
    },
    color_change_interval: {
        type: Number,
        default: 1
    },
    impression_live: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "ImpressionLive",
    },
    impression_virtual: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "ImpressionVirtual",
    },
});

export default model<IPerson>("Person", personSchema);
