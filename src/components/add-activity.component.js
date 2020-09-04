import React, {Component} from "react";
import AgendaDataService from "../services/agenda.service";

export default class AddActivity extends Component{
  constructor(props){
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.saveActivity = this.saveActivity.bind(this);
    this.newActivity = this.newActivity.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      date: "",
      active: false,

      submitted: false
    };
  }
  onChangeTitle(e){
    this.setState({
      title: e.target.value
    });
  }
  onChangeDescription(e){
    this.setState({
      description: e.target.value
    });
  }
  onChangeDate(e){
    var date = JSON.parse(e);
    this.setState({
      date: date.target.value
    });
  }
  saveActivity(){
    var data = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date
    };
    AgendaDataService.create(data)
    .then(response => {
      this.setState({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        date: response.data.date,
        active: response.data.active,
        submitted: true
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }
  newActivity(){
    this.setState({
      id: null,
      title: "",
      description: "",
      date: "",
      active: false,
      submitted: false
    });
  }
  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newActivity}>
              Add
            </button>
          </div>
        ) : (
          <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              defaultValue={this.onChangeTitle}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              defaultValue={this.onChangeDescription}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              required
              defaultValue={this.onChangeDate}
              name="date"
              />
          </div>

          <button onClick={this.saveActivity} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
  }
}
