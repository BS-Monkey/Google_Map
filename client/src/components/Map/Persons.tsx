import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Modal,
  TextField,
} from '@mui/material';
import { Button } from '../ui';
import Link from 'next/link';

import Slider from 'react-slick';
import {
  Apartment,
  CalendarMonth,
  Cloud,
  Group,
  Person,
} from '@mui/icons-material';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import HandshakeIcon from '@mui/icons-material/Handshake';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import AddTaskIcon from '@mui/icons-material/AddTask';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import FaxIcon from '@mui/icons-material/Fax';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import styled from 'styled-components';

const Wave = styled.div`
  font-size: 90px;
  color: red;
`;
const Wave1 = styled.div`
  font-size: 21px;
  margin-top: -63px;
  font-weight: 600;
  color: black;
`;

const UserCard = styled.div`
  background-color: white;
  height: 350px;
  width: 360px;
  border-radius: 5px;
`;

type Props = {
  visible: boolean;
  data: IMarker;
  updateMarker: Function;


};



const Persons: React.FC<Props> = ({ visible, data, updateMarker }) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModal1, setOpenModal1] = useState<boolean>(false);
  const [openModal2, setOpenModal2] = useState<boolean>(false);
  const [personIndex, setPersonIndex] = useState<number>(null);
  const [name, setName] = useState<string>('');
  const [modelTitle, setModelTitle] = useState('Add New Impression');
  const [personsWithGreenIcons, setPersonsWithGreenIcons] = useState<string[]>([]);

  useEffect(() => {
    const activeIntervals = JSON.parse(localStorage.getItem('activeIntervals') || '{}');

    for(const personId in activeIntervals) {
      if(Date.now() > activeIntervals[personId]) {
        setPersonsWithGreenIcons(persons => [...persons, personId]);
      } else {
        setTimeout(() => {
          setPersonsWithGreenIcons(persons => [...persons, personId]);
        }, activeIntervals[personId] - Date.now());
      }
    }
  }, []);

  useEffect(() => {
    setModelTitle;
  });

  useEffect(() => setName(''), [openModal]);

  const handleClick = (i: number) => () => {
    setOpenModal(true);
    setPersonIndex(i);
  };
  const handleClick1 = (i: number) => () => {
    setOpenModal1(true);
    setPersonIndex(i);
  };
  const handleClick2 = (i: number) => () => {
    setOpenModal2(true);
    setPersonIndex(i);
  };

  const handleSave = () => {
    if (!name) return;
    data.persons[personIndex].messages.push({ name });
    data.persons[personIndex].color = 'messaged';
    updateMarker(data);
    setOpenModal(false);
  };

  const icon =
    data?.persons?.length > 1 ? (
      <Apartment fontSize="large" style={{ marginRight: 10 }} />
    ) : (
      <Person fontSize="large" style={{ marginRight: 10 }} />
    );

  return (
    <Box sx={{ width: '100%' }} className={visible ? 'slide-in' : 'slide-out'}>
      <Slider {...settings}>
        {data?.persons?.map((person, i) => (
          <Box key={i} className="person-slider">
            <Box display="flex" alignItems="center" className={person.color}>
              <UserCard>
                <div className="flex justify-center ...">
                  <div>
                    {' '}
                    <Wave style={{ color: personsWithGreenIcons.includes(person._id) ? 'green' : 'red' }}>
                      <span className="fa-layers fa-fw">
                        <i className="fa-solid fa-circle-user"></i>
                        <span
                          className="fa-layers-text fa-inverse"
                          data-fa-transform="shrink-8 down-3"
                        >
                          <Wave1>{person.rank}</Wave1>
                        </span>
                      </span>
                    </Wave>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className=" -mt-10 text-center">
                    <p className="mt-10 text-center text-xs">ID: {person._id}</p>
                    <h4>
                      {person.first_name} {person.last_name}
                    </h4>
                    <p className="-mt-6 font-bold">tester</p>
                    <p className="-mt-3 leading-4 text-xs ">
                      {person.address} <br/>
                      {person.city} <br/>
                      {person.province}
                    </p>
                    <p className="text-xs">
                      <i className="fa-solid fa-diamond-turn-right"></i>
                      <a
                        href="https://www.google.ca/maps/@43.6494508,-79.3839847,13z"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Directions {person.address}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex justify-center -mt-3">
                  <div className="  text-center">
                    <p className="pb-2 font-bold">IMPRESSIONS: 0</p>
                  </div>
                </div>

                <div className="flex justify-center -mt-2">
                <div className="bg-slate-300 m-2 rounded">
                    {' '}
                    <IconButton onClick={handleClick(i)}>
                      <Group fontSize="small"/>
                    </IconButton>
                  </div>
                  <div className="bg-slate-300 m-2 rounded">
                    <IconButton onClick={handleClick1(i)}>
                      <Cloud fontSize="small"/>
                    </IconButton>
                  </div>
                  <div className="bg-slate-300 m-2 rounded">
                    {' '}
                    <IconButton onClick={handleClick2(i)}>
                      <CalendarMonth fontSize="small"/>
                    </IconButton>
                  </div>
                </div>
              </UserCard>
            </Box>
          </Box>
        ))}
      </Slider>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="person-modal"
      >
        <Card>
          <div className="bg-black text-white text-center  justify-center pb-1">
            <h6 className="text-center">{modelTitle}</h6>
          </div>
          <div className="p-2">
            <div className="flex justify-center pb-1">
              <div className="pr-4 pb-2">
                <Group fontSize="large" />
              </div>{' '}
              <div>
                <h3>Live</h3>
              </div>
            </div>
            <div className="pl-2 pr-2 pb-1">
              {' '}
              <Button
                variant="impresbtn"
                type="submit"
                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
              >
                <div className="pr-2">
                  <HandshakeIcon fontSize="small" />
                </div>{' '}
                <div><Link href={`forms/form-one?person_id=${data?.persons[personIndex]?._id}`}>F2F Call</Link></div>
              </Button>
            </div>
            <div className="pl-2 pr-2 pb-1">
              {' '}
              <Button
                variant="impresbtn"
                type="submit"
                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
              >
                <div className="pr-2">
                  {' '}
                  <AssuredWorkloadIcon fontSize="small" />{' '}
                </div>{' '}
                <div>OLA</div>
              </Button>
            </div>
            <div className="pl-2 pr-2 pb-1">
              {' '}
              <Button
                variant="impresbtn"
                type="submit"
                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
              >
                <div className="pr-2">
                  <RestaurantIcon fontSize="small" />{' '}
                </div>{' '}
                <div>LnL</div>
              </Button>
            </div>
            <div className="pl-2 pr-2 pb-1">
              <Button
                variant="impresbtn"
                type="submit"
                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
              >
                <div className="pr-2">
                  <MedicationLiquidIcon fontSize="small" />{' '}
                </div>{' '}
                <div> Sample Drop </div>
              </Button>
            </div>
            <div className="pl-2 pr-2 pb-1">
              <Button
                variant="impresbtn"
                type="submit"
                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
              >
                <div className="pr-2">
                  <MenuBookIcon fontSize="small" />
                </div>{' '}
                <div>Lit Drop</div>
              </Button>
            </div>
          </div>

          {/* <CardContent>
            <TextField
              label="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              variant="filled"
            />
          </CardContent> */}
          {/* <CardActions>
            <Button  onClick={handleSave}>Save</Button>
            <Button onClick={() => setOpenModal(false)}>Close</Button>
          </CardActions>*/}
        </Card>
      </Modal>
      <Modal
        open={openModal1}
        onClose={() => setOpenModal1(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="person-modal"
      >
        <Card>
          <div className="bg-black text-white text-center pb-1">
            <h6>{modelTitle}</h6>
          </div>
          <div className="p-2">
            <div className="flex justify-center pb-1">
              <div className="pr-4 pb-2">
                <Cloud fontSize="large" />
              </div>{' '}
              <div>
                <h3>Virtual</h3>
              </div>
            </div>
            <div className="pl-2 pr-2 pb-1">
              {' '}
              <Button
                variant="impresbtn"
                type="submit"
                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
              >
                <div className="pr-2">
                  <PhoneAndroidIcon fontSize="small" />
                </div>{' '}
                <div>Call</div>
              </Button>
            </div>
            <div className="pl-2 pr-2 pb-1">
              {' '}
              <Button
                variant="impresbtn"
                type="submit"
                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
              >
                <div className="pr-2">
                  <RestaurantIcon fontSize="small" />{' '}
                </div>{' '}
                <div>LnL</div>
              </Button>
            </div>
            <div className="pl-2 pr-2 pb-1">
              {' '}
              <Button
                variant="impresbtn"
                type="submit"
                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
              >
                <div className="pr-2">
                  {' '}
                  <MarkEmailReadIcon fontSize="small" />{' '}
                </div>{' '}
                <div>Email</div>
              </Button>
            </div>

            <div className="pl-2 pr-2 pb-1">
              <Button
                variant="impresbtn"
                type="submit"
                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
              >
                <div className="pr-2">
                  <AttachEmailIcon fontSize="small" />{' '}
                </div>{' '}
                <div> Custom Email </div>
              </Button>
            </div>
            <div className="pl-2 pr-2 pb-1">
              <Button
                variant="impresbtn"
                type="submit"
                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
              >
                <div className="pr-2">
                  <FaxIcon fontSize="small" />
                </div>{' '}
                <div>Fax</div>
              </Button>
            </div>
            <div className="pl-2 pr-2 pb-1">
              {' '}
              <Button
                variant="impresbtn"
                type="submit"
                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
              >
                <div className="pr-2">
                  {' '}
                  <AssuredWorkloadIcon fontSize="small" />{' '}
                </div>{' '}
                <div>OLA</div>
              </Button>
            </div>
            <div className="pl-2 pr-2 pb-1">
              <Button
                variant="impresbtn"
                type="submit"
                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
              >
                <div className="pr-2">
                  <AddTaskIcon fontSize="small" />
                </div>{' '}
                <div>Attempt</div>
              </Button>
            </div>
            <div className="pl-2 pr-2 pb-1">
              <Button
                variant="impresbtn"
                type="submit"
                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
              >
                <div className="pr-2">
                  <PersonalVideoIcon fontSize="small" />
                </div>{' '}
                <div>Zoom Meeting</div>
              </Button>
            </div>
          </div>

          {/* <p>modal2</p>
          <CardContent>
            <TextField
              label="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              variant="filled"
            />
          </CardContent>
          <CardActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={() => setOpenModal1(false)}>Close</Button>
          </CardActions> */}
        </Card>
      </Modal>
      <Modal
        open={openModal2}
        onClose={() => setOpenModal2(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="person-modal"
      >
        <Card>
          <div className="bg-black text-white text-center pb-1">
            <h6>{modelTitle}</h6>
          </div>
          <div className="p-2">
            <div className="flex justify-center pb-1">
              <div className="pr-4 pb-2">
                <CalendarMonth fontSize="large" />
              </div>{' '}
              <div>
                <h3>Schedule</h3>
              </div>
            </div>
            <div className="pl-2 pr-2 pb-1">
              {' '}
              <Button
                variant="impresbtn"
                type="submit"
                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
              >
                <div className="pr-2">
                  <HandshakeIcon fontSize="small" />
                </div>{' '}
                <div>Planned Call</div>
              </Button>
            </div>
            <div className="pl-2 pr-2 pb-1">
              {' '}
              <Button
                variant="impresbtn"
                type="submit"
                className="rounded-md inline-block block w-full border border-gray-400  px-2 py-2 pr-6 rounded shadow   bg-white"
              >
                <div className="pr-2">
                  <CalendarMonthIcon fontSize="small" />{' '}
                </div>{' '}
                <div>Appointment</div>
              </Button>
            </div>
          </div>
          {/* <p>modal3</p>
          <CardContent>
            <TextField
              label="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              variant="filled"
            />
          </CardContent>
          <CardActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={() => setOpenModal2(false)}>Close</Button>
          </CardActions> */}
        </Card>
      </Modal>
    </Box>
  );
};

export default Persons;
