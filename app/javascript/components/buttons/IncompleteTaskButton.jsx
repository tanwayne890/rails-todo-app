import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

class IncompleteTaskButton extends React.Component {
  constructor(props) {
    super(props);
    this.markTaskCompleted = this.markTaskCompleted.bind(this);
  }

  markTaskCompleted() {
    const { tag_id, id } = this.props;
    const url = `/api/v1/tags/${tag_id}/task/markCompleted/${id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => window.location.reload(false))
      .catch(() => this.props.history.push("/tags"));
  }

  render() {
    return (
      <button
        type="button"
        onClick={this.markTaskCompleted}
        className="btn btn-link py-0"
      >
        <FontAwesomeIcon icon={faSquare} color="red" size="2x" />
      </button>
    );
  }
}

export default withRouter(IncompleteTaskButton);
