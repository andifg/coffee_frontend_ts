import React from "react";
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
import CardMedia from "@mui/material/CardMedia";

interface Props {
  open: boolean;
  handleCancel: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCoffeeInputNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  image: File | undefined;
  error: string | undefined;
  coffeeName: string;
  loading: boolean;
  title: string;
}

const CoffeeDialog: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Dialog fullWidth open={props.open} onClose={props.handleCancel}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent className="dialog-content">
          <Box
            noValidate
            component="form"
            id="add-coffee"
            onSubmit={props.handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {props.image && (
              <CardMedia
                component="img"
                src={URL.createObjectURL(props.image)}
                alt="green iguana"
                sx={{ height: "300px", objectFit: "contain" }}
              />
            )}
            <Button
              component="label"
              variant="outlined"
              sx={{ marginBottom: "12px" }}
              startIcon={<CloudUploadIcon />}
            >
              {!props.image ? "Upload file" : "Change file"}
              <input type="file" hidden onChange={props.handleFileChange} />
            </Button>
            <TextField
              required
              error={props.error ? true : false}
              fullWidth
              id="coffee-name"
              value={props.coffeeName}
              onChange={props.handleCoffeeInputNameChange}
              label="Coffee Name"
            />
            {props.error && (
              <DialogContentText
                sx={{ color: "warning.main", paddingTop: "4px" }}
              >
                {props.error}
              </DialogContentText>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "warning.main" }} onClick={props.handleCancel}>
            Cancel
          </Button>
          <LoadingButton
            loading={props.loading}
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
export default CoffeeDialog;
