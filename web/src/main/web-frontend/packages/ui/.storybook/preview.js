// .storybook/preview.js
import '../styles/theme.css';
import 'react-datepicker/dist/react-datepicker.css';
import { IconContext } from 'react-icons';
import { GlobalStyle } from '../components/Styled/GlobalStyle';
import { SidebarProvider } from '../components/SideNavigation/SideNavigation';
// import { Sidebar, Menu, MenuItem, useProSidebar, ProSidebarProvider } from 'react-pro-sidebar';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <>
      {GlobalStyle}
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Story />
      </IconContext.Provider>
    </>
  ),
];
