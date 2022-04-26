import { Response, Request } from "express";
import { IPhoneCall, IPhoneCallTest } from "../../types/type";
import FormCall from "../../models/callform";
import FormCallTest from "../../models/callFormTest";

const getForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const formcall: IPhoneCall[] = await FormCall.find();
    res.status(200).json({ formcall });
  } catch (error) {
    throw error;
  }
};

const addForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      IPhoneCall,
      "call_type" | "start" | "end" | "comment"
    >;

    const formcall: IPhoneCall = new FormCall({
      call_type: body.call_type,
      start: body.start,
      end: body.end,
      comment: body.comment,
    });

    const newForm: IPhoneCall = await formcall.save();

    res.status(200).json({ message: "Perosn form", formcall: newForm });
  } catch (error) {
    throw error;
  }
};

const getFormTest = async (req: Request, res: Response): Promise<void> => {
  try {
    const formcalltest: IPhoneCallTest[] = await FormCallTest.find();
    res.status(200).json({ formcalltest });
  } catch (error) {
    throw error;
  }
};

const addFormTest = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      IPhoneCallTest,
      | "textValue"
      | "radioValue"
      | "checkboxValue"
      | "dateValue"
      | "dropdownValue"
      | "sliderValue"
    >;

    const formcalltest: IPhoneCallTest = new FormCallTest({
      textValue: body.textValue,
      radioValue: body.radioValue,
      checkboxValue: body.checkboxValue,
      dateValue: body.dateValue,
      dropdownValue: body.dropdownValue,
      sliderValue: body.sliderValue,
    });

    const newFormtest: IPhoneCallTest = await formcalltest.save();

    res.status(200).json({ message: "Perosn form", formaztest: newFormtest });
  } catch (error) {
    throw error;
  }
};

export { getForm, addForm, getFormTest, addFormTest };
