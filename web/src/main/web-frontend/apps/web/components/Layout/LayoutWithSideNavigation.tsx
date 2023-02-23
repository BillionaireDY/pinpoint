import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FaNetworkWired, FaChartLine, FaCog, FaUserCog, FaChartBar, FaServer, FaUserCircle } from 'react-icons/fa';
import { Sidebar, Menu, MenuItem, SubMenu, Divider, menuItemStyles, bottomMenuItemStyles } from '@pinpoint-fe/ui';

interface LayoutWithSideNavigationProps {
  children: React.ReactNode;
}

export const LayoutWithSideNavigation = ({
  children,
}: LayoutWithSideNavigationProps) => {
  function handleClickScaleButton({ small }: { small: boolean }) {
    // TODO save localstorage
  }

  return (
    <StyledContainer>
      <div style={{display: 'flex', height: '100vh'}}>
        <Sidebar>
          <Menu menuItemStyles={menuItemStyles}>
            <MenuItem icon={<FaNetworkWired />}>Servermap</MenuItem>
            <MenuItem icon={<FaChartLine />}>Inspector</MenuItem>
            <MenuItem icon={<FaChartBar />}>URL Statistic</MenuItem>
            <MenuItem icon={<FaServer />}>Infrastructure</MenuItem>
          </Menu>
          <Menu
            style={{ marginTop: 'auto' }}
            menuItemStyles={{
              ...menuItemStyles,
              ...bottomMenuItemStyles,
            }}
          >
            <SubMenu
              icon={<FaCog />}
              label="Configuration"
            >
              <MenuItem>User Group</MenuItem>
              <MenuItem>Authentication & Alarm</MenuItem>
              <MenuItem>Webhook</MenuItem>
              <MenuItem>Installation</MenuItem>
              <Divider />
              <MenuItem>Help</MenuItem>
              <MenuItem>Yobi</MenuItem>
              <Divider />
              <MenuItem>Experimental</MenuItem>
            </SubMenu>
            <SubMenu
              icon={<FaUserCircle />}
              label="User"
            >
              <MenuItem>General</MenuItem>
              <MenuItem>User Profile</MenuItem>
              <Divider />
              <MenuItem>Log Out</MenuItem>
              <Divider />
              <MenuItem>Theme</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
      </div>
      <div css={css`flex:1;`}>
        {children}
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
`

const BottomAlignedMenus = styled.div`
  margin-top: auto;
`

export const getLayoutWithSideNavigation = (page: React.ReactNode) => {
  return (
    <LayoutWithSideNavigation>
      {page}
    </LayoutWithSideNavigation>
  )
}


