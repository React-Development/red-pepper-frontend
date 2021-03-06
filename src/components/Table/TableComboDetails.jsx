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

const TableComboDetails = (props) => {
  const classes = useStyles();
  const { comboDetails, onDeleteItem, filterDishName } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Platillo</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="center">Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comboDetails.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Ingrese platillos al combo
              </TableCell>
            </TableRow>
          ) : null}
          {comboDetails.map((item) => (
            <TableRow key={uuid()}>
              <TableCell key={item.dishId}>
                {item.desc || filterDishName(item.dishId)}
              </TableCell>
              <TableCell align="right">{item.qty}</TableCell>
              <TableCell align="right">$ {item.price}</TableCell>
              <TableCell align="right">
                $ {(item.price * item.qty).toFixed(2)}
              </TableCell>
              {item && (
                <TableCell align="center" key={uuid()}>
                  <DeleteButton onClick={() => onDeleteItem(item.dishId)}>
                    <FaTrash size="18" />
                  </DeleteButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableComboDetails.propTypes = {
  comboDetails: PropTypes.array.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  filterDishName: PropTypes.func.isRequired,
};

export default TableComboDetails;
