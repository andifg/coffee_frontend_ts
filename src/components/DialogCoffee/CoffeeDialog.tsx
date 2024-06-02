import React from "react";
import Dialog from "@mui/material/Dialog";
import { MobileWebFork } from "../MobileWebFork/MobileWebFork";
import { Drawer } from "@mui/material";
import { CoffeeDialogContent } from "./CoffeeDialogContent";

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

const CoffeeDialog: React.FC<Props> = (props: Props) => {
  return (
    <>
      <MobileWebFork
        webChild={
          <Dialog
            children={
              <CoffeeDialogContent
                open={props.open}
                title={props.title}
                handleCancel={props.handleCancel}
                imageURL={props.imageURL}
                handleSubmit={props.handleSubmit}
                setError={props.setError}
                error={props.error}
                coffeeName={props.coffeeName}
                roastingCompany={props.roastingCompany}
                loading={props.loading}
                setLoading={props.setLoading}
              />
            }
            fullWidth
            open={props.open}
            onClose={props.handleCancel}
          />
        }
        mobileChild={
          <Drawer
            anchor="left"
            open={props.open}
            PaperProps={{ sx: { height: "100vh", width: "100vw" } }}
          >
            <div
              style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CoffeeDialogContent
                open={props.open}
                title={props.title}
                handleCancel={props.handleCancel}
                imageURL={props.imageURL}
                handleSubmit={props.handleSubmit}
                setError={props.setError}
                error={props.error}
                coffeeName={props.coffeeName}
                roastingCompany={props.roastingCompany}
                loading={props.loading}
                setLoading={props.setLoading}
              />
            </div>
          </Drawer>
        }
      />
    </>
  );
};
export default CoffeeDialog;
