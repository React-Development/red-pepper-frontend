import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { DeleteButton } from "components/UI/Buttons/Buttons";
import { FaTrash } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TableDishDetails = (props) => {
  const classes = useStyles();
  const { dishDetails, onDeleteItem, filterSupplyName } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Insumo</TableCell>
            <TableCell align="right">Cant.</TableCell>
            <TableCell align="right">Comentario</TableCell>
            <TableCell align="center">Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dishDetails.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Ingrese insumos al platillo
              </TableCell>
            </TableRow>
          ) : null}
          {dishDetails.map((item) => {
            return (
              <TableRow key={uuid()}>
                <TableCell key={item.supplyId}>
                  {item.desc || filterSupplyName(item.supplyId)}
                </TableCell>
                <TableCell align="right">{item.qty}</TableCell>
                <TableCell align="right">
                  {item.comment === "" ? "---" : item.comment}
                </TableCell>
                {item && (
                  <TableCell align="center" key={uuid()}>
                    <DeleteButton onClick={() => onDeleteItem(item.supplyId)}>
                      <FaTrash size="18" />
                    </DeleteButton>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableDishDetails.propTypes = {
  dishDetails: PropTypes.array.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  filterSupplyName: PropTypes.func.isRequired,
};

export default TableDishDetails;
