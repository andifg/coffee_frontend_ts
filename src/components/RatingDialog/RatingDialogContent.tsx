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
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface Props {
  close: () => void;
}

// type CoffeeBeanInfos = {
//   coffeeName?: string;
//   roastingCompany?: string;
//   userName?: string;
// }

// const beans = [{
//   "coffeeName": "Ethiopia",
//   "roastingCompany": "Dinzler",
//   "userName": "anixel"
// }, {
//   "coffeeName": "Ethiopia",
//   "roastingCompany": "Dalmayr",
//   "userName": "ptotheower"
// }]

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
    imageURL,
    handleFileChange,
    loading,
    error,
    setParams,
    submit,
    method,
    rating,
    drinkType,
    beanOptions,
    currentBean,
    handleCoffeeBeanChange,
    fetchBeansForSearchTerm,
  ] = useAddCoffeeBrewRating(props);

  // const [value, setValue] = useState<CoffeeBeanInfos | null>({
  //   coffeeName: coffeeName,
  //   roastingCompany: roastingCompany,
  //   userName: "anixel"

  // });

  // const handleBrewingMethodChange = (_: SyntheticEvent , newValue: CoffeeBeanInfos | null) => {
  //   console.log("new_value", newValue);
  //   setValue(newValue);
  // }

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
            {drinkType === "COFFEE_DRINK"
              ? "Add Coffee Drink"
              : drinkType === "DRINK"
              ? "Add Other Drink"
              : "Add Rating for Coffee Bean"}
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
              <Button
                component="label"
                variant="outlined"
                sx={{
                  color: "text.primary",
                  borderColor: "text.primary",
                }}
                startIcon={<CloudUploadIcon />}
              >
                Add Image
                <input
                  type="file"
                  hidden
                  data-testid="upload-file"
                  onChange={handleFileChange}
                />
              </Button>
              {drinkType === undefined && (
                <div className="rating-dialog-coffee-bean-and-roasting-company">
                  <div className="rating-dialog-brewing-method-title">
                    Coffee Bean
                  </div>
                  {/* {coffeeName}
                  {" - "}
                  {roastingCompany} */}
                  <Autocomplete
                    blurOnSelect
                    options={beanOptions}
                    filterOptions={(x) => x}
                    getOptionLabel={(option) =>
                      `${option.name} - ${option.roasting_company} - ${option.owner_name}`
                    }
                    id="controlled-demo"
                    sx={{ width: "100%" }}
                    value={currentBean}
                    onOpen={() => {
                      fetchBeansForSearchTerm(null);
                    }}
                    onChange={handleCoffeeBeanChange}
                    onInputChange={(_, newInputValue) => {
                      fetchBeansForSearchTerm(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Choose Coffee Bean" />
                    )}
                  />
                </div>
              )}
              {drinkType != "DRINK" && (
                <>
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
                </>
              )}

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
