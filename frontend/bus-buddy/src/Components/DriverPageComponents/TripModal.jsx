import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import axios from "axios";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const TripModal = ({ open, handleClose, refId }) => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      type,
      name: description,
      amount: parseFloat(amount),
      refId,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/v1/ledger/addEntry`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setMessage("Done!");
      } else {
        setMessage("Error: Unexpected response");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <h2 id="modal-title">Add Trip Entry</h2>
        <form onSubmit={handleSubmit}>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            displayEmpty
            fullWidth
            required
            margin="normal"
          >
            <MenuItem value="" disabled>
              Select Type
            </MenuItem>
            <MenuItem value="TRANSACTION_TYPE_TICKET_INCOME">
              Ticket Income
            </MenuItem>
            <MenuItem value="TRANSACTION_TYPE_TICKET_EXPENSE">
              Ticket Expense
            </MenuItem>
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
        {message && (
          <Box mt={2}>
            <p>{message}</p>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default TripModal;
