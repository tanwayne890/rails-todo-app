import React from "react";
import { Link } from "react-router-dom";
import CompletedTaskButton from "./buttons/CompletedTaskButton"
import IncompleteTaskButton from "./buttons/IncompleteTaskButton"

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      tag: {},
      tasks: []
   };
    this.deleteTag = this.deleteTag.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const tagUrl = `/api/v1/tag/show/${id}`;

    const tasksUrl = `/api/v1/tags/${id}/tasks/index`

    fetch(tagUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tag: response }))
      .catch(() => this.props.history.push("/tags"));

    fetch(tasksUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tasks: response }))
      .catch(() => this.props.history.push("/tags"));
  }

  deleteTag() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/tag/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/tags"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { tag, tasks } = this.state;
    let taskList = "No task available";

    if (tasks.length > 0) {
      taskList = tasks
        .map((task, index) => (
          <li key={index} className="list-group-item">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{task.description}</h5>
                {task.completed ? <CompletedTaskButton id={task.id} tag_id={tag.id}/> 
                : <IncompleteTaskButton id={task.id} tag_id={tag.id}/>}
                <Link to={`/tag/${tag.id}/task/${task.id}`} className="btn custom-button">
                  View task
                </Link>
              </div>
            </div>
          </li>
          // completebutton, delete button
        ));
    }
    
    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {tag.title}
          </h1>
          
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Task list</h5>
                <Link to={`/new_task/${tag.id}`} className="btn btn-link">
                Create new task
                </Link>
                {taskList}
              </ul>
            </div>
        
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deleteTag}>
                Delete Tag
              </button>
            </div>
          </div>
          <Link to="/tags" className="btn btn-link">
            Back to tags
          </Link>
        </div>
      </div>
    );
  }


}

export default Tag;