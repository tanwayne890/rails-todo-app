import React from "react";
import { Link } from "react-router-dom";

class NewTask extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        description: "",
        tag_title: ""
      };
  
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    
    }

    componentDidMount() {
        const {
            match: {
              params: { tag_id }
            }
        } = this.props;

        const tagUrl = `/api/v1/tag/show/${tag_id}`;

        fetch(tagUrl)
        .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ tag_title: response.title }))
        .catch(() => this.props.history.push("/tags"));

    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    onSubmit(event) {
        event.preventDefault();

        const {
            match: {
              params: { tag_id }
            }
          } = this.props;
        const { description } = this.state;

        const url = `/api/v1/tags/${tag_id}/tasks/create`;
        
        if (description.length == 0)
          return;
    
        const body = {
          description,
          tag_id
        };
    
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
          method: "POST",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => this.props.history.push(`/tag/${response.tag_id}`))
          .catch(error => console.log(error.message));
      }

      render() {
        const { tag_title } = this.state;
        
        const {
            match: {
              params: { tag_id }
            }
          } = this.props;
          
        return (
            
          <div className="container mt-5">
            <div className="row">
              <div className="col-sm-12 col-lg-6 offset-lg-3">
                <h1 className="font-weight-normal mb-5">
                  Add a new task to {tag_title}
                </h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="taskDescription">Task description</label>
                    <input
                      type="text"
                      name="description"
                      id="taskDescription"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    />
                  </div>
                  
              
                  <button type="submit" className="btn custom-button mt-3">
                    Create Task
                  </button>
                  <Link to={`tag/${tag_id}`} className="btn btn-link mt-3">
                    Back to {tag_title}
                  </Link>
                </form>
              </div>
            </div>
          </div>
        );
      }
  }
  
  export default NewTask;