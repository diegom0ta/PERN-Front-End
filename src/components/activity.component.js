import React, {Component} from "react";
import AgendaDataService from "../services/agenda.service";

export default class Activity extends Component{
  constructor(props){
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getActivity = this.getActivity.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.updateActivity = this.updateActivity.bind(this);
    this.deleteActivity = this.deleteActivity.bind(this);

    this.state = {
      currentActivity: {
        id: null,
        title: "",
        description: "",
        date: "",
        active: false
      },
      message: ""
    };
  }
  componentDidMount(){
    this.getActivity(this.props.match.params.id);
  }
  onChangeTitle(e){
    const title = e.target.value;
    this.setState(function(prevState){
      return {
        currentActivity: {
          ...prevState.currentActivity,
          title: title
        }
      };
    });
  }
  onChangeDescription(e){
    const description = e.target.value;
    this.setState(prevState => ({
      currentActivity: {
        ...prevState.currentActivity,
        description: description
      }
    }));
  }
  onChangeDate(e){
    const date = e.target.value;
    this.setState(prevState => ({
      currentActivity: {
        ...prevState.currentActivity,
        date: date
      }
    }));
  }
  getActivity(id){
    AgendaDataService.get(id)
    .then(response => {
      this.setState({
        currentActivity: response.date
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }
  updateActive(status){
    var data = {
      id: this.state.currentActivity.id,
      title: this.state.currentActivity.title,
      description: this.state.currentActivity.description,
      date: this.state.currentActivity.date,
      active: status
    };
    AgendaDataService.update(this.state.currentActivity.id, data)
    .then(response => {
      this.setState(prevState => ({
        currentActivity: {
          ...prevState.currentActivity,
          active: status
        }
      }));
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }
  updateActivity(){
    AgendaDataService.update(
      this.state.currentActivity.id,
      this.state.currentActivity
    )
    .then(response => {
      console.log(response.data);
      this.setState({
        message: "Updated!"
      });
    })
    .catch(e => {
      console.log(e);
    });
  }
  deleteActivity(){
    AgendaDataService.delete(this.state.currentActivity.id)
    .then(response => {
      console.log(response.data);
      this.props.history.push('/activities')
    })
    .catch(e => {
      console.log(e);
    });
  }
  render(){
    const {currentActivity} = this.state;
    return (
      <div>
        {currentActivity ? (
          <div className="edit-form">
            <h4>Activity</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentActivity.title}
                  onChange={this.onChangeTitle}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentActivity.description}
                  onChange={this.onChangeDescription}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="date"
                  value={currentActivity.date}
                  onChange={this.onChangeDate}
                  />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentActivity.active ? "Active" : "Not active"}
              </div>
            </form>
            {currentActivity.active ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateActive(false)}
              >
              Idle
              </button>
              ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateActive(true)}
              >
              Active
              </button>
            )}
            <button
              className="badge badge-primary mr-2"
              onClick={this.deleteActivity}
            >
            Delete
            </button>
            <button
              type="submit"
              className="badge badge-primary mr-2"
              onClick={this.updateActivity}
            >
            Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Choose an Activity</p>
          </div>
        )}
      </div>
    );
  }
}
