import { Document } from "mongoose";

export interface IPerson extends Document {
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    rank: string;
    person_id: number;
    color_change_interval: number;
    impression_live: number;
    impression_virtual: number;
}

export interface IPoint extends Document {
    title: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    latitude: number;
    longitude: number;
    persons?: IPerson[];
    icon: string;
    location_id: number;
}

export interface IImpresLive extends Document {
    impres_live: number;
}

export interface IImpresVirtual extends Document {
    impres_virtual: number;
}

export interface IPhoneCall extends Document {
    call_type: string;
    start: number;
    end: number;
    comment: string;
}

export interface IPhoneCallTest extends Document {
    textValue: string;
    radioValue: string;
    checkboxValue: string[];
    dateValue: Date;
    dropdownValue: string;
    sliderValue: number;
}

export interface ICallType extends Document {
    name: string;
    duration: number;
}
