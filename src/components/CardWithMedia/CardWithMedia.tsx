import "./CardWithMedia.scss";
import React, { createContext } from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import { CardSkeleton } from "../CardSkeleton/CardSkeleton";

const UpdateCoffeeImageContext = createContext<(image: File) => void>(() => {});

interface Props {
  cardContent: JSX.Element;
  updateModal?: JSX.Element;
  header: JSX.Element;
  imageURL: string;
  loading: boolean;
}

const CardWithMedia: React.FC<Props> = (props: Props) => {
  return (
    <>
      {props.loading ? (
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
              key={props.imageURL}
              src={
                props.imageURL ||
                "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              }
              sx={{ objectFit: "contain", maxHeight: "600px" }}
            />
            {props.cardContent}
          </Card>
        </div>
      )}
    </>
  );
};

export { CardWithMedia, UpdateCoffeeImageContext };
