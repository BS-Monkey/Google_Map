import { ChangeEvent, useState } from "react";
import { createCallType } from '../../API';

const CreateCallTypePage = () => {
    const [data, setData] = useState<ICallType>({ name: "", duration: 0 });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {
        await createCallType(data);
        
        window.location.reload();
    };

    return (
        <div className='flex justify-center flex-col items-center mt-5'>
            <h3>Create Call Type</h3>

            <input className='mt-5' type="text" name="name" id="name" onChange={handleChange} value={data.name} placeholder="Name" />

            <input className='mt-5' type="number" name="duration" id="duration" onChange={handleChange} value={data.duration || ''} placeholder="Duration" />

            <button className='mt-3' onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default CreateCallTypePage;
