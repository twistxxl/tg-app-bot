import React from "react";
import './Button.css';


const Button = (props) => {

    return ( 
        <button {...props} className={ 'button'  + props.className}>Кнопка</button>
    );
}
 
export default Button;