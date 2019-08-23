import React, { Component } from "react";
import PropTypes from "prop-types";
var displayFlag = "dropdownTop";

var element, elems;
class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selecteditem: [],
      open:true
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (
      event.target.matches(".dropdown-content *") ||
      event.target.matches(".dropdown-content")
    ) {
      event.stopPropagation();
    } else if (event.target.matches(".dropdown")) {
    } else {
      this.hide();
    }
  }
  hide = () => {
    var i;
    element = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < element.length; i += 1) {
      if (element[i].classList.contains(displayFlag)) {
        element[i].classList.remove(displayFlag);
      }
    }
    // this.setState(state => {
    //   return {
    //     open: !state.open,
    //   };
    // });
  };
  handleClick = (value) => {
    let { selecteditem }= this.state;
    let currentSelectedItem = Object.assign([], selecteditem);
   
   if(this.props.type === "checkbox"){
     if(selecteditem.includes(value)){
       selecteditem.splice(selecteditem.indexOf(value),1);
     }
     else{
       selecteditem.push(value);
     }
      this.setState({selecteditem:selecteditem});
   }
   else{
     console.log("selected value",value);
     currentSelectedItem=[];
     currentSelectedItem.push(value);
     this.setState({
       selecteditem: currentSelectedItem});
   }
  };
  handleCheckboxValue = () => {
   console.log("selected value", this.state.selecteditem);
   this.hide();
  }
  divposition = e => {
    var diff = window.innerHeight - e.screenY;
    if (diff < 50) {
      displayFlag = "dropdownBottom";
    } else {
      displayFlag = "dropdownTop";
    }
    this.toggleFunction(displayFlag);
  };
  toggleFunction = flag => {
    elems = document.getElementById(`styleDropDown-${this.props.id}`);
    elems.classList.toggle(flag);
  };

  render() {
    const { dropdownInput } = this.props;
    const { selecteditem }= this.state;
    return (
      <div>
        <div className="dropdown-1" ref={this.setWrapperRef}>
          <div onClick={event => this.divposition(event)} className="dropdown">
            ...
          </div>
          {/* {this.state.open && ( */}
          <div
            className={`dropdown-content styleDropDown-${this.props.id}`}
            id={`styleDropDown-${this.props.id}`}
          >
            {dropdownInput.map((element) => {
              return <div key={element.value} className="container">
                 <label>
                <input
                  type={this.props.type}
                  value={element.value}
                  checked={selecteditem.includes(element.value)}
                  onClick={() => this.handleClick(element.value)}
                />
                {element.name}
               </label>
              </div>
            })}
            {this.props.type === "checkbox" ? (
              <button onClick={() => this.handleCheckboxValue()}>save</button>
            ) : null}
          </div>
          {/* ) } */}
        </div>
      </div>
    );
  }
}

DropDown.defaultProps = {
  dropdownInput: [{name:"John", value:"john"},{name:"Mark", value:"mark"},{name:"Peter", value:"peter"},{name:"Stark",value:"stark"}],
  type: "radio",
  nameValue: "name",
};

DropDown.propTypes = {
  name: PropTypes.array,
  type: PropTypes.string,
  nameValue: PropTypes.string,
  hasDisplayImage: PropTypes.bool,
  imageUrl: PropTypes.string
};

export default DropDown;
