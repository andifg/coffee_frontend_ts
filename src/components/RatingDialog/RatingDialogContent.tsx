import "./RatingDialogContent.scss";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import { DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import { useAddCoffeeBrewRating } from "./useAddCoffeeBrewRating";

interface Props {
  close: () => void;
}

const brewingMethod = [
  "Espresso",
  "Cappuccino",
  "Latte",
  "Americano",
  "Filter",
  "Bialetti",
];

const RatingDialogContent = (props: Props) => {
  const [
    loading,
    error,
    setParams,
    submit,
    coffeeName,
    roastingCompany,
    method,
    rating,
  ] = useAddCoffeeBrewRating(props);

  return (
    <>
      <>
        <div className="rating-dialog-title">
          <IconButton
            className="rating-dialog-title-back-button"
            onClick={props.close}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="overline" className="rating-dialog-title-text">
            {"Add Rating / Coffee Brewing"}
          </Typography>
        </div>
      </>

      <DialogContent className="dialog-content" sx={{ padding: "0px" }}>
        <Box
          noValidate
          component="form"
          id="add-rating"
          onSubmit={() => {}}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            className="rating-dialog-image"
            component="img"
            src={imageURL || "/rating-image.jpg"}
            alt="green iguana"
          />
          <div
            className="rating-dialog-fields-area"
            style={{
              borderColor: "secondary.main",
            }}
          >
            <div className="rating-dialog-fields-wrapper">
              <div className="rating-dialog-coffee-bean-and-roasting-company">
                {coffeeName}
                {" - "}
                {roastingCompany}
              </div>

              <div className="rating-dialog-brewing-method-title">
                Brewing Method
              </div>

              <FormControl sx={{ marginTop: "15px" }}>
                <InputLabel
                  sx={{
                    color: "black",
                    backgroundColor: "white",
                    paddingRight: "2px",
                  }}
                  id="test-select-label"
                >
                  Choose Brewing Method
                </InputLabel>
                <Select
                  inputProps={{ sx: { color: "black" } }}
                  id="test-select-label"
                  value={method}
                  label="Label"
                  onChange={(event: SelectChangeEvent) => {
                    setParams({ brewingMethod: event.target.value });
                  }}
                >
                  {brewingMethod.map((method) => (
                    <MenuItem key={method} value={method}>
                      {method}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div className="rating-dialog-brewing-method-title">
                Overall Rating
              </div>
              <div className="rating-dialog-rating-wrapper">
                <div className="rating-dialog-rating-area">
                  <Rating
                    name="half-rating"
                    sx={{
                      color: "primary.main",
                      marginRight: "4px",
                      alignSelf: "center",
                      fontSize: "45px",
                    }}
                    value={parseFloat(rating)}
                    onChange={(_, newValue) => {
                      if (newValue) {
                        console.log("newValue", newValue);
                        setParams({ brewingRating: newValue.toString() });
                      }
                    }}
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <div className="rating-dialog-rating-number">{rating}</div>
                </div>
              </div>
              {error && <div className="rating-dialog-error">{error}</div>}
            </div>
          </div>
        </Box>
      </DialogContent>
      <DialogActions className="rating-dialog-actions">
        <LoadingButton
          loading={loading}
          type="submit"
          form="add-coffee"
          variant="contained"
          sx={{ width: "80%" }}
          onClick={submit}
        >
          <span>Post Rating / Coffee Brew</span>
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export { RatingDialogContent };
