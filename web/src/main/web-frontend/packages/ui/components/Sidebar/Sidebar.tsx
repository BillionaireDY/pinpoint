import React from 'react';
import styled from '@emotion/styled';
import { FaPlus, FaMinus, FaChartLine, FaNetworkWired, FaChartBar, FaServer, FaCog, FaUserCircle } from 'react-icons/fa';
import { 
  useProSidebar, 
  Menu, 
  MenuItem, 
  Sidebar as ProSidebar, 
  ProSidebarProvider as SidebarProvider, 
  SubMenu,
  sidebarClasses,
} from 'react-pro-sidebar';
import { NextLink } from '../NextLink';
import { StyleFlexVHCentered } from '../Styled';

export interface SideNavigationProps {
  children?: React.ReactNode;
}

const Sidebar = ({
  children,
}: SideNavigationProps) => {
  const { collapseSidebar, collapsed } = useProSidebar();

  return (
    <StyledSidebar
      width={'200px'}
      rootStyles={{
        color: 'var(--snb-text)',
        [`.${sidebarClasses.container}`]: {
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--snb-background)',
          paddingBottom: 40,
        }
      }}
    >
      <StyledHeaderContainer {...{ collapsed }}>
        <NextLink href={'/serverMap'} replace>
          <img
            src={collapsed
              ? '/assets/img/mini-logo.png'
              : '/assets/img/logo.png'
            }
            alt={'pinpoint-logo'}
          />
        </NextLink>
        <StyledScaleButton
          {...{ collapsed }}
          className='scale-button-wrapper'
          onClick={() => collapseSidebar()}
        >
          {collapsed
            ? <FaPlus />
            : <FaMinus />
          }
        </StyledScaleButton>
      </StyledHeaderContainer>
      <React.Fragment>
        {children}
      </React.Fragment>
    </StyledSidebar>
  );
};

const Divider = styled.div`
  height: 0;
  padding: 0;
  border-bottom: 1px solid var(--blue-700);
`

const menuItemStyles = {
  icon: {
    fontSize: '1.25em',
  },
  button: {
    height: 45,
    '&:hover': {
      backgroundColor: 'var(--blue-800)',
    }
  },
  subMenuContent: {
    backgroundColor: 'var(--snb-submenu-background)',
  }
}

const bottomMenuItemStyles = {
  button: {
    height: 40,
    '&:hover': {
      backgroundColor: 'var(--blue-700)',
    }
  },
}

export {
  Menu,
  MenuItem,
  SidebarProvider,
  Sidebar,
  SubMenu,
  Divider,
  menuItemStyles,
  bottomMenuItemStyles,
}

const StyledHeaderContainer = styled.div<{ collapsed?: boolean; }>`
  position: relative;
  height: 120px;
  min-height: 120px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: 100%;
  ${({ collapsed }) => {
    if (collapsed) {
      return {
        justifyContent: 'center',
        paddingLeft: '0px',
        textAlign: 'center',
      }
    }
  }}

  &:hover {
    background-color: var(--blue-700);
  }

  &:hover > .scale-button-wrapper {
    display: flex;
  }
`

const StyledScaleButton = styled.button<{ collapsed?: boolean; }>`
  ${StyleFlexVHCentered};
  position: absolute;
  display: none;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    font-weight: bold;
    background-color: var(--blue-900);
  }
`

const StyledSidebar = styled(ProSidebar)<{ collapsed?: boolean }>`
  --snb-background: linear-gradient(170deg, var(--blue-400), var(--blue-900));
  --snb-border: var(--header-border);
  --snb-text: var(--text-knockout);
  --snb-logo-hover: var(--blue-700);
  --snb-scale-button-hover: var(--blue-900);
  --snb-link-item-hover: var(--blue-800);
  --snb-child-link-background: var(--blue-700);
  --snb-child-link-item-hover: var(--blue-900);
  --snb-child-link-title: var(--blue-900);
  --snb-theme-hover: var(--snb-child-link-background);
  --snb-submenu-background: var(--blue-900);
  
  .dark-mode {
    --snb-background: linear-gradient(170deg, var(--background-primary-darker), var(--background-primary));
    --snb-border: var(--border-primary-lighter);
    --snb-text: var(--text-primary);
    --snb-logo-hover: var(--blue-grey-50);
    --snb-scale-button-hover: var(--blue-grey-100);
    --snb-link-item-hover: var(--grey-300);
    --snb-child-link-background: var(--background-layer);
    --snb-child-link-item-hover: var(--grey-400);
    --snb-child-link-title: var(--blue-grey-100);
    --snb-theme-hover: var(--snb-child-link-background);
  }
  
  /* border-right: 1px solid var(--snb-border);
  display: flex;
  flex-direction: column; */
  /* background: var(--snb-background); */

  /* height: 100vh;
  padding: 0 0 50px;
  color: var(--snb-text);
  z-index: 99; */
`;

