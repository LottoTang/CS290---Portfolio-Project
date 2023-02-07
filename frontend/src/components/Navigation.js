import React from 'react';
import { Link } from 'react-router-dom';
import { MdAddchart, MdOutlineEditNote } from 'react-icons/md';
import { HiOutlineHome } from 'react-icons/hi';


function Navigation() {
  return (
    <nav>
      <Link to="../add-exercise"> 
        <MdAddchart className='icon'/> Add Record 
      </Link>

      <Link to="/"> 
        <HiOutlineHome className='icon'/> Home 
      </Link>
      
    </nav>
  );
}

export default Navigation;
