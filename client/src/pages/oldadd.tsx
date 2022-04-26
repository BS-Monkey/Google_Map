import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Container,
  Card,
  CardSubtitle,
  CardBody,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from 'reactstrap';
import { FormAddPoint, getPeople } from '../API'
import { useRouter } from 'next/router'
import Select from 'react-select';

const Add = () => {
  const [addItem, setAddItem] = useState<IMapper>({
     title:'', longitude: 0, latitude: 0, color:'', persons: []
  })
  const [success, setSuccess] = useState<Boolean>(false)
  const [error, setError] = useState<Boolean>(false);
  const [people, setPeople] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchPeople() {
      const people = await getPeople();

      setPeople(people);
    }

    setAddItem({
      title:'', longitude: 0, latitude: 0, color:'', persons: []
    })

    fetchPeople()
  }, [])
  
  const onAdd = () => {
    if (addItem.title && addItem.longitude && addItem.latitude && addItem.color ) {
      FormAddPoint(addItem)
      .then( data => {
          console.log(data)
          setSuccess(true)
      })
      .catch( err => {
        console.log(err)
      })
    } else {
      setError(true)
    }

    console.log("handleAdd State: ")
  }

  const handleChange = (e: any) => {
    setAddItem({...addItem, [e.target.name]: e.target.value});
  }

  const onCancel = () => {
    router.push('/table')
  }

  const onMain = () => {
    setSuccess(false)
    router.push('/table')
  }

  const onAgain = () => {
    setSuccess(false)
    setAddItem({
      title:'', longitude: 0, latitude: 0, color:'', persons:[],
    })
  }

  return (
    <Container style={{ marginTop: 100, width: '60%' }}>
      <Card
        color="primary"
        inverse
        body
        outline
      >
        <CardBody>
          <CardTitle tag="h5">
            Card title
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            <Alert
              color="info"
              isOpen={false}
              style={{width: '100%', margin:'auto'}}
            >
              Failed! Please fill the form!
              <Button close style={{float: 'right'}} onClick={()=>setError(false)} />
            </Alert>
            <Form className="form">
              <FormGroup row className="row">
                <Label
                  for="firstname"
                  sm={4}
                >
                  title :
                </Label>
                <Col sm={8}>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Title"
                    type="text"
                    value={addItem.title}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
           
             
              <FormGroup row>
                <Label
                  for="latitude"
                  sm={4}
                >
                  Latitude :
                </Label>
                <Col sm={8}>
                  <Input
                    id="latitude"
                    name="latitude"
                    placeholder="Latitude"
                    type="number"
                    value={addItem.latitude}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label
                  for="longitude"
                  sm={4}
                >
                  Longitude :
                </Label>
                <Col sm={8}>
                  <Input
                    id="longitude"
                    name="longitude"
                    placeholder="Longitude"
                    type="number"
                    value={addItem.longitude}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label
                  for="longitude"
                  sm={4}
                >
                  Color :
                </Label>
                <Col sm={8}>
                  <Input
                    id="color"
                    name="color"
                    placeholder="Color"
                    type="text"
                    value={addItem.color}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label
                  for="people"
                  sm={4}
                >
                  People :
                </Label>
                <Col sm={8}>
                <Select
                  defaultValue={addItem.persons}
                  onChange={(people: any) => {
                    setAddItem({ ...addItem, persons: people.map(person => person.value) })
                  }}
                  options={people.map(person => { return { value: person._id, label: person.person_name }})}
                  isMulti={true}
                />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm={4}>
                  <Button
                    color="primary"
                    outline
                    onClick={() => onAdd()}
                    style={{margin: '10px'}}
                  >
                    Add Data
                  </Button>
                </Col>
                <Col sm={4}>
                  <Button
                    color="info"
                    outline
                    onClick={() => onCancel()}
                    style={{margin: '10px'}}
                  >
                    Cancel
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </CardSubtitle>
        </CardBody>
      </Card>
      <Modal
        isOpen={false}
      >
        <ModalBody>
          Data Add Success!
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={()=>onAgain()}
          >
            Add Another Data
          </Button>
          {' '}
          <Button onClick={() =>onMain()}>
            Go to Main
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default Add









