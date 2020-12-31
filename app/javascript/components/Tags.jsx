import React from "react";
import { Link } from "react-router-dom";
import CompletedButton from "./buttons/CompletedButton";
import IncompleteButton from "./buttons/IncompleteButton";

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
  }

  componentDidMount() {
    const url = "/api/v1/tags/index";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.setState({ tags: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { tags } = this.state;

    const allTags = tags.map((tag, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title text-center">{tag.title}</h5>
            <div className="text-center">
              {tag.completed ? (
                <CompletedButton id={tag.id} />
              ) : (
                <IncompleteButton id={tag.id} />
              )}
              <Link to={`/tag/${tag.id}`} className="btn custom-button">
                View tag
              </Link>
            </div>
          </div>
        </div>
      </div>
    ));
    const noTag = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No tag yet. Why not <Link to="/new_tag">create one?</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">
              {" "}
              "If you cannot do great things,
              <br />
              do small things in a great way."
            </h1>
            <p className="lead text-muted">Napoleon Hill</p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="d-flex w-100 justify-content-between">
              <u>
                <h5 className="pt-2">Tag list</h5>
              </u>
              <div className="text-right mb-3">
                <Link to="/new_tag" className="btn custom-button">
                  Create New Tag
                </Link>
              </div>
            </div>

            <div className="row">{tags.length > 0 ? allTags : noTag}</div>
            <Link to="/" className="btn btn-primary">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}
export default Tags;
