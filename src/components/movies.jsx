import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { paginate } from "../utils/paginate";
import MoviesTable from "../components/moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import SearchBox from "./common/searchBox";
import { Link } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ name: "All genres" }, ...data];

    this.setState({ movies, genres });
  }
  handleDelete = async (movie) => {
    const originalMovies = [...this.state.movies];
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");
      }
      this.setState({ movies: originalMovies });
    }
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    if (movie.liked === "true") {
      movies[index].liked = "false";
    } else {
      movies[index].liked = "true";
    }
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      searchQuery,
      sortColumn,
      selectedGenre,
    } = this.state;
    const { user } = this.props;
    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              className="btn btn-primary"
              to="/movies/new"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}

          <p>Showing {filtered.length} movies in database</p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
        </div>

        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default Movies;
