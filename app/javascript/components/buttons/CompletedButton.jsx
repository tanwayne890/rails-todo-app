import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";

class CompletedButton extends React.Component {
  constructor(props) {
    super(props);
    this.markTagIncomplete = this.markTagIncomplete.bind(this);
  }
  markTagIncomplete() {
    const url = `/api/v1/tag/markIncomplete/${this.props.id}`;
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
        onClick={this.markTagIncomplete}
        className="btn btn-link py-0"
      >
        <FontAwesomeIcon icon={faCheckSquare} color="green" size="2x" />
      </button>
    );
  }
}

export default withRouter(CompletedButton);
