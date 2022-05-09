// import { ChevronLeft } from "@mui/icons-material";
// import { Breadcrumbs, Button, Link, Typography } from "@mui/material";
// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { FolderContext } from "../../contexts/FolderContext";
// import { ROOT_FOLDER } from "../../hooks/useFolder";
// // import { withRouter } from "react-router-dom";

// const FolderBreadcrumbs = ({ currentFolder, history, location }) => {
//   let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];

//   if (currentFolder) path = [...path, ...currentFolder.path];

//   const { pathname } = location;

//   const pathnames = pathname.split("/").filter((x) => x);
//   console.log("breadcrumb folder", currentFolder);
//   console.log("path", path);

//   return (
//     <div role="presentation">
//       <Breadcrumbs
//         aria-label="breadcrumb"
//         sx={{
//           flexGrow: 1,
//         }}
//       >
//         {path.map((folder, index) => (
//           <Link
//             key={folder.id}
//             underline="hover"
//             color="text.primary"
//             href={{
//               pathname: folder.id ? `/folder/${folder.id}` : "/",
//             }}
//             aria-current="page"
//           >
//             {folder.name}
//           </Link>
//         ))}

//         {currentFolder && (
//           <Link
//             underline="hover"
//             color="text.primary"
//             href={`/folder/${currentFolder.id}`}
//             aria-current="page"
//           >
//             {currentFolder.name}
//           </Link>
//         )}
//       </Breadcrumbs>
//     </div>
//   );
// };

// export default FolderBreadcrumbs;
