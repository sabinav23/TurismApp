import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

const useStypes = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "50%",
    },
    amenities: {
      display: "flex",
      flexWrap: "wrap",
    },
    amenityBox: {
      display: "flex",
      width: "50%",
      textAlign: "start",
      alignItems: "center",
    },
    title: {
      textAlign: "center",
    },
  })
);

type featuresDetails = {
  label: string;
};

type featuresProps = {
  amenities: featuresDetails[];
};

function Amenities(props: featuresProps) {
  const classes = useStypes();

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Facilitati</h2>
      <div className={classes.amenities}>
        {props.amenities.map((amenity) => (
          <div className={classes.amenityBox}>
            <Checkbox
              color="primary"
              inputProps={{ "aria-label": "uncontrolled-checkbox" }}
              checked
            />
            <h4> {amenity.label} </h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Amenities;
