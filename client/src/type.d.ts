interface IMarker {
    _id: string;
    title: string;
    address?: string;
    city?: string;
    province?: string;
    postal_code?: string;
    latitude: number;
    longitude: number;
    persons: IPerson[];
    icon: string;
    location_id?: number;
    color?: string;
    period?: string;
    info_open?: boolean;
    visited?: boolean;
    last_visited?: Date;
    active?: boolean;
    reserve?: boolean;
    pickDate?: Date;
    fromTime?: Date;
    toTime?: Date;
}

interface PointProps {
    point: IMarker;
}

type ApiGetData = {
    message: string;
    point: IMarker;
};

type ApiGetAllMarkers = {
    message: string;
    points: IMarker[];
};

type IPerson = {
    _id: string;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    rank: string;
    person_id: number;
    messages: IMessage[];
    messages1: IMessage1[];
    messages2: IMessage2[];
    color: string;
    color_change_interval: number;
};

type IMessage = {
    name: string;
};

type IMessage1 = {
    name1: string;
};

type IMessage2 = {
    name2: string;
};

type Location = {
    title: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    latitude: number;
    longitude: number;
    icon: string;
    location_id: number;
};

type ApiGetDataNew = {
    message: string;
    point: Location;
};

type ApiGetAllDataNew = {
    message: string;
    items: Location[];
};

interface IMapper {
    title: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    latitude: number;
    longitude: number;
    persons: string[];
    icon: string;
    location_id: number;
}

interface IPeoples {
    _id?: string;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    rank: string;
    person_id: number;
    color_change_interval?: number;
}

interface ICallForm {
    call_type: string;
    start: number;
    end: number;
    comment: string;
}

type CallForm = {
    call_type: string;
    start: number;
    end: number;
    comment: string;
};

type People = {
    _id: string;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    rank: string;
    person_id: number;
};

type ApiGetDataPeople = {
    message: string;
    person: People;
};

type ApiGetAllDataPeople = {
    message: string;
    person: People[];
};

type ApiGetPersonByIdResponse = {
    person: IPerson;
};

type GetCallTypesResponse = {
    data: ICallType[];
}

type CreateCallTypeResponse = {
    data: ICallType | null;
}

type ApiGetDataForm = {
    message: string;
    formaz: CallForm;
};

interface ISubmitForm {
    call_type: string;
    start: number;
    end: number;
    comment: string;
}

interface IFormInput {
    textValue: string;
    radioValue: string;
    checkboxValue: string[];
    dateValue: Date;
    dropdownValue: string;
    sliderValue: number;
}

type CallFormnew = {
    textValue: string;
    radioValue: string;
    checkboxValue: string[];
    dateValue: Date;
    dropdownValue: string;
    sliderValue: number;
};

type ApiGetDataFormNew = {
    message: string;
    formaztest: CallFormnew;
};

interface ICallType {
    _id?: string;
    name: string;
    duration: number;
}