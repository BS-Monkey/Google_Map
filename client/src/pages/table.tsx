import React, { useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import TableContainer from "../components/Table/TableContainer";
import { SelectColumnFilter } from "../components/Table/filters";
import styles from "../../styles/Home.module.css";
import { getPoints } from "../API";
import { Container, Text, Button } from "../components/ui";

const NewTable: NextPage = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const doFetch = async () => {
      getPoints()
        .then((data) => {
          setData(data);
          console.log("datas: ", data);
        })
        .catch((err) => console.log(err));
    };
    doFetch();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Location Name",
        accessor: "title",
      },
      {
        Header: "Latitude",
        accessor: "latitude",
      },
      {
        Header: "Longitude",
        accessor: "longitude",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Province",
        accessor: "province",
      },
      {
        Header: "Postal Code",
        accessor: "postal_code",
      },
      {
        Header: "Location Id",
        accessor: "location_id",
      },
    ],
    []
  );

  const handleOpen = () => {
    router.push("/add");
  };

  const handleFromFile = () => {
    router.push("/addFile");
  };

  return (
    <Container>
       <div className='pb-40'>

       <div className=" flex justify-center">
        <div className="pt-40">
          <h1>Locations</h1>
        </div>
      </div>

      <div className=" flex justify-center pb-20">
        <div className="pr-4">
          <Button className={styles.ButtonField} onClick={() => handleOpen()}>
            Add Location
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
      <div className="border border-gray-200 rounded bg-white ml-10">
        <TableContainer columns={columns} data={data} />
      </div>
      
       </div>
     
    </Container>
  );
};

export default NewTable;
