import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router'
import { Importer, ImporterField } from 'react-csv-importer';
import 'react-csv-importer/dist/index.css';
import {
  Container,
  Button
} from 'reactstrap'
import { addPeopleFromFile } from '../../API'

const AddFilePeople = () => {
  const [addItems, setAddMarker] = useState<People[]>([])
  const router = useRouter()

  const onReturn = () => {
    router.push('/people/tablepeople')
  }
  return (
    <Container style={{ margin: '100px auto auto auto', width: '60%' }}>
      <h1>Add File page</h1>
      <Importer
        assumeNoHeaders={false} // optional, keeps "data has headers" checkbox off by default
        restartable={true} // optional, lets user choose to upload another file when import is complete
        onStart={({ file, preview, fields, columnFields }) => {
        }}
        processChunk={async (rows, { startIndex }) => {
          let row;
          let mark: People;
          for (row of rows) {
            mark = row
            setAddMarker(addItems => [...addItems, mark])
          }
          console.log("added data: ", addItems)
        }}
        onComplete={({ file, preview, fields, columnFields }) => {
          console.log("addedfef data: ", addItems)
        }}
        onClose={({ file, preview, fields, columnFields }) => {
          console.log("added close data: ", addItems)
          if(addItems) {
            addPeopleFromFile(addItems)
              .then( data => {
                setAddMarker([])
                console.log(data)
                router.push('/people/tablepeople')
              })
              .catch(err => console.log(err))
          }
        }}
      >
         <ImporterField name="first_name" label=" First Name" />
         <ImporterField name="last_name" label="Last Name" />
        <ImporterField name="address" label="Address" />
        <ImporterField name="city" label="City" />
         <ImporterField name="address" label="Address" />
        <ImporterField name="province" label="Province" />
        <ImporterField name="postal_code" label="Postal Code" />
        <ImporterField name="rank" label="Rank" />
        <ImporterField name="person_id" label="Person Id" />

     
      </Importer>
      
      <Button
        color="primary"
        outline
        onClick={() => onReturn()}
        style={{margin: '10px'}}
      >
        Return
      </Button>
    </Container>
  )
}

export default AddFilePeople
