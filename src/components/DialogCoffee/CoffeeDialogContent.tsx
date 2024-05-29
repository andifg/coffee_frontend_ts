import "./CoffeeDialogContent.scss";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogContentText from "@mui/material/DialogContentText";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CardMedia from "@mui/material/CardMedia";
import heic2any from "heic2any";
import { createDataURL } from "../../utils/FileReader";
import { Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";

interface Props {
  open: boolean;
  handleCancel: () => void;
  handleSubmit: (coffeeName: string, image: File) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  imageURL: string | undefined;
  error: string | undefined;
  coffeeName: string | undefined;
  roastingCompany: string | undefined;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}

interface InputValues {
  roastingCompany: string;
  coffeeName: string;
}

interface InputError {
  roastingCompany: boolean;
  coffeeName: boolean;
}

const CoffeeDialogContent = (props: Props) => {
  const [imageURL, setImageURL] = React.useState<string | undefined>();
  const [input, setInput] = React.useState<InputValues>({
    roastingCompany: "",
    coffeeName: "",
  });
  const [image, setImage] = React.useState<File | undefined>();
  const [inputError, setInputError] = React.useState<InputError>({
    roastingCompany: false,
    coffeeName: false,
  });

  const convertHEICtoPNG = async (file: File): Promise<File> => {
    const startTime = new Date();

    const png = await heic2any({
      blob: file,
      toType: "image/png",
      quality: 0.5,
    });

    const endTime = new Date();
    const elapsedTime = endTime.getTime() - startTime.getTime();

    console.log(`Converted HEIC to PNG in ${elapsedTime} milliseconds`);

    let png_file: File;
    if (png instanceof Blob && Array.isArray(png) === false) {
      png_file = new File([png], "image.png", { type: "image/png" });
      return png_file;
    } else {
      const blob_array = png as Blob[];

      png_file = new File(blob_array, "image.png", { type: "image/png" });
      return png_file;
    }
  };

  const handleCoffeeInputNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInput({ ...input, coffeeName: e.target.value });
    if (props.error) {
      props.setError(undefined);
      setInputError((prev) => ({ ...prev, coffeeName: false }));
    }
  };

  const handleRoastingCompanyInputNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInput({ ...input, roastingCompany: e.target.value });
    if (props.error) {
      props.setError(undefined);
      setInputError((prev) => ({ ...prev, roastingCompany: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Preparing to submit coffee");
    console.log("Image: ", image);

    props.handleSubmit(input.coffeeName, image as File);
  };

  const handleCancel = () => {
    props.handleCancel();
    setInput({ roastingCompany: "", coffeeName: "" });
    props.setError(undefined);
    props.setLoading(false);
    setImage(undefined);
    setImageURL(undefined);
  };

  // Event handler for file input change
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log("File change");
    let file: File;
    if (event.target.files && event.target.files?.length != 0) {
      console.log(event.target.files?.length);
      const filetype = event.target.files[0].type;
      if (filetype === "image/heic") {
        console.log("Converting HEIC to PNG");
        file = await convertHEICtoPNG(event.target.files[0]);
      } else {
        file = event.target.files[0];
      }
      setImage(file);
      setImageURL(await createDataURL(file));
    }
  };

  useEffect(() => {
    // console.log("Rerendering CoffeeDialog");

    if (props.imageURL) {
      setImageURL(props.imageURL);
    } else {
      setImage(undefined);
      setImageURL(undefined);
    }

    if (props.coffeeName && props.roastingCompany) {
      setInput({
        ...input,
        coffeeName: props.coffeeName,
        roastingCompany: props.roastingCompany,
      });
    } else {
      setInput({ roastingCompany: "", coffeeName: "" });
    }
  }, [props.imageURL, props.coffeeName, props.open]);

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
          loadingPosition="end"
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
