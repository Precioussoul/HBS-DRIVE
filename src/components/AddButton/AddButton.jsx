import { CloudUpload, CreateNewFolder } from "@mui/icons-material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FolderModal from "../FolderModal/FolderModal";
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

  const { pathname } = useLocation();
  const pathgen = "/";
  return (
    <div className={pathname === pathgen ? "show" : "hide"}>
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
      <FolderModal open={open} handleclose={handleClose} />
    </div>
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
