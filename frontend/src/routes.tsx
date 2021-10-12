import { Router, Switch, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import Login from "pages/Login";
import MovieDetails from "pages/MovieDetails";
import MovieList from "pages/MovieList";
import history from "utils/history";
import { isAuthenticated } from "utils/auth";

const Routes = () => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          {isAuthenticated() ? <MovieList /> : <Login />}
        </Route>
        <Route path="/movies" exact>
          <MovieList />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDetails />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
