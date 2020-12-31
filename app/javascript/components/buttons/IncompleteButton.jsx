import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

class IncompleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.markTagCompleted = this.markTagCompleted.bind(this);
  }

  markTagCompleted() {
    const url = `/api/v1/tag/markCompleted/${this.props.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => window.location.reload(false))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    return (
      <button
        type="button"
        onClick={this.markTagCompleted}
        className="btn btn-link py-0"
      >
        <FontAwesomeIcon icon={faSquare} color="red" size="2x" />
      </button>
    );
  }
}

export default withRouter(IncompleteButton);
