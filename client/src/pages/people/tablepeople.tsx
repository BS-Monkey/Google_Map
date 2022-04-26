import React, { useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router'

import TableContainer from '../../components/Table/TableContainer'
import { SelectColumnFilter } from '../../components/Table/filters';
import { Container, Text, Button } from "../../components/ui";
import styles from "../../../styles/Home.module.css";

import { getPeople } from '../../API'

const NewTablePeople: NextPage = () => {
  const [data, setData] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const doFetch = async () => {
      getPeople()
       .then(data => {
         setData(data)
         console.log("datas: ", data)
        })
       .catch(err => console.log(err))
    };
    doFetch();
  }, []);

  const columns = useMemo(
    () => [
 
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'City',
        accessor: 'city',
      },
      {
        Header: 'Province',
        accessor: 'province',
      },
      {
        Header: 'Postal Code',
        accessor: 'postal_code',
      },
      {
        Header: 'Rank',
        accessor: 'rank',
      },
      {
        Header: 'Person Id',
        accessor: 'person_id',
      },
    ],
    []
  );
  
  const handleOpen = () => {
    router.push('/people/addpeople')
  }
  
  const handleFromFile = () => {
    router.push('/people/addfilepeople')
  }

  return (
    <Container>
    <div>
 <div className=" flex justify-center">
        <div className="pt-40">
          <h1>People</h1>
        </div>
      </div>

      <div className=" flex justify-center pb-20">
        <div className="pr-4">
          <Button className={styles.ButtonField} onClick={() => handleOpen()}>
            Add Person
          </Button>
        </div>
        <div className="pl-4">
          <Button
            className={styles.ButtonField}
            onClick={() => handleFromFile()}
          >
            Add From File
          </Button>
        </div>
      </div>

      <TableContainer 
        columns={columns}
        data={data}
      />

      
    </div>
    </Container>
  );
};

export default NewTablePeople;
