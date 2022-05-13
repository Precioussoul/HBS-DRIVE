import { createTheme } from "@mui/material";

export const color = {
  primaryColor: "#1a22fc",
  primaryColor2: "#5a65f3",
  primaryColor3: "#dd6353",
  secondaryColor2: "#abb7d8",
  secondaryColor: "#a3a9df",
  whitebgColor: "#ececf2",
  whiteBgColor2: "#f1f3f9",
  textColor: "#514f53",
  grayColor: "#a1a1a6",
  grayColor2: "#7a727f",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: color.primaryColor2,
      light: color.primaryColor,
    },
    secondary: {
      main: color.secondaryColor,
      light: color.secondaryColor2,
    },

    // grayColor: color.grayColor,
    // grayColor2: color.grayColor2,
    // whiteBg: color.whitebgColor,
    // whiteBg2: color.whiteBgColor2,
  },
});

// export const FavorTest = () => {
//   // HINT: each "item" in our list names a name,
//   // a boolean to tell if its been completed, and a quantity
//   const [items, setItems] = useState([
//     { itemName: "item 1", quantity: 1, isSelected: false },
//     { itemName: "item 2", quantity: 3, isSelected: true },
//     { itemName: "item 3", quantity: 2, isSelected: false },
//   ]);

//   const [inputValue, setInputValue] = useState("");
//   const [totalItemCount, setTotalItemCount] = useState(6);

//   const handleAddButtonClick = () => {
//     const newItem = {
//       itemName: inputValue,
//       quantity: 1,
//       isSelected: false,
//     };

//     const newItems = [...items, newItem];

//     setItems(newItems);
//     setInputValue("");
//     calculateTotal();
//   };

//   const handleQuantityIncrease = (index) => {
//     const newItems = [...items];

//     newItems[index].quantity++;

//     setItems(newItems);
//     calculateTotal();
//   };

//   const handleQuantityDecrease = (index) => {
//     const newItems = [...items];

//     newItems[index].quantity--;

//     setItems(newItems);
//     calculateTotal();
//   };

//   const toggleComplete = (index) => {
//     const newItems = [...items];

//     newItems[index].isSelected = !newItems[index].isSelected;

//     setItems(newItems);
//   };

//   const calculateTotal = () => {
//     const totalItemCount = items.reduce((total, item) => {
//       return total + item.quantity;
//     }, 0);

//     setTotalItemCount(totalItemCount);
//   };

//   return (
//     <div className="app-background">
//       <div className="main-container">
//         <div className="add-item-box">
//           <input
//             value={inputValue}
//             onChange={(event) => setInputValue(event.target.value)}
//             className="add-item-input"
//             placeholder="Add an item..."
//           />
//           <FontAwesomeIcon
//             icon={faPlus}
//             onClick={() => handleAddButtonClick()}
//           />
//         </div>
//         <div className="item-list">
//           {items.map((item, index) => (
//             <div className="item-container">
//               <div className="item-name" onClick={() => toggleComplete(index)}>
//                 {item.isSelected ? (
//                   <>
//                     <FontAwesomeIcon icon={faCheckCircle} />
//                     <span className="completed">{item.itemName}</span>
//                   </>
//                 ) : (
//                   <>
//                     <FontAwesomeIcon icon={faCircle} />
//                     <span>{item.itemName}</span>
//                   </>
//                 )}
//               </div>
//               <div className="quantity">
//                 <button>
//                   <FontAwesomeIcon
//                     icon={faChevronLeft}
//                     onClick={() => handleQuantityDecrease(index)}
//                   />
//                 </button>
//                 <span> {item.quantity} </span>
//                 <button>
//                   <FontAwesomeIcon
//                     icon={faChevronRight}
//                     onClick={() => handleQuantityIncrease(index)}
//                   />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="total">Total: {totalItemCount}</div>
//       </div>
//     </div>
//   );
// };
