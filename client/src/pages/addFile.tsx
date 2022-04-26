import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router'
import { Importer, ImporterField } from 'react-csv-importer';
import 'react-csv-importer/dist/index.css';
import {
  Container,
  Button
} from 'reactstrap'
import { addFromFile } from '../API'

const AddFile = () => {
  const [addItems, setAddMarker] = useState<Location[]>([])
  const router = useRouter()

  const onReturn = () => {
    router.push('/table')
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
          let mark: Location;
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
            addFromFile(addItems)
              .then( data => {
                setAddMarker([])
                console.log(data)
                router.push('/table')
              })
              .catch(err => console.log(err))
          }
        }}
      >
         <ImporterField name="title" label="title" />
         <ImporterField name="latitude" label="Latitude" />
        <ImporterField name="longitude" label="Longitude" />
        <ImporterField name="address" label="Address" />
        <ImporterField name="city" label="City" />
         <ImporterField name="province" label="Province" />
        <ImporterField name="postal_code" label="Postal Code" />
        <ImporterField name="location_id" label="Location Id" />
    
     
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

export default AddFile
