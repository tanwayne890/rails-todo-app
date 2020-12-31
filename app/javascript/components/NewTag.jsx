import React from "react";
import { Link } from "react-router-dom";

class NewTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/tags/create";
    const { title } = this.state;

    if (title.length == 0) return;

    const body = {
      title,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.props.history.push(`/tag/${response.id}`))
      .catch((error) => console.log(error.message));
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new tag to tag list.
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="tagTitle">Tag title</label>
                <input
                  type="text"
                  name="title"
                  id="tagTitle"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>

              <button
                type="submit"
                className="btn custom-button mt-3 float-right"
              >
                Create Tag
              </button>
              <Link to="/tags" className="btn btn-primary mt-3 float-left">
                Back to tags
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewTag;
