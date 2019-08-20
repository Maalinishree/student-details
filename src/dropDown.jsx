import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
var displayFlag = false;
const DropDown = props => {
  const { name } = props;
  var element, elems;
  window.onclick = function(event) {
    if (!event.target.matches('.dropdown')) {
      if (event.target.matches('.dropdown-content') || event.target.matches('.dropdown-content *') ) {
         event.stopPropagation();
         return;
      }
          var i;
        displayFlag = false;
        element = document.getElementsByClassName("dropdown-content");
        for (i = 0; i < element.length; i += 1) {
          element[i].style.visibility = "hidden";
        }
      
    }
}

  const divposition = e => {
    if (displayFlag === false) {
      displayFlag = true;
      var diff = window.innerHeight - e.screenY;
      elems = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < elems.length; i += 1) {
        elems[i].style.visibility = "visible";
        elems[i].style.display = "block";
        if (diff < 50) {
          elems[i].style.bottom = "40px";
          elems[i].style.top = null;
        } else {
          elems[i].style.bottom = null;
          elems[i].style.top = "40px";
        }
      }
    } else {
      displayFlag = false;
      element = document.getElementsByClassName("dropdown-content");
      for (i = 0; i < element.length; i += 1) {
        element[i].style.visibility = "hidden";
      }
    }
  };
  console.log("props.hasdisplay",props.hasDisplayImage);
  return (
      <div>
          {props.hasDisplayImage === false ? (
    <div  className="dropdown-1">
      <div onClick={event => divposition(event)} className="dropdown">...</div>
      {props.type === "checkbox" ? (
      <div className="dropdown-content">
        {name.map(element => (
          <div key={element} className="container">
            <input type={props.type} value={element} id={element} name={element}/>
            <label for={element} >{element}</label>
            <span class="checkmark"></span>
          </div>
        ))}
      </div>
      ):(
        <div className="dropdown-content">
        {name.map(element => (
          <div key={element} className="container">
            <input type={props.type} value={element} id={element} name={props.nameValue}/>
            <label for={element} >{element}</label>
            <span class="checkmark"></span>
          </div>
        ))}
      </div>
      )}
    </div>) : (
        <div> 
            <img src={props.imageUrl} className="imageStyle" alt="Loading Image"/>
        </div>
    )}
    </div>
  );
};

DropDown.defaultProps = {
  name: ["hello", "hii", "hey"],
  type:"checkbox",
  nameValue:"name",
  hasDisplayImage:false,
  imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
};

DropDown.propTypes = {
  name: PropTypes.array,
  type: PropTypes.string,
  nameValue: PropTypes.string,
  hasDisplayImage: PropTypes.bool,
  imageUrl:PropTypes.string
};

export default DropDown;
