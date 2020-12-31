import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";

class CompletedTaskButton extends React.Component {
  constructor(props) {
    super(props);
    this.markTaskIncomplete = this.markTaskIncomplete.bind(this);
  }

  markTaskIncomplete() {
    const { tag_id, id } = this.props;
    const url = `/api/v1/tags/${tag_id}/task/markIncomplete/${id}`;

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
        onClick={this.markTaskIncomplete}
        className="btn btn-link py-0"
      >
        <FontAwesomeIcon icon={faCheckSquare} color="green" size="2x" />
      </button>
    );
  }
}

export default withRouter(CompletedTaskButton);
