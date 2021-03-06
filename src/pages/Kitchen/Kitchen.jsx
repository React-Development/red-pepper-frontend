import React, { useCallback, useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Divider, Typography } from "@material-ui/core";
import { getCombosAction } from "redux/actions/combos/combos";
import { getDishesAction } from "redux/actions/dishes/dishes";
import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";
import {
  addOrderSignalR,
  fetchOrders,
  updateOrderDetailsSignalR,
  updateOrderSignalR,
} from "redux/actions/signalR/signalROrders";
import { v4 as uuid } from "uuid";

const Kitchen = (props) => {
  const columns = [
    { title: "En Cola", status: "En Cola" },
    { title: "En Proceso", status: "En Proceso" },
    { title: "Finalizado", status: "Finalizado" },
  ];
  const combos = useSelector((state) => state.combos.combos);
  const dishes = useSelector((state) => state.dishes.dishes);
  const orders = useSelector((state) => state.signalROrders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCombos = () => dispatch(getCombosAction());
    const loadDishes = () => dispatch(getDishesAction());
    const loadOrders = () => dispatch(fetchOrders());
    loadCombos();
    loadDishes();
    loadOrders();
  }, [dispatch]);

  const [fetchedDetails, setFetchedDetails] = useState([]);

  const updatedDetailsArray = useCallback(() => {
    const currentDetails = orders.map((order) => {
      return order.orderDetails.map((detail) => detail);
    });

    // YA SIRVE ESTA MIERDA!!
    // NO TOCAR ESTA MIERDA X
    return currentDetails.map((curOrderDetails) => {
      return curOrderDetails.map((curOrderDetail) => {
        fetchedDetails.map((fetchedDetail) =>
          fetchedDetail.id === curOrderDetail.id
            ? (curOrderDetail = fetchedDetail)
            : curOrderDetail
        );
        return curOrderDetail;
      });
    });

    // NO TOCAR TAMPOCO!
    // const finalArray = orders.map((order, index) => ({
    //   ...order,
    //   orderDetails: finalDetails[index],
    // }));

    // console.log("Current Details", currentDetails);
    // console.log("Final Details", finalDetails);
    // console.log("Final Array", finalArray);
    // console.log("Final Details Alt", finalDetailsAlt);
  }, [orders, fetchedDetails]);

  const onUpdateAndDisplayDetails = () => {
    dispatch(updateOrderDetailsSignalR(updatedDetailsArray()));
    dispatch(fetchOrders());
  };

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/redpeper/app")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then((result) => {
        console.log("Connected!");

        connection.on("OrderCreated", (order) => {
          console.log("Added Order", order);

          dispatch(addOrderSignalR(order));
        });

        connection.on("DetailsUpdated", (order) => {
          console.log("Updated Order", order);

          dispatch(updateOrderSignalR(order));
        });

        connection.on("DetailsInProcess", (details) => {
          console.log("DetailsInProcess Details", details);
          setFetchedDetails(details);

          onUpdateAndDisplayDetails();
        });

        connection.on("DetailsFinished", (details) => {
          console.log("DetailsFinished Details", details);
          setFetchedDetails(details);

          onUpdateAndDisplayDetails();
        });

        connection.on("DetailsDelivered", (details) => {
          console.log("DetailsDelivered Details", details);
          setFetchedDetails(details);

          onUpdateAndDisplayDetails();
        });
      })
      .catch((e) => console.log("Connection failed: ", e));

    return () => {
      connection.off("OrderCreated");
      connection.off("DetailsUpdated");
      connection.off("DetailsInProcess");
      connection.off("DetailsFinished");
      connection.off("DetailsDelivered");
    };
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Listado de Pedidos
      </Typography>

      <div style={{ margin: "20px 0" }}>
        <Divider />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {columns.map((column) => (
          <div
            style={{
              display: "flex",
            }}
            key={uuid()}
          >
            <Column
              column={column}
              orders={orders}
              combos={combos}
              dishes={dishes}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kitchen;
