import Dialog from "@mui/material/Dialog";
import { MobileWebFork } from "../MobileWebFork/MobileWebFork";
import { Drawer } from "@mui/material";
import { RatingDialogContent } from "./RatingDialogContent";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

type RatingDialogProps = {
  close: () => void;
};

const RatingDialog = (props: RatingDialogProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const show = location.pathname.includes("add-rating");

  const closeDialog = () => {
    props.close();
    navigate(location.pathname.replace("/add-rating", ""));
  };

  return (
    <>
      <MobileWebFork
        webChild={
          <Dialog
            children={<RatingDialogContent close={closeDialog} />}
            fullWidth
            open={show}
            onClose={() => {}}
          />
        }
        mobileChild={
          <Drawer
            anchor="left"
            open={show}
            PaperProps={{ sx: { height: "100%", width: "100%" } }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <RatingDialogContent close={closeDialog} />
            </div>
          </Drawer>
        }
      />
    </>
  );
};
export { RatingDialog };
