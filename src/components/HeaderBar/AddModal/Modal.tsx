import React from "react";
import { CoffeesService, Coffee as CoffeeSchema } from "../../../client";
import { addCoffeeId } from "../../../redux/CoffeeIdsReducer";
import { useDispatch } from "react-redux";
import { ApiError } from "../../../client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import DialogContentText from "@mui/material/DialogContentText";

interface Props {
  closeModal: () => void;
  open: boolean;
  currentUUID: string;
}

const AddModal: React.FC<Props> = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState<string | boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [coffeeName, setCoffeeName] = React.useState<string>("");
  const dispatch = useDispatch();

  const addCoffee = async (newCoffee: CoffeeSchema) => {
    const response = await CoffeesService.postCoffeeApiV1CoffeesPost(newCoffee);
    console.log(response);

    dispatch(addCoffeeId(response._id));
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setCoffeeName("");
    setLoading(false);
    setError(false);
    setModalText(false);
    props.closeModal();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (coffeeName === "") {
      setError(true);
      return;
    }

    try {
      await addCoffee({ _id: props.currentUUID, name: coffeeName.trim() });

      setError(false);
      setLoading(true);
      setModalText(false);
      setCoffeeName("");

      console.log("Submitted " + '"' + coffeeName.trim() + '"');
      setTimeout(() => {
        setLoading(false);
        props.closeModal();
      }, 500);
    } catch (e: unknown) {
      if (e instanceof ApiError) {
        console.log("Add new entry failed:", e.body.detail);
        setLoading(false);
        setModalText(e.body.detail);
      }
    }
  };

  const handleCoffeeInputNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCoffeeName(e.target.value);
    if (error) {
      setError(false);
    }
    if (modalText) {
      setModalText(false);
    }
  };

  return (
    <>
      <Dialog fullWidth open={props.open} onClose={handleCancel}>
        <DialogTitle>Add Coffee</DialogTitle>
        <DialogContent className="dialog-content">
          <Box
            noValidate
            component="form"
            id="add-coffee"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              required
              error={error}
              helperText={error && "Enter coffee name"}
              fullWidth
              id="coffee-name"
              value={coffeeName}
              onChange={handleCoffeeInputNameChange}
              label="Coffee Name"
            />
            {modalText && (
              <DialogContentText
                sx={{ color: "warning.main", paddingTop: "4px" }}
              >
                {modalText}
              </DialogContentText>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "warning.main" }} onClick={handleCancel}>
            Cancel
          </Button>
          <LoadingButton
            loading={loading}
            type="submit"
            endIcon={<SendIcon />}
            form="add-coffee"
            variant="outlined"
            loadingPosition="end"
          >
            {" "}
            <span>Send</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AddModal;
