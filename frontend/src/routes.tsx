import { Router, Switch, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import Login from "pages/Login";
import MoviesDetails from "pages/MoviesDetails";
import MoviesList from "pages/MoviesList";
import history from "utils/history";
import { isAuthenticated } from "utils/auth";

const Routes = () => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          {isAuthenticated() ? <MoviesList /> : <Login />}
        </Route>
        <Route path="/movies" exact>
          <MoviesList />
        </Route>
        <Route path="/movies/:movieId">
          <MoviesDetails />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
