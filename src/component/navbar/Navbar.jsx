import React from 'react';
import {Link} from 'react-router-dom'

export default function Navbar() {
  return <div>
         <nav className="navbar navbar-expand-sm navbar-light bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">< i className='fa fa-mobile text-warning'/>contact

                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarID"
                    aria-controls="navbarID" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarID">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        
                    </div>
                </div>
            </div>
        </nav>
  </div>;
}
