import React, { useState, useEffect } from "react";
import {
  IconButton,
  CardHeader,
  Grid,
  Divider,
  Button,
  Container,
} from "@material-ui/core";
import { FaArrowLeft } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getTablesAction } from "redux/actions/tables/tables";
import { v4 as uuid } from "uuid";
import { green, red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  available: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[500],
      transform: "scale(1.05)",
      transition: ".2s ease-in-out",
    },
    width: "300px",
    color: "white",
  },

  unavailable: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[500],
      transform: "scale(1.05)",
      transition: ".2s ease-in-out",
    },
    width: "300px",
    color: "white",
  },
  centerTitle: {
    textAlign: "center",
  },
  title: {
    fontSize: 14,
  },
  cardContent: {
    borderTop: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
    // "&:hover": {
    //   borderTop: "1px solid #fff",
    //   borderBottom: "1px solid #fff",
    // },
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
  },
  footer: {
    justifyContent: "center",
  },
  root: {
    width: "300px",
    "&:hover": {
      // backgroundColor: "transparent",
      transform: "scale(1)",
      transition: ".2s ease-in-out",
      color: "black",
    },
  },
});

const PickTable = (props) => {
  const classes = useStyles();
  const { history } = props;
  const dispatch = useDispatch();
  const tablesStore = useSelector((state) => state.tables.tables);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const getTables = () => dispatch(getTablesAction());
    getTables();
  }, [dispatch]);

  useEffect(() => {
    setTables(tablesStore);
  }, [tablesStore]);

  const handleAvailability = (id) => {
    setTables(
      tables.map((table) =>
        table.id === id ? (table = { ...table, isAvailable: false }) : table
      )
    );
  };

  return (
    <div>
      <IconButton onClick={() => history.push("/ordenes")}>
        <FaArrowLeft size="1.2rem" />
      </IconButton>
      <Container>
        <div style={{ margin: "1rem 0" }} />
        <Typography variant="h5" className={classes.centerTitle}>
          Selección de Mesa
        </Typography>
        <div style={{ margin: "1rem 0" }} />
        <Divider />
        <div style={{ margin: "2rem 0" }} />

        <Grid
          container
          justify="center"
          spacing={2}
          style={{ textAlign: "center" }}
        >
          {tables.map((table) => (
            <React.Fragment key={uuid()}>
              <Grid item md={4}>
                <Button
                  onClick={() => {
                    console.log(`Hey ${table.id}! `);
                    handleAvailability(table.id);
                  }}
                  className={
                    table.isAvailable === false
                      ? classes.unavailable
                      : classes.available
                  }
                >
                  <Card className={classes.root} elevation={0}>
                    <CardHeader title={table.name} />
                    <CardContent className={classes.cardContent}>
                      <div className={classes.content}>
                        <Typography variant="body2" component="p">
                          Ubicación:
                        </Typography>
                        <Typography variant="body2" component="p">
                          {table.description}
                        </Typography>
                      </div>
                      <div className={classes.content}>
                        <Typography variant="body2" component="p">
                          Sillas:
                        </Typography>
                        <Typography variant="body2" component="p">
                          {table.chairs}
                        </Typography>
                      </div>
                    </CardContent>
                    <CardActions className={classes.footer}>
                      {table.isAvailable === false
                        ? "NO DISPONIBLE"
                        : "DISPONIBLE"}
                    </CardActions>
                  </Card>
                </Button>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default PickTable;
