import { Response, Request } from "express";
import { IPoint } from "../../types/type";
import Point from "../../models/point";

const getPoints = async (req: Request, res: Response): Promise<void> => {
    try {
        const points: IPoint[] = await Point.find().populate("persons");
        res.status(200).json({ points });
    } catch (error) {
        throw error;
    }
};

const addPoint = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<
            IPoint,
            | "title"
            | "address"
            | "city"
            | "province"
            | "postal_code"
            | "latitude"
            | "longitude"
            | "persons"
            | "icon"
            | "location_id"
        >;

        const point: IPoint = new Point({
            title: body.title,
            address: body.address,
            city: body.city,
            postal_code: body.postal_code,
            province: body.province,
            latitude: body.latitude,
            longitude: body.longitude,
            persons: body.persons,
            icon: body.icon,
            location_id: body.location_id,
        });

        const newPoint: IPoint = await point.save();

        res.status(200).json({ message: "Point added", point: newPoint });
    } catch (error) {
        throw error;
    }
};

const updatePoint = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req;
        const updatePoint: IPoint | null = await Point.findByIdAndUpdate({ _id: id }, body);
        res.status(200).json({
            message: "Point updated",
            point: updatePoint,
        });
    } catch (error) {
        throw error;
    }
};

const deletePoint = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletePoint: IPoint | null = await Point.findByIdAndRemove(req.params.id);
        res.status(200).json({
            message: "Point deleted",
            point: deletePoint,
        });
    } catch (error) {
        throw error;
    }
};

const addFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const addItems: IPoint[] = req.body;

        addItems.map((body: IPoint) => {
            const data: IPoint = new Point({
                title: body.title,
                address: body.address,
                city: body.city,
                province: body.province,
                latitude: body.latitude,
                longitude: body.longitude,
                persons: body.persons,
                postal_code: body.postal_code,
                location_id: body.location_id,
            });

            let state = saveData(data);
            // const newItem: IItem = await data.save()
            if (!state) res.status(200).json({ message: "addFile failed" });
        });
        res.status(200).json({ message: "addFile success" });
    } catch (error) {
        throw error;
    }
};

const saveData = async (data: IPoint) => {
    const newItem: IPoint = await data.save();
    if (newItem) return true;
};

export { getPoints, addPoint, updatePoint, deletePoint, addFile };
