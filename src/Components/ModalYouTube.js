import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ReactPlayer from "react-player";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '80%',
  height:'70%',
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,

};

export default function BasicModal({ open, setOpen,trailerId}) {
  //   const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={styles}>
        <ReactPlayer controls width='100%' height='100%' url={`https://www.youtube.com/watch?v=${trailerId}`} />
        </Box>
      </Modal>
    </div>
  );
}
