import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import authService from "../services/authService";
class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)}
          movie={movie}
        />
      ),
    },
    {
      key: "delete",
      content: (movie) =>
        authService.getCurrentUser() && authService.getCurrentUser().isAdmin ? (
          <button
            onClick={() => this.props.onDelete(movie)}
            className="btn btn-danger btn-sm m-2"
          >
            Delete
          </button>
        ) : null,
    },
  ];

  render() {
    const { movies, onSort, sortColumn, user } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
        user={user}
      />
    );
  }
}
export default MoviesTable;
