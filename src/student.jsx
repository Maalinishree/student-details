import React,{Component} from 'react';
import { Card, Input } from "antd";
import { connect } from "react-redux";
import * as actionCreator from "./store/action";


const { Search } = Input;

class Student extends Component{
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.getStudentData();
    }
 render(){
     return(
         <div>
             <div className="headerStyle">Student Details 
             <div>
             <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
             </div>
             </div>
              
        <div className="card">
            <Card title="Student Name" className="cardStyle"></Card>
            <Card title="Student Name" className="cardStyle"></Card>
            <Card title="Student Name" className="cardStyle"></Card>
        </div>
        </div>
     );
 }
}

const mapStateToProps = state => {
    return {
      studentData:state.studentData
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
  )(Student);