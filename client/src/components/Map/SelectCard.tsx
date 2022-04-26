import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button
} from '@mui/material';
import SelectItem from './SelectItem';
import { hoursToMilliseconds } from 'date-fns';

type Props = {
  markers: IMarker[]
  visible: boolean
  dirVisible: boolean
  closeSelect: () => void
  drawDirection: (from: google.maps.LatLng, to: google.maps.LatLng, mode: google.maps.TravelMode) => void
  onDirVisible: (state:boolean) => void
}

type IMarkerItem = {
  index_num: string
  time: string
}

type IValue = {
  realTime: string
  sumTime: string
}

const SelectCard: React.FC<Props> = ({ markers, visible, dirVisible, closeSelect, onDirVisible, drawDirection }) => {
  const [selectMarkers, setSelect] = useState<IMarker[]>([])
  const [state, setState] = useState<IMarkerItem[]>([])
  const [done, setDone] = useState(false)
  const [values, setValues] = useState<IValue[]>([])
  const [mode, setMode] = useState<string>("driving")
  const [serviceResult, setResult] = useState<google.maps.DistanceMatrixResponse>()

  useEffect(() => {
    setDone(false)
    console.log("setDone false")
    let buf_state: IMarkerItem[] = [];
    let buf_values: IValue[] = []
    let valueItem: IValue = { realTime: "", sumTime: ""}
    for (let i = 0; i < markers.length; i++) {
      let stateItem: IMarkerItem = {index_num: i.toString(), time: '0'};
      buf_state.push(stateItem)
      if(i > 0) {
        buf_values.push(valueItem)
      }
    }
    setState(buf_state)
    setValues(buf_values)
    setSelect(markers);
  }, [markers])

  useEffect(() => {
    if(serviceResult && done) {
      console.log("handleChangeValues from useEffect")
      handeChangeValues(serviceResult)
    }
  }, [state])

  const handleChange = (num: number, field: string, value: string): void => {
    setState((state: IMarkerItem[]) => state.map((item: IMarkerItem, index) => {
      if(index === num) {
        if(field === 'index_num') {
          item.index_num = value
        } else {
          item.time = value
        }
      }
      return item
    }))
    
  };

  const handeChangeValues = (result: google.maps.DistanceMatrixResponse) => {
    if(result) {
      let valueTemp: IValue[] = []
      let realTime: number = 0, sumTime: number = 0
      for (let i = 0; i < selectMarkers.length-1; i++) {
        const origin_index = Number(state[i].index_num)
        const des_index = Number(state[i+1].index_num)
        let realStr: string, sumStr:string
        let hourStr: string = "", minStr:string = ""

        realTime = Math.round((Number(result?.rows[origin_index].elements[des_index].duration.value) + Number(state[i].time) * 60)/60)
        sumTime += realTime

        console.log("distance value: ", i, " : ", result?.rows[origin_index].elements[des_index].duration)

        if(Math.floor(realTime/60) > 1) { 
          hourStr = Math.floor(realTime/60).toString() + " hrs "
        } else if (Math.floor(realTime/60) === 1) {
          hourStr = Math.floor(realTime/60).toString() + " hr "
        }
        console.log("hourStr: ", i, hourStr)
        if((realTime%60) === 1) {
          minStr = (realTime%60).toString() + " min "
        } else if ((realTime%60) > 1) {
          minStr = (realTime%60).toString() + " mins "
        } else if (Math.floor(realTime/60) === 0) {
          minStr = "0 min"
        }
        console.log("minStr: ", i, minStr)
        realStr = hourStr + minStr

        if(Math.floor(sumTime/60) > 1) { 
          hourStr = Math.floor(sumTime/60).toString() + " hrs "
        } else if (Math.floor(sumTime/60) === 1) {
          hourStr = Math.floor(sumTime/60).toString() + " hr "
        }
        if((sumTime%60) === 1) {
          minStr = (sumTime%60).toString() + " min "
        } else if ((sumTime%60) > 1) {
          minStr = (sumTime%60).toString() + " mins "
        }else if (Math.floor(sumTime/60) === 0) {
          minStr = "0 min"
        }
        sumStr = hourStr + minStr


        const valueItem: IValue = { 
          realTime: realStr,
          sumTime: sumStr
        }
        valueTemp.push(valueItem)
      }
      setValues(valueTemp)
      console.log("value list: ", valueTemp)
      console.log("state data: ", state)
      console.log("result data: ", result)
    }
  }

  const handleChangeMode = (value: string) => {
    setMode(value);
  };

  const onDrawDirection = () => {
    onDirVisible(true)
    let travel_mode: google.maps.TravelMode = google.maps.TravelMode.DRIVING
    switch (mode) {
      case 'bicycling':
        travel_mode = google.maps.TravelMode.BICYCLING
        break;
      case 'driving':
        travel_mode = google.maps.TravelMode.DRIVING
        break;
      case 'walking':
        travel_mode = google.maps.TravelMode.WALKING
        break;
      default:
        travel_mode = google.maps.TravelMode.DRIVING
        break;
    }
    drawDirection(
      new google.maps.LatLng(selectMarkers[0].latitude, selectMarkers[0].longitude),
      new google.maps.LatLng(selectMarkers[1].latitude, selectMarkers[1].longitude),
      travel_mode
    )
  }

  const handleClose = () => {
    closeSelect()
  }

  const handleDone = () => {
    const DistanceMatrixService  = new google.maps.DistanceMatrixService ();
    let pointArray: google.maps.LatLng[] = selectMarkers.map(
      (item: IMarker) => new google.maps.LatLng(item.latitude, item.longitude)
    );

    DistanceMatrixService.getDistanceMatrix({
      origins: pointArray,
      destinations: pointArray,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DistanceMatrixStatus.OK) {
        if(result) {
          setResult(result)
          handeChangeValues(result)
        }
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
    setDone(true)
  }

  return (
    <>
      { visible && (
        <Box sx={{ 
          width: '100%'
        }}>
          <Card variant="outlined">
            <React.Fragment>
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
              { (selectMarkers.length > 0) ? (
                <>
                  { selectMarkers.map((marker: IMarker, index: number) =>{
                    if (index > 0) {
                      return (
                        <SelectItem 
                          key={index}
                          dotNum={state[index].index_num}
                          visitTime={state[index].time}
                          calculated={done}
                          indexItem={index}
                          realTime={values[index-1].realTime}
                          sumTime={values[index-1].sumTime}
                          mode={mode}
                          markers={selectMarkers}
                          handleChangeMode={handleChangeMode}
                          handleChange={handleChange}
                        />
                      )
                    } else {
                      return (
                        <SelectItem 
                          key={index}
                          dotNum={state[index].index_num}
                          visitTime={state[index].time}
                          calculated={done}
                          indexItem={index}
                          realTime=""
                          sumTime=""
                          mode={mode}
                          markers={selectMarkers}
                          handleChangeMode={handleChangeMode}
                          handleChange={handleChange}
                        />
                      )
                    }
                  }
                  )}
                </>
              ) : (
                <p>Select Locations</p>
              )}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleClose}>Close</Button>
                {(selectMarkers.length > 0 && !done) && (
                  <Button size="small" onClick={handleDone}>Done</Button>
                )} 
                {(selectMarkers.length > 0 && done) && (
                  <Button size="small" disabled onClick={handleDone}>Done</Button>
                )}
                {(selectMarkers.length === 2 && done) && (
                  <Button size="small" onClick={onDrawDirection}>Direction</Button>
                )}
              </CardActions>
            </React.Fragment>
          </Card>
        </Box>
      )}
    </>
  )
}

export default SelectCard