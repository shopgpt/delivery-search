import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Main, Detail, List } from "../pages";
import { Layout } from "../components";

export default function AppRouter() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/list" component={List} />
          <Route exact path="/detail" component={Detail} />
        </Switch>
      </Layout>
    </Router>
  );
}
