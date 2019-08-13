import React, { Component } from "react";
import { Card, Input, Button, Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreator from "./store/action";

const { Search } = Input;
var flag=false;
var flagTotal=false;
class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentDetails: []
    };
  }
  componentWillMount() {
   
    if (this.props.studentData.length === 0) {
      this.props.getStudentData().then(() => {
        this.initialValue();
      });
    }
    else{
      this.initialValue();
    }
  }
  initialValue=()=>{
    var studentArray = [];
    var addTotal=[];
    var totalMarks = 0;
    var index=0;
    var data = Object.values(this.props.studentData);
        data.forEach(element => {
          studentArray.push(element);
          index=studentArray.indexOf(element);
          totalMarks = 0
          Object.values(element.marks).forEach(element => {
            totalMarks += element;
          });
          var addMark = {...studentArray[index],"totalMarks":totalMarks} 
          addTotal.push(addMark);
        });
        this.setState({ studentDetails: addTotal });
  }
  handleSearch = value => {
   var searchResult=[];
   if(value.length!==0){
      Object.values(this.props.studentData).forEach(element => {
        if(element.name.toLowerCase()===value.toLowerCase()){
          searchResult.push(element)
        }
      });
      this.setState({studentDetails:searchResult})
    }else{
      this.initialValue();
    }
    };
  functionLoad = (id, item) => {
    this.props.history.push(`/${id}`, {
      data: item
    });
  };
  sortNumber =() => {
    const studentData = this.state.studentDetails;
    if (flagTotal === false) {
      flagTotal = true;
      studentData.sort(function(a, b) {
        var totalA = a.totalMarks,
          totalB = b.totalMarks;
        if (totalA < totalB) return -1;
        if (totalA > totalB) return 1;
        return 0;
      });
    } else {
      flagTotal = false;
      studentData.sort(function(a, b) {
        var totalA = a.totalMarks,
        totalB = b.totalMarks;
      if (totalA > totalB) return -1;
      if (totalA < totalB) return 1;
      return 0;
      });
    }
    this.setState({ studentDetails: studentData });

  }
  sortAlphabet = () => {
    const studentData = this.state.studentDetails;
    if (flag === false) {
      flag = true;
      studentData.sort(function(a, b) {
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else {
      flag = false;
      studentData.sort(function(a, b) {
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      });
    }
    this.setState({ studentDetails: studentData });
  };
  render() {
    console.log("data", this.state);
    return (
      <div>
        <div className="headerStyle">
          Student Details
          <div className="order">
            <div>
              <Search
                placeholder="input search text"
                onSearch={value => this.handleSearch(value)}
                allowClear={true}
              />
            </div>
            <div>
              <Button onClick={() => this.sortAlphabet()}>sort Alphabet</Button>
              <Button onClick= {() => this.sortNumber()}>sort Marks</Button>
            </div>
          </div>
        </div>

        <Row>
          {this.state.studentDetails.length > 0 &&
            this.state.studentDetails.map((item)=> (
              <Col sm={6} xs={12} md={8} key={item.rollNo}>
                <Card
                  title={item.name}
                  key={item.rollNo}
                  onClick={() => this.functionLoad(item.rollNo, item)}
                >
                  <div>ID:{item.rollNo}</div>
                  <div>Marks:{item.totalMarks}</div>
                </Card>
              </Col>
            ))}
        </Row>
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
)(withRouter(Student));
