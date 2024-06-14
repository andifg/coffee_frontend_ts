import "./CoffeeDialogContent.scss";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogContentText from "@mui/material/DialogContentText";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import { useCoffeeDialogContent } from "./useCoffeeDialogContent";

interface Props {
  open: boolean;
  handleCancel: () => void;
  handleSubmit: (
    coffeeName: string,
    roasting_company: string,
    image: File,
  ) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  imageURL: string | undefined;
  error: string | undefined;
  coffeeName: string | undefined;
  roastingCompany: string | undefined;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}

const CoffeeDialogContent = (props: Props) => {
  const [
    imageURL,
    input,
    inputError,
    handleCoffeeInputNameChange,
    handleRoastingCompanyInputNameChange,
    handleSubmit,
    handleCancel,
    handleFileChange,
  ] = useCoffeeDialogContent(props);

  return (
    <>
      <>
        <div className="coffee-dialog-title">
          <IconButton
            className="coffee-dialog-title-back-button"
            onClick={handleCancel}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="overline" className="coffee-dialog-title-text">
            {props.title || "Add Coffee"}
          </Typography>
        </div>
      </>

      <DialogContent className="dialog-content" sx={{ padding: "0px" }}>
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
          <CardMedia
            className="coffee-dialog-image"
            component="img"
            src={imageURL || "./stock-image2.jpg"}
            alt="green iguana"
          />

          <div
            className="coffee-dialog-fields-area"
            style={{
              borderColor: "secondary.main",
            }}
          >
            <div className="coffee-dialog-fields-wrapper">
              <Button
                component="label"
                variant="outlined"
                sx={{
                  marginBottom: "15px",
                  color: "text.primary",
                  borderColor: "text.primary",
                }}
                startIcon={<CloudUploadIcon />}
              >
                {!props.imageURL ? "Upload Image" : "Change Image"}
                <input
                  type="file"
                  hidden
                  data-testid="upload-file"
                  onChange={handleFileChange}
                />
              </Button>
              <TextField
                required
                error={inputError.coffeeName ? true : false}
                InputLabelProps={{ sx: { color: "text.primary" } }}
                fullWidth
                id="coffee-name"
                inputProps={{ "data-testid": "coffee-name-input" }}
                value={input.coffeeName}
                className="coffee-dialog-text-input"
                onChange={handleCoffeeInputNameChange}
                label="Coffee Name"
              />
              <TextField
                required
                error={inputError.roastingCompany ? true : false}
                InputLabelProps={{ sx: { color: "text.primary" } }}
                fullWidth
                id="roasting-company"
                inputProps={{ "data-testid": "coffee-name-input" }}
                value={input.roastingCompany}
                className="coffee-dialog-text-input"
                onChange={handleRoastingCompanyInputNameChange}
                label="Roasting Company"
              />
              {props.error && (
                <DialogContentText
                  sx={{ color: "warning.main", paddingTop: "4px" }}
                >
                  {props.error}
                </DialogContentText>
              )}
            </div>
          </div>
        </Box>
      </DialogContent>
      <DialogActions className="coffee-dialog-actions">
        <LoadingButton
          loading={props.loading}
          type="submit"
          form="add-coffee"
          variant="contained"
          sx={{ width: "80%" }}
          disabled={!input.coffeeName || !input.roastingCompany}
        >
          <span>{props.title ? "Submit Update" : "Submit Bean"}</span>
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export { CoffeeDialogContent };
