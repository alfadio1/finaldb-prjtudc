import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #007bff;
  padding: 10px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

function Navbar() {
  return (
    <NavbarContainer>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/search">Search</NavLink>
      <NavLink to="/connections">Connections</NavLink>
      <NavLink to="/chat">Chat</NavLink>
      <NavLink to="/" onClick={() => localStorage.clear()}>
        Logout
      </NavLink>
    </NavbarContainer>
  );
}

export default Navbar;
