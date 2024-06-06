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
import { useSearchParams } from "react-router-dom";
import { InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { useContext } from "react";
import { AddRatingToCoffeeContext } from "../Board/Board";
import { uuidv7 } from "uuidv7";
import useClientService from "../../hooks/useClientService";
import { RatingsService, Rating as CoffeeBrewRating } from "../../client";

interface Props {
  close: () => void;
}

interface Params {
  coffeeId?: string;
  coffeeName?: string;
  roastingCompany?: string;
  brewingMethod?: string;
  brewingRating?: string;
}

const brewingMethod = ["Espresso", "Capuccino", "Latte", "Americano"];

const RatingDialogContent = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const [callClientServiceMethod] = useClientService();

  const addRatingToCoffee = useContext(AddRatingToCoffeeContext);

  const currentUuid = uuidv7();

  const coffeeId: string = searchParams.get("coffeeId") ?? "";
  const coffeeName: string = searchParams.get("coffeeName") ?? "";
  const roastingCompany: string = searchParams.get("roastingCompany") ?? "";
  const method: string = searchParams.get("brewingMethod") ?? "";
  const rating: string = searchParams.get("brewingRating") ?? "";

  const setParams = ({
    brewingMethod = method,
    brewingRating = rating,
  }: Params) => {
    setError(null);
    const newParams: Params = {
      coffeeId,
      coffeeName,
      roastingCompany,
      brewingMethod,
      brewingRating,
    };
    setSearchParams(newParams as Record<string, string>);
  };

  const submit = async () => {
    console.log("submit: ", rating);
    setLoading(true);

    if (!rating) {
      setError("Rating is required");
      setLoading(false);
      return;
    }

    try {
      const currentRating: CoffeeBrewRating = {
        _id: currentUuid,
        coffee_id: coffeeId,
        rating: parseFloat(rating),
      };
      addRatingToCoffee(currentRating);

      await callClientServiceMethod({
        function:
          RatingsService.createCoffeeRatingApiV1CoffeesCoffeeIdRatingsPost,
        rethrowError: true,
        args: [currentRating.coffee_id, currentRating],
      });

      setTimeout(() => {
        setLoading(false);
        props.close();
      }, 1000);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
        setLoading(false);
        setError(e.message);
      }
    }
  };

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
            src={"/rating-image.jpg"}
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
