import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

const PWAUpdateModal = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("SW Registered: " + r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  useEffect(() => {
    offlineReady &&
      console.log("App is offline-ready. Please reload the page.");
  }, [offlineReady]);

  return (
    <>
      <Dialog open={needRefresh} onClose={close}>
        <DialogTitle>{"New App version available!"}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "primary.main" }}>
            Do you want to update now?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "warning.main" }} onClick={close}>
            Cancel
          </Button>
          <Button
            onClick={() => updateServiceWorker(true)}
            sx={{ color: "primary.main" }}
            variant="outlined"
            autoFocus
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { PWAUpdateModal };
