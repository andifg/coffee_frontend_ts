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
import { createDataURL } from "../../utils/FileReader";
import { Typography } from "@mui/material";
import { MobileWebFork } from "../MobileWebFork/MobileWebFork";
import { Drawer } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";

interface Props {
  editExisting?: boolean;
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
  title: string;
}

interface InputValues {
  roastingCompany: string;
  coffeeName: string;
}

interface InputError {
  roastingCompany: boolean;
  coffeeName: boolean;

}

const CoffeeDialog: React.FC<Props> = (props: Props) => {
  const [imageURL, setImageURL] = React.useState<string | undefined>();
  const [input, setInput] = React.useState<InputValues>({roastingCompany: "", coffeeName: ""});
  const [image, setImage] = React.useState<File | undefined>();
  const [inputError, setInputError] = React.useState<InputError>({roastingCompany: false ,coffeeName: false});

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
      setInputError((prev)=> ({...prev, coffeeName: false}))
    }
  };

  const handleRoastingCompanyInputNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInput({ ...input, roastingCompany: e.target.value });
    if (props.error) {
      props.setError(undefined);
      setInputError((prev)=> ({...prev, roastingCompany: false}))
    }
  }

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
      setInput({ ...input, coffeeName: props.coffeeName, roastingCompany: props.roastingCompany });
    } else {
      setInput({ roastingCompany: "", coffeeName: "" });
    }


  }, [props.imageURL, props.coffeeName, props.open]);

  const dialogContent = (
    <>
      <>
        <div style={{
          display: "flex", 
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "35px"
          }}>
          <IconButton
            sx={{
              // backgroundColor: "white",
              position: "absolute",
              left: "0px",
            }}
            onClick={handleCancel}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography
            variant="overline"
            sx={{ textAlign: "center", fontSize: "0.85rem" }}
            style={{ display: "flex", marginBottom: "0", alignItems: "center", alignSelf: "center"}}
          >
            {" "}
            {props.title}
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
            component="img"
            src={imageURL || "./stock-image2.jpg"}
            alt="green iguana"
            sx={{
              // maxHeight: "300px",
              objectFit: "contain",
            }}
          />

          <div
            style={{
              backgroundColor: "white",
              position: "relative",
              width: "100%",
              bottom: "10px",
              borderRadius: "10px 10px 0 0",
              borderTop: "0.5px solid",
              borderColor: "secondary.main",
            }}
          >
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                display: "flex",
                flexDirection: "column",
                marginTop: "12px",
              }}
            >
              <Button
                component="label"
                variant="outlined"
                // color="text.primary"
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
                sx={{ marginBottom: "15px" }}
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
                sx={{ marginBottom: "15px" }}
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
      <DialogActions
        sx={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "20px",
        }}
      >
        <LoadingButton
          loading={props.loading}
          type="submit"
          form="add-coffee"
          variant="contained"
          loadingPosition="end"
          sx={{ width: "80%" }}
          disabled={!input.coffeeName || !input.roastingCompany}
        >
          {" "}
          <span>{props.editExisting ? "Submit Update" : "Submit Bean"}</span>
        </LoadingButton>
      </DialogActions>
    </>
  );

  return (
    <>
      <MobileWebFork
        webChild={
          <Dialog
            children={dialogContent}
            fullWidth
            open={props.open}
            onClose={handleCancel}
          />
        }
        mobileChild={
          <Drawer anchor="left" open={props.open} sx={{ height: "100vh" }}>
            <div
              style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {dialogContent}
            </div>
          </Drawer>
        }
      />
    </>
  );
};
export default CoffeeDialog;
