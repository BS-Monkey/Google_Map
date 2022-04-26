import React, { useEffect, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";
import TimePicker from "@mui/lab/TimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "../../components/ui/Button";
import { Container, Text } from "../ui";
import styles from "./Contact.module.css";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { useRouter } from "next/router";
import { getCallTypes } from '../../API';

interface IProps {
    person: IPerson;
}

const FormOne = ({ person }: IProps) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [callTypes, setCallTypes] = useState<ICallType[]>([]);

    useEffect(() => {
        const fetchCallTypes = async () => {
            setCallTypes(await getCallTypes());
        };

        fetchCallTypes();
    });

    const [value, setValue] = React.useState<Date | null>(new Date("2022-01-01T21:11:54"));

    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };

    const [age, setAge] = React.useState("");

    const handleChange1 = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const handleSubmit = () => {
        const activeIntervals = JSON.parse(localStorage.getItem("activeIntervals") || "{}");

        activeIntervals[person._id] = Date.now() + (person?.color_change_interval || 1) * 1000;

        localStorage.setItem("activeIntervals", JSON.stringify(activeIntervals));

        router.push("/");
    };

    return (
        <>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
            <LocalizationProvider dateAdapter={null}>
                <Container>
                    <div className="  p-20 rounded-md shadow-2xl">
                        <div className="text-center  pb-20">
                            <Text variant="sectionHeading">Scheduled: Phone Call</Text>
                        </div>
                        <form className="w-full max-w-lg ">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-6">
                                    <FormControl sx={{ m: 0, minWidth: 233 }}>
                                        <InputLabel id="demo-simple-select-label">Type of call</InputLabel>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChange1}>
                                            {callTypes.map(callType => (
                                                <MenuItem key={callType._id} value={callType.duration}>{callType.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <TimePicker label="Start" value={value} onChange={handleChange} renderInput={(params) => <TextField {...params} />} />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <div className="relative">
                                        <DesktopDatePicker label="Date " inputFormat="MM/dd/yyyy" value={value} onChange={handleChange} renderInput={(params) => <TextField {...params} />} />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <TimePicker label="End" value={value} onChange={handleChange} renderInput={(params) => <TextField {...params} />} />
                                </div>
                            </div>

                            <textarea
                                // value={message}
                                id="message"
                                placeholder="Comment"
                                className={styles.textField}
                                // onChange={(e) => {
                                //   setMessage(e.target.value);
                                // }}
                                // type="message"
                                name="message"
                                required
                            />
                            <Button
                                variant="flat"
                                type="submit"
                                onClick={handleSubmit}
                                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
                            >
                                {loading ? <SyncOutlined spin /> : "Submit"}
                            </Button>
                        </form>
                    </div>
                </Container>
            </LocalizationProvider>
        </>
    );
};

export default FormOne;
