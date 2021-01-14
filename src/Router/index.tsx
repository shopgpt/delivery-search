import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Main } from "../pages";
import { Layout } from "../components";

export default function AppRouter() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/list" component={Main} />
        </Switch>
      </Layout>
    </Router>
  );
}
