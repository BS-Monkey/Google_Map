import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import MapComponent from "../components/Map/Map";
import VisitCard from "../components/Map/VisitCard";
import ListCard from "../components/Map/ListCard";
import SelectCard from "../components/Map/SelectCard";
import { getPoints, addPoint, updatePoint, deletePoint } from "../API";
import PersonCard from "../components/Map/PersonCard";
import Persons from "../components/Map/Persons";

const DynamicComponentWithNoSSR = dynamic(() => import("../components/Map/Map"), {
    ssr: false,
});

const Home: NextPage = () => {
    const [markers, setMarkers] = useState<IMarker[]>([]);
    const [visitState, setVisit] = useState<boolean>(false);
    const [listState, setList] = useState<boolean>(false);
    const [selectState, setSelect] = useState<boolean>(false);
    const [personState, setPerson] = useState<boolean>(false);
    const [editData, setEdit] = useState<IMarker>();
    const [selectedList, setSelectedList] = useState<IMarker[]>([]);
    const [direction, setDirection] = useState<google.maps.DirectionsResult>();
    const [dirVisible, setDirVisible] = useState<boolean>(false);
    const [addingMarkers, setAddingMarkers] = useState<boolean>(false);
    const [messagesCount, setMessagesCount] = useState<number>(0);

    useEffect(() => {
        fetchPoints();
    }, []);

    useEffect(() => {
        setMessagesCount((prev: number) => {
            prev = 0;
            markers.map((marker: IMarker) => {
                marker.persons.map((person: IPerson) => {
                    prev += person.messages?.length || 0;
                });
            });
            return prev;
        });
    }, [markers]);

    const fetchPoints = (): void => {
        getPoints()
            .then((data) => {
                setMarkers(data);
            })
            .catch((err: Error) => console.log(err));
    };

    const updateMarker = (marker: IMarker) => {
        if (!selectState) {
            if (marker._id === "0") {
                addPoint(marker)
                    .then((data) => {
                        marker._id = data._id;
                        setMarkers([...markers, marker]);
                        visitPoint(marker._id);
                    })
                    .catch((err) => console.log(err));
            } else {
                updatePoint(marker)
                    .then((data) => {
                        setMarkers((markers: IMarker[]) =>
                            markers.map((item: IMarker) => {
                                if (item._id === data._id) {
                                    item = marker;
                                }
                                item.active = false;
                                return item;
                            })
                        );
                    })
                    .catch((err) => console.log(err));

                setVisit(false);
            }
        }
    };

    const deleteMarker = (_id: string) => {
        deletePoint(_id)
            .then((data) => {
                setMarkers((markers: IMarker[]) => markers.filter((e) => e._id !== _id));
                setVisit(false);
            })
            .catch((err) => console.log(err));
    };

    const visitPoint = (id: string) => {
        if (!selectState) {
            setMarkers((markers: IMarker[]) =>
                markers.map((item: IMarker) => {
                    if (item._id === id) {
                        item.active = true;
                        setEdit(item);
                    } else {
                        item.active = false;
                    }
                    return item;
                })
            );
            setList(false);
            setVisit(true);
        } else {
            let temp_list: IMarker[] = selectedList.filter((item) => item._id === id);
            if (temp_list.length > 0) {
                setSelectedList((selectedList: IMarker[]) => selectedList.filter((item) => item._id !== id));
                setMarkers((markers: IMarker[]) =>
                    markers.map((item: IMarker) => {
                        if (item._id === id) {
                            item.active = false;
                        }
                        return item;
                    })
                );
            } else {
                let newItem: IMarker[] = markers.filter((item) => item._id === id);
                setSelectedList((selectedList: IMarker[]) => [...selectedList, ...newItem]);
                setMarkers((markers: IMarker[]) =>
                    markers.map((item: IMarker) => {
                        if (item._id === id) {
                            item.active = true;
                        }
                        return item;
                    })
                );
            }
        }
    };

    const selectPointByRange = (fromSW: google.maps.LatLng, toNE: google.maps.LatLng) => {
        const selectedPoint: IMarker[] = markers.filter(
            (marker: IMarker) => marker.latitude > fromSW.lat() && marker.latitude < toNE.lat() && marker.longitude > fromSW.lng() && marker.longitude < toNE.lng()
        );
        selectedPoint.forEach((marker: IMarker) => {
            visitPoint(marker._id);
        });
    };

    const drawDirection = (from: google.maps.LatLng, to: google.maps.LatLng, mode: google.maps.TravelMode) => {
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route(
            {
                origin: from,
                destination: to,
                travelMode: mode,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    if (result) {
                        setDirection(result);
                    }
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    };

    const closeVisit = () => {
        setMarkers((markers: IMarker[]) =>
            markers.map((item: IMarker) => {
                item.active = false;
                return item;
            })
        );
        setVisit(false);
    };

    const visitList = () => {
        setVisit(false);
        setSelect(false);
        setPerson(false);
        setList(true);
    };

    const visitSelect = () => {
        setVisit(false);
        setList(false);
        setPerson(false);
        setSelect(true);
    };

    const closeSelect = () => {
        setSelect(false);
        setSelectedList([]);
        setMarkers((markers: IMarker[]) =>
            markers.map((item: IMarker) => {
                item.active = false;
                return item;
            })
        );
        // @ts-ignore
        setDirection((direction) => null);
    };

    return (
        <Box
            sx={{
                my: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {markers && (
                <div id="map">
                    <MapComponent
                        markers={markers}
                        direction={direction}
                        selectState={selectState}
                        drawEvent={selectPointByRange}
                        updateMarker={updateMarker}
                        visitPoint={visitPoint}
                        addingMarkers={addingMarkers}
                    />
                    <div id="selectbtn">
                        <div className="flex justify-center bg-white p-2 rounded w-230">
                            <button onClick={visitList}>
                                <p>
                                    <GroupAddIcon /> Contact List
                                </p>
                            </button>
                        </div>
                        <div className="flex justify-center bg-white p-2 rounded mt-1">
                            <button onClick={visitSelect}>
                                <p>
                                    <DirectionsCarFilledIcon />
                                    Plan Visits
                                </p>
                            </button>
                        </div>
                    </div>
                    <div id="visitcard">{editData && <VisitCard visible={visitState} data={editData} closeVisit={closeVisit} updateMarker={updateMarker} deleteMarker={deleteMarker} />}</div>

                    <div id="listcard">
                        <ListCard markers={markers} visible={listState} closeList={setList} />
                    </div>

                    <div id="selectcard">
                        <SelectCard markers={selectedList} visible={selectState} dirVisible={dirVisible} closeSelect={closeSelect} drawDirection={drawDirection} onDirVisible={setDirVisible} />
                    </div>

                    <div id="persons">
                        <Persons visible={visitState} data={editData} updateMarker={updateMarker} />
                    </div>
                </div>
            )}
        </Box>
    );
};

export default Home;
