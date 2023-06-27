import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Layout } from "../components";
import { Detail, Main } from "../pages";

export default function AppRouter() {
  return (
    <Router basename="/">
      <Layout>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/detail" component={Detail} />
        </Switch>
      </Layout>
    </Router>
  );
}
