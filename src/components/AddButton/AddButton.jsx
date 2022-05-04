import { CloudUpload, CreateNewFolder } from "@mui/icons-material";
import React, { useState } from "react";
import ModalComponent from "../Modal/ModalComponent";
import "./AddButton.scss";

export default function AddButton() {
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);

  const actionToggle = () => {
    setOpenAction(!openAction);
    var action = document.querySelector(".action");
    action.classList.toggle("active");
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="action" onClick={actionToggle}>
        <span className={openAction ? "rotate" : ""}>+</span>
        <ul>
          <li id="folder" onClick={() => setOpen(true)}>
            <CreateNewFolder className="icon" fontSize="large" />
            <p>Create new folder</p>
          </li>
          <li>
            <label htmlFor="fileup" className="fileup-label">
              <CloudUpload className="icon" fontSize="large" />
              <p>Upload File</p>
            </label>
            <input type="file" id="fileup" className="file-up" />
          </li>
        </ul>
      </div>
      <ModalComponent open={open} handleclose={handleClose} />
    </>
  );
}

// export default function BasicPopover() {
//     const [anchorEl, setAnchorEl] = React.useState(null);

//     const handleClick = (event) => {
//       setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//       setAnchorEl(null);
//     };

//     const open = Boolean(anchorEl);
//     const id = open ? 'simple-popover' : undefined;

//     return (
//       <div>
//         <Button aria-describedby={id} variant="contained" onClick={handleClick}>
//           Open Popover
//         </Button>

//       </div>
//     );
//   }
