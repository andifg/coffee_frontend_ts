import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import React from "react";
import AddModal from "./AddModal/AddCoffeeModal";
import { uuidv7 } from "uuidv7";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/index";

const AddIcon = () => {
  const [active, setActive] = React.useState(false);
  const [currentUUID, setUUID] = React.useState<string>("");

  const userRole = useSelector((state: RootState) => state.userRole.userRole);

  const activateModal = () => {
    console.log("Clicked add button");
    setUUID(uuidv7());
    setActive(true);
  };

  const closeModal = () => {
    console.log("Clicked cancel button");
    setActive(false);
  };

  return (
    <>
      {userRole === "Admin" && (
        <>
          <IconButton
            color="primary"
            onClick={activateModal}
            aria-label="add-modal"
          >
            <AddOutlinedIcon />
          </IconButton>

          <AddModal
            open={active}
            closeModal={closeModal}
            currentUUID={currentUUID}
          />
        </>
      )}
    </>
  );
};

export default AddIcon;
