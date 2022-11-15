import React from 'react';
import {
  MDBContainer,
}
from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom'

function Home() {
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <div className="text-center">
        <p><Link to={"/login"}> Login </Link></p>
      </div>

      <div className="text-center">
        <p><Link to={"/register"}> Register </Link></p>
      </div>

    </MDBContainer>
  );
}

export default Home;