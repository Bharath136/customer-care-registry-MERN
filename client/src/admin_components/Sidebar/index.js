import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  background-color: #333;
  color: white;
  transition: width 0.3s ease;
  height:90vh;
  margin-top:10vh;
  width:340px;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const SidebarTitle = styled.h1`
  font-size: 1.5rem;
  margin-left: ${(props) => (props.isSidebarHidden ? '0' : '20px')};
  transition: margin-left 0.3s ease;
`;

const NavItem = styled.li`
  list-style: none;
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  padding: 10px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #555;
  }
`;

const Icon = styled.i`
  margin-right: 10px;
  font-size: 1.2rem;
`;

const Sidebar = ({ isSidebarHidden }) => {
  const data = [
    {
      path: '/admin/dashboard',
      icon: 'fas fa-chart-bar',
      name: 'Dashboard',
    },
    {
      path: '/admin/customers',
      icon: 'fas fa-users',
      name: 'Customers',
    },
    {
      path: '/admin/complaints',
      icon: 'fas fa-exclamation-triangle',
      name: 'Complaints',
    },
    {
      path: '/admin/agents',
      icon: 'fas fa-user-friends',
      name: 'Agents',
    },
  ];

  return (
    <SidebarContainer isSidebarHidden={isSidebarHidden}>
      <SidebarHeader>
        <SidebarTitle isSidebarHidden={isSidebarHidden}>Customer Registry</SidebarTitle>
      </SidebarHeader>
      <ul>
        {data.map((item) => (
          <NavItem key={item.name}>
            <NavLink href={item.path}>
              <Icon className={item.icon} />
              {!isSidebarHidden && item.name}
            </NavLink>
          </NavItem>
        ))}
      </ul>
    </SidebarContainer>
  );
};

export default Sidebar;
