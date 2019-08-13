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

var barChartVal = [];
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
  componentWillMount() {
    markValues = [];
    value = [];
  }
  componentDidMount() {
    if (this.props.studentData.length === 0) {
      this.props.getStudentData().then(() => {
        path = this.props.location.pathname.split("/");
        for (var key in Object.values(this.props.studentData[path[1]])) {
          value.push(Object.values(this.props.studentData[path[1]])[key]);
        }
        for (key in value[3]) {
          markValues.push({ key: key, marks: value[3][key] });
        }
        this.setState({ barValue: markValues });
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
      <div className="detailsStyle">
        <div className="cardDesign">
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
