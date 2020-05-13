import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {
      users
        ? (
          <div>
            <h4>People currently chatting:</h4>
            <div className="activeContainer">
              <h5>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                       {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h5>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;