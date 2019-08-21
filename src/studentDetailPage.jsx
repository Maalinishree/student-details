import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { connect } from "react-redux";
import * as actionCreator from "./store/action";
import { message } from "antd";
import DropDown from "./dropDown";

var value = [];
var path = [];
var markValues = [];

class StudentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barValue: []
    };
  }

  componentDidMount() {
    markValues = [];
    value = [];
    if (this.props.studentData.length === 0) {
      this.props.getStudentData().then(() => {
        path = this.props.location.pathname.split("/");
        try {
          for (var key in Object.values(this.props.studentData[path[1]])) {
            value.push(Object.values(this.props.studentData[path[1]])[key]);
          }

          for (key in value[3]) {
            markValues.push({ key: key, marks: value[3][key] });
          }
          this.setState({ barValue: markValues });
        } catch (e) {
          message.error("sorry data not found");
          this.props.history.push(`/`);
        }
      });
    } else {
      for (var key in Object.values(this.props.location.state.data)) {
        value.push(Object.values(this.props.location.state.data)[key]);
      }
      for (var keys in value[3]) {
        markValues.push({ key: keys, marks: value[3][keys] });
      }
      this.setState({ barValue: markValues });
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>Name:{value[0]}</div>
          <div> Roll Number:{value[2]}</div>
          <div>class:{value[1]}</div>
          <div>
            <BarChart
              width={500}
              height={300}
              data={this.state.barValue}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="key" />
              <YAxis dataKey="marks" />
              <Tooltip />
              <Legend />
              <Bar dataKey="marks" fill="#8884d8" />
            </BarChart>
          </div>
          <div className="divStyle">
            <DropDown id={0} hasDisplayImage={true} />
          </div>
          <div className="space" />
          <div className="divStyle">
            <DropDown id={1} type={"radio"} />
          </div>
          <div className="space" />
          <div className="divStyle">
            <DropDown id={2} />
          </div>
          <div className="space" />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    studentData: state.studentData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getStudentData: () => dispatch(actionCreator.studentActionFunction())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StudentDetail));
