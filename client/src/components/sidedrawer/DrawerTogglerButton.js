import React from 'react';
import './DrawerTogglerButton.css'
const DrawerTogglerButton = props =>{
  return(
    <button className="toggle-button" onClick={props.click}>
              <div className="toggle-button-line">    </div>
            <div className="toggle-button-line">    </div>
            <div className="toggle-button-line">    </div>
    </button>

  );
}
export default DrawerTogglerButton