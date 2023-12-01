import React, { useEffect } from "react";
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
import heic2any from "heic2any";

interface Props {
  open: boolean;
  handleCancel: () => void;
  handleSubmit: (coffeeName: string, image: File) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  image: File | undefined;
  error: string | undefined;
  coffeeName: string | undefined;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const CoffeeDialog: React.FC<Props> = (props: Props) => {
  const [imageURL, setImageURL] = React.useState<string | undefined>();
  const [coffeeName, setCoffeeName] = React.useState<string>("");
  const [image, setImage] = React.useState<File | undefined>();

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
    setCoffeeName(e.target.value);
    if (props.error) {
      props.setError(undefined);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Preparing to submit coffee");

    props.handleSubmit(coffeeName, image as File);
  };

  const handleCancel = () => {
    props.handleCancel();
    setCoffeeName("");
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
      setImageURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    console.log("Rerendering CoffeeDialog");

    if (props.image) {
      setImage(props.image);
      setImageURL(URL.createObjectURL(props.image));
    } else {
      setImage(undefined);
      setImageURL(undefined);
    }

    if (props.coffeeName) {
      setCoffeeName(props.coffeeName);
    } else {
      setCoffeeName("");
    }
  }, [props.image, props.coffeeName, props.open]);
  return (
    <>
      <Dialog fullWidth open={props.open} onClose={handleCancel}>
        <DialogTitle>{props.title}</DialogTitle>
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
            {imageURL && (
              <CardMedia
                component="img"
                src={imageURL}
                alt="green iguana"
                sx={{
                  height: "300px",
                  objectFit: "contain",
                  marginBottom: "8px",
                }}
              />
            )}
            <Button
              component="label"
              variant="outlined"
              sx={{ marginBottom: "12px" }}
              startIcon={<CloudUploadIcon />}
            >
              {!props.image ? "Upload file" : "Change file"}
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                onAbort={() => {
                  console.log("Aborted image select");
                }}
              />
            </Button>
            <TextField
              required
              error={props.error ? true : false}
              fullWidth
              id="coffee-name"
              value={coffeeName}
              onChange={handleCoffeeInputNameChange}
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
          <Button sx={{ color: "warning.main" }} onClick={handleCancel}>
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
