import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './Join.css';

const Join = ({name}) => {
    const [room, setRoom] = useState('');
    const [pass, setPass] = useState('');

    return (
    <div>
      <div>
        <div>
          <input placeholder="Room" className="joinInput" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <div>
          <input placeholder="Password" className="joinInput mt-20" type="text" onChange={(event) => setPass(event.target.value)} />
        </div>
        <Link onClick={e => (!room || !pass) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}&pass=${pass}`}>
        <div className="col s6">
        <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              type = "submit"
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Join Now
            </button>
            </div>
        </Link>
      </div>
    </div>
    )

};

export default Join;