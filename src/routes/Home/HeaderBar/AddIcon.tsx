import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import React from "react";
import AddModal from "./AddCoffeeModal";
import { uuidv7 } from "uuidv7";

const AddIcon = () => {
  const [active, setActive] = React.useState(false);
  const [currentUUID, setUUID] = React.useState<string>("");

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
      <>
        <IconButton
          color="primary"
          onClick={activateModal}
          aria-label="add-modal"
          data-testid="add-modal-button"
        >
          <AddOutlinedIcon />
        </IconButton>

        <AddModal
          open={active}
          closeModal={closeModal}
          currentUUID={currentUUID}
        />
      </>
    </>
  );
};

export default AddIcon;
