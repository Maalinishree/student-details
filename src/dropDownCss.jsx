import React, {useEffect,useRef} from "react";
import PropTypes from 'prop-types';
var displayFlag = false;
const DropDownCss = (props) => {
  const node = useRef();
//   const name = ["hello", "hii", "hey"];
  const { name } = props;
  var element, elems;
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const handleClick = e => {
    e.preventDefault();
    if (node.current.contains(e.target)) {
        console.log(e.target);
      return;
    }
    element = document.getElementsByClassName("dropdown-content");
    console.log("@");
      for (var i = 0; i < element.length; i += 1) {
        element[i].style.visibility = "hidden";
      }
      displayFlag=false;
  };
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
  return (
    <div className="dropdown" onClick={event => divposition(event)} ref={node}>
      <span>...</span>
      <div className="dropdown-content" >
        {name.map(element => (
          <div key={element}>
            <input type="checkbox" value={element} />
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};

DropDownCss.defaultProps={
    hasShowCheckbox: false,
    name: ["hello", "hii", "hey"]
}

DropDownCss.propTypes = {
    name: PropTypes.array
  };

export default DropDownCss;
