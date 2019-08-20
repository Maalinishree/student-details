import React from "react";

const DropDownStyle = () =>{
   const name=['hello','hii','hey'];
    return(
        <select>
            <option value="" selected disabled hidden >...</option>
            {name.map(element=>(
                <option value={element}>{element}</option>
            ))}
        </select>
    );

}
 export default DropDownStyle;