import React from "react";
import { Link } from "react-router-dom";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {},
    };
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id, tag_id },
      },
    } = this.props;

    const taskUrl = `/api/v1/tags/${tag_id}/task/show/${id}`;

    fetch(taskUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.setState({ task: response }))
      .catch(() => this.props.history.push(`/tag/${tag_id}`));
  }

  deleteTask() {
    const {
      match: {
        params: { id, tag_id },
      },
    } = this.props;
    const url = `/api/v1/tags/${tag_id}/task/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push(`/tag/${tag_id}`))
      .catch((error) => console.log(error.message));
  }

  render() {
    const { task } = this.state;

    return (
      <div>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">{task.description}</h1>
          </div>
        </section>

        <div className="container py-3 px-5">
          <div className="">
            <button
              type="button"
              className="btn btn-danger float-right"
              onClick={this.deleteTask}
            >
              Delete Task
            </button>

            <Link
              to={`/tag/${task.tag_id}`}
              className="btn btn-primary float-left"
            >
              Back to tag
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Task;
