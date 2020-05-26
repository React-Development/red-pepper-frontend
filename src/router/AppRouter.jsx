import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Supplies from "pages/Supplies/Supplies";
import Supppliers from "pages/Suppliers/Suppliers";
import SuppliesPurchase from "pages/SuppliesPurchase/SuppliesPurchase";
import Categories from "pages/Categories/Categories";
import Dishes from "pages/Dishes/Dishes";
import Combos from "pages/Combos/Combos";
import Tables from "pages/Tables/Tables";
import Login from "pages/Login/Login";
import Employees from "pages/Employees/Employees";
import Customers from "pages/Customers/Customers";

const AppRouter = (props) => {
  const { isAuthenticated } = props;
  let appRoutes = (
    <Switch>
      <Route path="/login" component={Login} />
      {/* This one will catch anything that has no route. */}
      <Route render={() => <Redirect to={{ pathname: "/login" }} />} />
    </Switch>
  );

  if (isAuthenticated) {
    appRoutes = (
      <Switch>
        <Route path="/insumos" component={Supplies} />
        <Route path="/proveedores" component={Supppliers} />
        <Route path="/compra-insumos" component={SuppliesPurchase} />
        <Route path="/categorias" component={Categories} />
        <Route path="/platos" component={Dishes} />
        <Route path="/combos" component={Combos} />
        <Route path="/mesas" component={Tables} />
        <Route path="/empleados" component={Employees} />
        <Route path="/clientes" component={Customers} />
        {/* This one will catch anything that has no route. */}
        <Route render={() => <Redirect to={{ pathname: "/insumos" }} />} />
      </Switch>
    );
  }

  return appRoutes;
};

export default AppRouter;
