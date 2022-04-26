import axios, { AxiosResponse } from "axios";

const baseUrl: string = "http://localhost:4000";

export const getPoints = async (): Promise<IMarker[]> => {
    try {
        const points: AxiosResponse<ApiGetAllMarkers> = await axios.get(baseUrl + "/points");
        return points.data.points;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const addPoint = async (point: IMarker): Promise<IMarker> => {
    try {
        const savePoint: AxiosResponse<ApiGetData> = await axios.post(baseUrl + "/add-point", point);
        return savePoint.data.point;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const updatePoint = async (point: IMarker): Promise<IMarker> => {
    try {
        const pointUpdate: Pick<IMarker, "title" | "latitude" | "longitude" | "color" | "fromTime" | "toTime" | "persons"> = {
            title: point.title,
            latitude: point.latitude,
            longitude: point.longitude,
            color: point.color,
            fromTime: point.fromTime,
            toTime: point.toTime,
            persons: point.persons,
        };
        const updatedPoint: AxiosResponse<ApiGetData> = await axios.put(`${baseUrl}/edit-point/${point._id}`, pointUpdate);
        return updatedPoint.data.point;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const deletePoint = async (_id: string | number): Promise<string | number> => {
    try {
        const deletedPoint: AxiosResponse<ApiGetData> = await axios.delete(`${baseUrl}/delete-point/${_id}`);
        return deletedPoint.data.point._id;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const addFromFile = async (addItems: Location[]): Promise<Location> => {
    try {
        const savePoint: AxiosResponse<ApiGetDataNew> = await axios.post(baseUrl + "/addFile", addItems);
        return savePoint.data.point;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const FormAddPoint = async (point: IMapper): Promise<IMarker> => {
    try {
        const savePoint: AxiosResponse<ApiGetData> = await axios.post(baseUrl + "/add-point", point);
        return savePoint.data.point;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getPeople = async (): Promise<IPeoples[]> => {
    try {
        const person: AxiosResponse<ApiGetAllDataPeople> = await axios.get(baseUrl + "/persons");
        return person.data.person;
    } catch (error: any) {
        console.log(error.response);
        throw new Error(error);
    }
};

export const getPerson = async (id: string): Promise<IPerson | null> => {
    try {
        const person: AxiosResponse<ApiGetPersonByIdResponse> = await axios.get(baseUrl + "/persons/" + id);

        return person.data.person;
    } catch (error) {
        return error?.response?.data?.person;
    }
};

export const getCallTypes = async (): Promise<ICallType[]> => {
    try {
        const response: AxiosResponse<GetCallTypesResponse> = await axios.get(baseUrl + '/call-types');

        return response.data.data;
    } catch (error) {
        console.error(error);

        return [];
    }
};

export const createCallType = async (body: Partial<ICallType>): Promise<ICallType | null> => {
    try {
        const response: AxiosResponse<CreateCallTypeResponse> = await axios.post(baseUrl + '/call-types', body);

        return response.data.data;
    } catch (error) {
        console.error(error);

        return null;
    }
};

export const addPeopleFromFile = async (addItems: People[]): Promise<People> => {
    try {
        const savePoint: AxiosResponse<ApiGetDataPeople> = await axios.post(baseUrl + "/add-people-file", addItems);
        return savePoint.data.person;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const FormAddPeople = async (person: IPeoples): Promise<IPeoples> => {
    try {
        const savePoint: AxiosResponse<ApiGetDataPeople> = await axios.post(baseUrl + "/add-people", person);
        return savePoint.data.person;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const AddFormCall = async (formaz: ICallForm): Promise<ICallForm> => {
    try {
        const savePoint: AxiosResponse<ApiGetDataForm> = await axios.post(baseUrl + "/post-form", formaz);
        return savePoint.data.formaz;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const AddFormCallTest = async (formaztest: IFormInput): Promise<IFormInput> => {
    try {
        const saveFormTest: AxiosResponse<ApiGetDataFormNew> = await axios.post(baseUrl + "/post-form-test", formaztest);
        return saveFormTest.data.formaztest;
    } catch (error: any) {
        throw new Error(error);
    }
};
