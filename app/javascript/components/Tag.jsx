import React from "react";
import { Link } from "react-router-dom";
import CompletedTaskButton from "./buttons/CompletedTaskButton";
import IncompleteTaskButton from "./buttons/IncompleteTaskButton";

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: {},
      tasks: [],
    };
    this.deleteTag = this.deleteTag.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const tagUrl = `/api/v1/tag/show/${id}`;

    const tasksUrl = `/api/v1/tags/${id}/tasks/index`;

    fetch(tagUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.setState({ tag: response }))
      .catch(() => this.props.history.push("/tags"));

    fetch(tasksUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.setState({ tasks: response }))
      .catch(() => this.props.history.push("/tags"));
  }

  deleteTag() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const url = `/api/v1/tag/destroy/${id}`;
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
      .then(() => this.props.history.push("/tags"))
      .catch((error) => console.log(error.message));
  }

  render() {
    const { tag, tasks } = this.state;
    let taskList = "No task available";

    if (tasks.length > 0) {
      taskList = tasks.map((task, index) => (
        <li key={index} className="list-group-item">
          <div className="d-flex">
            <div className="p-2">
              <h5>{task.description}</h5>
            </div>
            <div className="p-2">
              {task.completed ? (
                <CompletedTaskButton id={task.id} tag_id={tag.id} />
              ) : (
                <IncompleteTaskButton id={task.id} tag_id={tag.id} />
              )}
            </div>
            <div className="ml-auto p-2">
              <Link
                to={`/tag/${tag.id}/task/${task.id}`}
                className="btn custom-button"
              >
                View task
              </Link>
            </div>
          </div>
        </li>
      ));
    }

    return (
      <div>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">{tag.title}</h1>
          </div>
        </section>

        <div className="container py-5">
          <div className="row justify-content-md-center">
            <div className="col col-lg-2"></div>
            <div className="col-md-10">
              <div className="column">
                <div className="mb-2">
                  <h5>Task list</h5>
                  <Link to={`/new_task/${tag.id}`} className="btn btn-link">
                    Create new task
                  </Link>
                </div>

                <div className="col-sm-12 col-lg-10">
                  <ul className="list-group">{taskList}</ul>
                </div>

                <div className="col-sm-12 col-lg-10">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.deleteTag}
                  >
                    Delete Tag
                  </button>
                </div>
              </div>
              <Link to="/tags" className="btn btn-link">
                Back to tags
              </Link>
            </div>
            <div className="col col-lg-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tag;
