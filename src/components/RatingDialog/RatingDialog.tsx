import Dialog from "@mui/material/Dialog";
import { MobileWebFork } from "../MobileWebFork/MobileWebFork";
import { Drawer } from "@mui/material";
import { RatingDialogContent } from "./RatingDialogContent";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

const RatingDialog = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const show = location.pathname.includes("add-rating");

  const closeDialog = () => {
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
            PaperProps={{ sx: { height: "100vh", width: "100vw" } }}
          >
            <div
              style={{
                height: "100vh",
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
