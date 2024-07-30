import "./CardWithMedia.scss";
import React, { createContext } from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import { CardSkeleton } from "../CardSkeleton/CardSkeleton";
import { useLoadImageUrl } from "../useLoadImageUrl/useLoadImageUrl";

const UpdateCoffeeImageContext = createContext<(image: File) => void>(() => {});

interface Props {
  cardContent: JSX.Element;
  updateModal?: JSX.Element;
  header: JSX.Element;
  imageFetchUrl: string;
}

const CardWithMedia: React.FC<Props> = (props: Props) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [coffeeImageURL, _, updateImageUrl] = useLoadImageUrl(
    props.imageFetchUrl,
    setLoading,
    true,
  );

  return (
    <>
      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="card-with-media-wrapper">
          <Card
            sx={{
              boxShadow: 0,
              borderRadius: 0,
              border: "1px solid",
              borderColor: "secondary.light",
            }}
            className="card-with-media"
          >
            {props.header}
            <CardMedia
              component="img"
              alt="Image"
              height="auto"
              key={coffeeImageURL}
              src={
                coffeeImageURL ||
                "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              }
              sx={{ objectFit: "contain", maxHeight: "600px" }}
            />
            {props.cardContent}
          </Card>
          <UpdateCoffeeImageContext.Provider value={updateImageUrl}>
            {props.updateModal}
          </UpdateCoffeeImageContext.Provider>
        </div>
      )}
    </>
  );
};

export { CardWithMedia, UpdateCoffeeImageContext };
