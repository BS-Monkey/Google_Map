import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

import { getPoints, addPoint, updatePoint, deletePoint } from '../API'

type Props = {
  visible: boolean
  closePerson: (val: boolean) => void
  updateMarker: (marker: IMarker) => void
}

const Formy2: React.FC<Props> = ({ visible, closePerson,  }) => {
  const [markers, setMarkers] = useState<IMarker[]>([])
  const [visitState, setVisit] = useState<boolean>(false)
  const [listState, setList] = useState<boolean>(false)
  const [selectState, setSelect] = useState<boolean>(false);
  const [personState, setPerson] = useState<boolean>(false);
  const [editData, setEdit] = useState<IMarker>()
  const [selectedList, setSelectedList] = useState<IMarker[]>([])
  const [direction, setDirection] = useState<google.maps.DirectionsResult>()
  const [dirVisible, setDirVisible] = useState<boolean>(false)
  const [addingMarkers, setAddingMarkers] = useState<boolean>(false)
  const [messagesCount, setMessagesCount] = useState<number>(0);


  useEffect(() => {
    setMessagesCount((prev: number) => {
      prev = 0
      markers.map((marker: IMarker) => {
        marker.persons.map((person: IPerson) => {
          prev += person.messages?.length || 0
        })
      })
      return prev
    })
  }, [markers])

  const fetchPoints = (): void => {
    getPoints()
      .then((data) => {
        let markerList: IMarker[] = [];
        markerList = data.map(item => {
          // if (item.visited) {
            var today = new Date()
            var last_visited = new Date(item.last_visited)
            let persons = [...item.persons].map(person => ({...person, color: ''}));

            switch (item.period) {
              case 'daily':
                if (today.getTime() > last_visited.getTime() && today.getDate() !== last_visited.getDate()) {
                  item.visited = !item.visited
                  item.last_visited = new Date()
                  item.persons = persons
                  updateMarker(item)
                }
                break;
              case 'weekly':
                if (today.getDay() === 2) {
                  if (today.getTime() > last_visited.getTime() && today.getDate() !== last_visited.getDate()) {
                    item.visited = !item.visited
                    item.last_visited = new Date()
                    item.persons = persons
                    updateMarker(item)
                  }
                }
                break;
              case 'monthly':
                if (today.getDate() === 1) {
                  if (today.getTime() > last_visited.getTime() && today.getDate() !== last_visited.getDate()) {
                    item.visited = !item.visited
                    item.last_visited = new Date()
                    item.persons = persons
                    updateMarker(item)
                  }
                }
                break;
              default:
                break;
            }
          // }

          return item;
        });
        setMarkers(data);
      })
      .catch((err: Error) => console.log(err))
  }

  const updateMarker = (marker: IMarker) => {
    if (!selectState) {
      if (marker._id === '0') {
        addPoint(marker)
          .then((data) => {
            marker._id = data._id
            setMarkers([...markers, marker])
            visitPoint(marker._id)
          })
          .catch(err => console.log(err))
      } else {
        updatePoint(marker)
          .then((data) => {
            setMarkers((markers: IMarker[]) => markers.map((item: IMarker) => {
              if (item._id === data._id) {
                item = marker
              }
              item.active = false
              return item
            }))
          })
          .catch(err => console.log(err))

        setVisit(false)
      }
    }
  }

  const deleteMarker = (_id: string) => {
    deletePoint(_id)
      .then((data) => {
        setMarkers((markers: IMarker[]) => markers.filter((e) => e._id !== _id))
        setVisit(false)
      })
      .catch(err => console.log(err))
  }

  const visitPoint = (id: string) => {
    if (!selectState) {
      setMarkers((markers: IMarker[]) => markers.map((item: IMarker) => {
        if (item._id === id) {
          item.active = true
          setEdit(item)
        } else {
          item.active = false
        }
        return item
      }))
      setList(false)
      setVisit(true)
    } else {
      let temp_list: IMarker[] = selectedList.filter((item) => item._id === id)
      if (temp_list.length > 0) {
        setSelectedList((selectedList: IMarker[]) => selectedList.filter((item) => item._id !== id))
        setMarkers((markers: IMarker[]) => markers.map((item: IMarker) => {
          if (item._id === id) {
            item.active = false
          }
          return item
        }))
      } else {
        let newItem: IMarker[] = markers.filter((item) => item._id === id)
        setSelectedList((selectedList: IMarker[]) => [...selectedList, ...newItem])
        setMarkers((markers: IMarker[]) => markers.map((item: IMarker) => {
          if (item._id === id) {
            item.active = true
          }
          return item
        }))
      }
    }
  }

  const selectPointByRange = (fromSW: google.maps.LatLng, toNE: google.maps.LatLng) => {
    const selectedPoint: IMarker[] = markers.filter(
      (marker: IMarker) =>
        marker.latitude > fromSW.lat() &&
        marker.latitude < toNE.lat() &&
        marker.longitude > fromSW.lng() &&
        marker.longitude < toNE.lng()
    )
    selectedPoint.forEach((marker: IMarker) => {
      visitPoint(marker._id)
    })
  }

  const drawDirection = (from: google.maps.LatLng, to: google.maps.LatLng, mode: google.maps.TravelMode) => {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: from,
      destination: to,
      travelMode: mode,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        if (result) {
          setDirection(result);
        }
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  const closeVisit = () => {
    setMarkers((markers: IMarker[]) => markers.map((item: IMarker) => {
      item.active = false
      return item
    }))
    setVisit(false)
  }

  const visitList = () => {
    setVisit(false)
    setSelect(false)
    setPerson(false)
    setList(true)
  }

  const visitSelect = () => {
    setVisit(false)
    setList(false)
    setPerson(false)
    setSelect(true)
  }

  const addPerson = () => {
    setVisit(false)
    setSelect(false)
    setList(false)
    setPerson(true)
  }

  const closeSelect = () => {
    setSelect(false)
    setSelectedList([])
    setMarkers((markers: IMarker[]) => (
      markers.map((item: IMarker) => {
        item.active = false
        return item
      })
    ))
    // @ts-ignore
    setDirection(direction => null);
  }

 
  const defaultData = {
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    latitude: '',
    longitude: '',
    occupation: '',
  }
  const [data, setData] = useState(defaultData)

  const handleClose = () => {
    setData(defaultData)
    closePerson(false)
  }

  const handleChange = e => {
    const { name, value } = e.target
    if (
      (name === 'latitude' && (value < -85 || value > 85))
      || (name === 'longitude' && (value < -180 || value > 180))
    ) {
      return
    }
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    const marker: IMarker = {
      _id: '0',
      title: 'New Dot',
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      color: 'red',
      period: 'monthly',
      info_open: true,
      visited: false,
      last_visited: new Date(),
      active: false,
      reserve: false,
      pickDate: new Date(),
      fromTime: new Date(),
      toTime: new Date(),
      persons: [{
        _id: (new Date()).getTime().toString(),
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        address: data.address,
        occupation: data.occupation,
        messages: [],
        color: '',
        messages1: [],
        messages2: [],
      }],
      persons1: [],
      persons2: []
    }
    updateMarker(marker)
  }

  return (
    <>
    
            <React.Fragment>
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Stack spacing={3}>
                  <TextField
                    id="filled-multiline-flexible"
                    label="First name"
                    name="firstname"
                    value={data.firstname}
                    onChange={handleChange}
                    variant="filled"
                  />
                  <TextField
                    id="filled-multiline-flexible"
                    label="Last name"
                    name="lastname"
                    value={data.lastname}
                    onChange={handleChange}
                    variant="filled"
                  />
                  <TextField
                    id="filled-multiline-flexible"
                    label="Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    variant="filled"
                  />
                  <TextField
                    id="filled-multiline-flexible"
                    label="Address"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                    variant="filled"
                  />
                  <TextField
                    id="filled-number"
                    label="Latitude"
                    name="latitude"
                    type="number"
                    value={data.latitude}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        min: -85,
                        max: 85
                      }
                    }}
                    variant="filled"
                  />
                
                  <FormControl fullWidth>
                    <InputLabel id="occupation">Occupation</InputLabel>
                    <Select
                      labelId="occupation"
                      name="occupation"
                      value={data.occupation}
                      label="occupation"
                      onChange={handleChange}
                    >
                      <MenuItem value="engineer">Engineer</MenuItem>
                      <MenuItem value="designer">Designer</MenuItem>
                      <MenuItem value="programmer">Programmer</MenuItem>
                      <MenuItem value="doctor">Doctor</MenuItem>
                      <MenuItem value="teacher">Teacher</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Stack spacing={3}>
                  <TextField
                    id="filled-multiline-flexible"
                    label="First name"
                    name="firstname"
                    value={data.firstname}
                    onChange={handleChange}
                    variant="filled"
                  />
                  <TextField
                    id="filled-multiline-flexible"
                    label="Last name"
                    name="lastname"
                    value={data.lastname}
                    onChange={handleChange}
                    variant="filled"
                  />
                  <TextField
                    id="filled-multiline-flexible"
                    label="Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    variant="filled"
                  />
                  <TextField
                    id="filled-multiline-flexible"
                    label="Address"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                    variant="filled"
                  />
                  <TextField
                    id="filled-number"
                    label="Latitude"
                    name="latitude"
                    type="number"
                    value={data.latitude}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        min: -85,
                        max: 85
                      }
                    }}
                    variant="filled"
                  />
                  <TextField
                    id="filled-number"
                    label="Longitude"
                    name="longitude"
                    type="number"
                    value={data.longitude}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        min: -180,
                        max: 180
                      }
                    }}
                    variant="filled"
                  />
                  <FormControl fullWidth>
                    <InputLabel id="occupation">Occupation</InputLabel>
                    <Select
                      labelId="occupation"
                      name="occupation"
                      value={data.occupation}
                      label="occupation"
                      onChange={handleChange}
                    >
                      <MenuItem value="engineer">Engineer</MenuItem>
                      <MenuItem value="designer">Designer</MenuItem>
                      <MenuItem value="programmer">Programmer</MenuItem>
                      <MenuItem value="doctor">Doctor</MenuItem>
                      <MenuItem value="teacher">Teacher</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleSave}>Save</Button>
            
              </CardActions>
            </React.Fragment>
        
        
   
    </>
  )
}

export default Formy2