import React from 'react';
import { NavLink } from 'react-router-dom';
const SignedOutLinks = ()=> {
   return (
    <ul className="right">
        <li><NavLink to="/">New Reimburse</NavLink></li>
        <li><NavLink to="/">Sign In</NavLink></li>
        <li><NavLink to="/" className="btn btn-floating pink lighten-1">ZZ</NavLink></li>
    </ul>
   );
    
}
 
export default SignedOutLinks;