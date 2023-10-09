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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CardMedia from '@mui/material/CardMedia';
import { CoffeeImagesService } from "../../../client";
import { Body__create_image_api_v1_coffees__coffee_id__image_post } from "../../../client";

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
  const [image, setImage] = React.useState<File | false>(false);
  const dispatch = useDispatch();

  const addCoffee = async (newCoffee: CoffeeSchema) => {
    const response = await CoffeesService.postCoffeeApiV1CoffeesPost(newCoffee);
    console.log(response);

  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setCoffeeName("");
    setLoading(false);
    setError(false);
    setModalText(false);
    setImage(false);
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

      if (image){

        const imagepost: Body__create_image_api_v1_coffees__coffee_id__image_post = {
          file: image,
        };

      await CoffeeImagesService.createImageApiV1CoffeesCoffeeIdImagePost(props.currentUUID,imagepost);
      }

      setError(false);
      setLoading(true);



      console.log("Submitted " + '"' + coffeeName.trim() + '"');
      setTimeout(() => {

        dispatch(addCoffeeId(props.currentUUID));
        setLoading(false);
        props.closeModal();
        setModalText(false);
        setCoffeeName("");
        setImage(false);

      }, 500);
    } catch (e: unknown) {
      if (e instanceof ApiError) {
        console.log("Add new entry failed:", e.body.detail);
        setLoading(false);
        setModalText(e.body.detail);
      }
    }
  };

  // Event handler for file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return; // If the file is not selected, return
    const file = event.target.files[0]; // Get the first selected file
    setImage(file); // Store the file in the state
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
            {image && <CardMedia component="img" src={URL.createObjectURL(image)}  alt="green iguana" sx={{height: "300px", objectFit: "contain"}} />}
            <Button
              component="label"
              variant="outlined"
              sx={{ marginBottom: "12px" ,}}
              startIcon={<CloudUploadIcon />}

            >
              { !image ?  "Upload file" : "Change file" }
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
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
