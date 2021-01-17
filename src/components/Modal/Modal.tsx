import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { NowBox } from "../index";

import styles from "./Modal.module.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      flexDirection: "column",
      backgroundColor: theme.palette.background.paper,
      border: "none",
      boxShadow: theme.shadows[5],
      width: "70vw",
      height: "70vh",
      outline: "none",
      display: "flex",
      borderRadius: "5px;",
      position: "relative",
    },
  })
);

type Tracking = {
  code: boolean;
  kind: string;
  level: number;
  manName: string;
  manPic: string;
  remark: boolean;
  telno: string;
  telno2: string;
  time: number;
  timeString: string;
  where: string;
};

type State = {
  loading: boolean;
  complete: string;
  itemName: string;
  trackingDetails: Tracking[];
  level: number;
};

interface BaseProps {
  item: State;
}

export default function TransitionsModal({ item }: BaseProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log("item", item);

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        내 배송리스트 저장하기
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <NowBox onlyOne={true} stateNumber={item.level} />
            {}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
