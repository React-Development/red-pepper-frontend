import React from "react";
import TableFormat from "components/Table/TableFormat";
import { Typography, Divider, Grid } from "@material-ui/core";
import FormDialog from "components/Modals/FormDialog";
import PropTypes from "prop-types";

const PageContainer = (props) => {
  const {
    pageTitle,
    formTarget,
    hasErrorLoadingData,
    buttonLabel,
    dialogTitle,
  } = props;

  return (
    <React.Fragment>
      <Divider style={{ margin: "1rem 0 2rem 0" }} />
      <Typography variant="h5" align="center">
        {pageTitle}
      </Typography>
      <Divider style={{ margin: "2rem 0" }} />
      <Grid item xs={12} className="text-center">
        <FormDialog
          formTarget={formTarget}
          buttonLabel={buttonLabel}
          title={dialogTitle}
          categories={props.formTarget === "dish" && props.categories}
          supplies={props.formTarget === "dish" && props.supplies}
          dishes={props.formTarget === "combo" && props.dishes}
        />
      </Grid>
      <Grid item xs={12} style={{ margin: "2rem 0 1rem 0" }}>
        {hasErrorLoadingData && (
          <div className="error--message">
            <p>Hubo un problema cargando la informacion...</p>
          </div>
        )}
      </Grid>
      <TableFormat {...props} />
    </React.Fragment>
  );
};

PageContainer.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  formTarget: PropTypes.string.isRequired,
  hasErrorLoadingData: PropTypes.bool,
  buttonLabel: PropTypes.string.isRequired,
  dialogTitle: PropTypes.string.isRequired,
};

export default PageContainer;
