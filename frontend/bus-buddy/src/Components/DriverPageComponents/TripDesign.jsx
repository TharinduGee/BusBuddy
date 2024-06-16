import React, { useState } from 'react';
import "./TripDesign.css";
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import axios from 'axios';

import icon2 from "../../Assets/Owner_assests/expenses_icon.png";
import icon from "../../Assets/Owner_assests/income_icon.png";
import Location from "../../Assets/Driver/Location.png";
import ConductorIcon from "../../Assets/Driver/Conductor.png";
import StartTime from "../../Assets/Driver/StartTime.png";
import TimeDelay from "../../Assets/Driver/TimeDelay.png";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const TripViewer = ({ startplace, endplace, conductor, startTime, endTime, status, refId }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      type,
      name: description,
      amount: parseFloat(amount),
      refId
    };

    try {
      const response = await axios.post('http://localhost:8081/api/v1/ledger/addEntry', data);
      console.log('Response:', response.data);
      // Handle success (e.g., show a success message, close the modal, etc.)
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      <div className="trip-container" onClick={handleOpen}>
        {/* Existing trip card code */}
        <div>
          <div>
            <div className="icon-contianer-trip">
              <div className=" d-flex">
                <img style={{ height: 60, width: 60 }} src={Location} alt="Location Icon" />
                <div className="d-flex flex-column">
                  <div className="trip-txt">Start Destination</div>
                  <div className="trip-value">{startplace}</div>
                </div>
              </div>
              <Divider
                className="divider-class"
                orientation="vertical"
                variant="middle"
                color="black"
                sx={{ height: 50, width: "1px", marginLeft: 2, marginRight: 2 }}
                flexItem
              />
              <div className="items-trip d-flex">
                <img style={{ height: 60, width: 60 }} src={Location} alt="Location Icon" />
                <div className="d-flex flex-column">
                  <div className="trip-txt">End Destination</div>
                  <div className="trip-value">{endplace}</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="icon-contianer-trip">
              <div className=" d-flex">
                <img style={{ height: 60, width: 60 }} src={StartTime} alt="Start Time Icon" />
                <div className="d-flex flex-column">
                  <div className="trip-txt">Start Time</div>
                  <div className="trip-value">{startTime}</div>
                </div>
              </div>
              <Divider
                className="divider-class"
                orientation="vertical"
                variant="middle"
                color="black"
                sx={{ height: 50, width: "1px", marginLeft: 9, marginRight: 2 }}
                flexItem
              />
              <div className="items-trip d-flex">
                <img style={{ height: 60, width: 60 }} src={StartTime} alt="Start Time Icon" />
                <div className="d-flex flex-column">
                  <div className="trip-txt">End Time</div>
                  <div className="trip-value">{endTime}</div>
                </div>
              </div>
            </div>
            <div className="icon-contianer-trip">
              <div className=" d-flex">
                <img style={{ height: 60, width: 60 }} src={ConductorIcon} alt="Conductor Icon" />
                <div className="d-flex flex-column">
                  <div className="trip-txt">Conductor</div>
                  <div className="trip-value">{conductor}</div>
                </div>
              </div>
              <Divider
                className="divider-class"
                orientation="vertical"
                variant="middle"
                color="black"
                sx={{ height: 50, width: "1px", marginLeft: 9, marginRight: 2 }}
                flexItem
              />
              <div className="items-trip d-flex">
                <img style={{ height: 60, width: 60 }} src={icon2} alt="Status Icon" />
                <div className="d-flex flex-column">
                  <div className="trip-txt">Status</div>
                  <div className="trip-value">{status}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <h2 id="modal-title">Account</h2>
          <form onSubmit={handleSubmit}>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              displayEmpty
              fullWidth
              required
            >
              <MenuItem value="" disabled>Select Type</MenuItem>
              <MenuItem value="TRANSACTION_TYPE_TICKET_INCOME">Ticket Income</MenuItem>
              <MenuItem value="TRANSACTION_TYPE_TICKET_EXPENSE">Ticket Expense</MenuItem>
              <MenuItem value="TRANSACTION_TYPE_UNSPECIFIED">Unspecified</MenuItem>
              <MenuItem value="TRANSACTION_TYPE_SERVICE">Service</MenuItem>
            </Select>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default TripViewer;
