import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardSubtitle,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import { FormAddPoint, getPeople } from "../API";
import { useRouter } from "next/router";
import Select from "react-select";

import styles from "../../styles/Home.module.css";

import { Button, Container, Text } from "../components/ui";

import { toast } from 'react-toastify'
import InputLabel from "@mui/material/InputLabel";
 import FormControl from "@mui/material/FormControl";
 import MaterialSelect from "@mui/material/Select";
 import MenuItem from "@mui/material/MenuItem";


interface AddingPeople {

  people: string
}

const Add = () => {
  const [addItem, setAddItem] = useState<IMapper>({
    title: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    longitude: 0,
    latitude: 0,
    persons: [],
    icon: '',
  location_id: 0,
  });
  const [success, setSuccess] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [people, setPeople] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchPeople() {
      const people = await getPeople();

      setPeople(people);
    }

    setAddItem({
      title: "",
      address: "",
      city: "",
      province: "",
      postal_code: "",
      longitude: 0,
      latitude: 0,
      persons: [],
      icon: '',
      location_id: 0,
    });

    fetchPeople();
  }, []);

  const onAdd = () => {
    if (
      addItem.title &&
      addItem.address &&
      addItem.city &&
      addItem.province &&
      addItem.postal_code &&
      addItem.longitude &&
      addItem.latitude
    ) {
      FormAddPoint(addItem)
        .then((data) => {
          console.log(data);
          setSuccess(true);
          toast('Location Added')
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError(true);
    }

    console.log("handleAdd State: ");
  };

  const handleChange = (e: any) => {
    setAddItem({ ...addItem, [e.target.name]: e.target.value });
  };

  const onCancel = () => {
    router.push("/table");
    console.log(router)
  };

  // const onMain = () => {
  //   setSuccess(false);
  //   router.push("/table");
  // };

  const onAgain = () => {
    setSuccess(false);
    setAddItem({
      title: "",
      address: "",
      city: "",
      province: "",
      postal_code: "",
      longitude: 0,
      latitude: 0,
      persons: [],
      icon: '',
      location_id: 0,
    });
  };

  return (
    <Container>
      <div className="flex justify-center pt-20">
        <div className="pb-10">
          <Text variant="pageHeading">Add Location</Text>
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="border border-gray-200 rounded shadow-2xl p-10">
          <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  className={styles.inputField}
                  id="title"
                  type="text"
                  placeholder="Lcation Name"
                  name="title"
                  value={addItem.title}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  className={styles.inputField}
                  id="location_id"
                  type="number"
                  placeholder="Location Id"
                  name="location_id"
                  value={addItem.location_id}
                  onChange={handleChange}
                />
              </div>
            </div>
           
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  className={styles.inputField}
                  id="address"
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={addItem.address}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  className={styles.inputField}
                  id="city"
                  type="text"
                  placeholder="City"
                  name="city"
                  value={addItem.city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  className={styles.inputField}
                  id="province"
                  type="text"
                  name="province"
                  placeholder="Province"
                  value={addItem.province}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  className={styles.inputField}
                  id="postal_code"
                  type="text"
                  name="postal_code"
                  placeholder="Postal Code"
                  value={addItem.postal_code}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  className={styles.inputField}
                  id="latitude"
                  name="latitude"
                  placeholder="Latitude"
                  type="number"
                  value={addItem.latitude}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  className={styles.inputField}
                  id="longitude"
                  name="longitude"
                  placeholder="Longitude"
                  type="number"
                  value={addItem.longitude}
                  onChange={handleChange}
                />
              </div>
            </div>
    
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
            <FormControl sx={{ width: "100%", height: "100%" }}>
                 <InputLabel>Map Icon</InputLabel>

                   <MaterialSelect
                     defaultValue={addItem.icon}
                     label="Age"
                     name="icon"
                     id="icon"
                     onChange={handleChange}
                     className={styles.inputField}

                  
                  
                   >
                     <MenuItem value={'house'}>House</MenuItem>
                     <MenuItem value={'building'}>Building</MenuItem>
                   </MaterialSelect>

                 </FormControl>
            </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <Select
                  defaultValue={addItem.persons}
                  onChange={(people: any) => {
                    setAddItem({
                      ...addItem,
                      persons: people.map((person: { value: AddingPeople; }) => person.value),
                    });
                  }}
                  options={people.map((person) => {
                    return { Option, value: person._id, label: person.first_name  };
                  })}
                  isMulti={true}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="pr-2">
                <Button
                  className={styles.ButtonField}
                  onClick={() => onAdd()}
                >
                  Add Data
                </Button>
              </div>
              <div>
                <Button
                  className={styles.ButtonField}
                 
                ><Link href='/table'>
                  Cancel

                  </Link>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Add;
