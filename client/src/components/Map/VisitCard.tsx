import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  FormControlLabel,
  Switch,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Tab,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  Divider,
} from "@mui/material";

import styles from "../../../styles/Home.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  LocalizationProvider,
  MobileDatePicker,
  MobileTimePicker,
  TabContext,
  TabList,
  TabPanel,
} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  visible: boolean;
  data: IMarker;
  closeVisit: (val: boolean) => void;
  updateMarker: (marker: IMarker) => void;
  deleteMarker: (id: string) => void;
};

const AccordionRoot = styled("div")(({ theme }) => ({
  width: "100%",
}));

const VisitCard: React.FC<Props> = ({
  visible,
  data,
  closeVisit,
  updateMarker,
  deleteMarker,
}) => {
  const [state, setState] = useState<IMarker>(data);


  const formInit = () => {
    if (data) {
      setState(data);
    }
  };
  useEffect(formInit, [data]);

  const handleClose = () => {
    closeVisit(false);
  };

  const handleDelete = () => {
    deleteMarker(data._id);
  };

  return (
    <>
      {visible && (
        <div className={styles.locationCard}>
          <div>
            <CloseIcon onClick={handleClose} />

            <div>{data.title}</div>
            <div>{data.location_id}</div>
        
            
          </div>
        </div>
      )}
    </>
  );
};

export default VisitCard;
