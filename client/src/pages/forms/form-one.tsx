import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { getPerson } from '../../API';
import FormOne from "../../components/FormOne/FormOne";

const FirstForm = () => {
    const router = useRouter();
    
    const [person, setPerson] = useState<IPerson>();

    useEffect(() => {
        const fetchPerson = async () => {
            setPerson(await getPerson(router.query.person_id as string));
        };

        if (router.query.person_id) {
            fetchPerson();
        }
    }, [router.query]);

    return (
        <>
            <div className="container pt-20">
                <div className="flex justify-center">
                    <FormOne person={person} />
                </div>
            </div>
        </>
    );
};

export default FirstForm;
