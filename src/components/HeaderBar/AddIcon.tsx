import { PlusCircleOutlined } from "@ant-design/icons";
import React from "react";
import AddModal from "./AddModal/Modal";
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
      <PlusCircleOutlined
        onClick={activateModal}
        className="icon-left"
        style={{
          fontSize: "32px",
        }}
      />
      <AddModal
        open={active}
        closeModal={closeModal}
        currentUUID={currentUUID}
      />
    </>
  );
};

export default AddIcon;
