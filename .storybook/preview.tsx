import '../src/index.css'
import "../src/theme.css"
import { Provider } from '../src/components/provider'
import type { Preview, } from "@storybook/react"
import React from "react"

const withThemeProvider = (Story, context) => {
  const theme = context.globals.theme;

  return <Provider theme={theme} >
    <Story />
  </Provider>
};



export const globalTypes = {
  theme: {
    name: 'Theme',
    defaultValue: 'light',
    toolbar: {
      // The icon for the toolbar item
      icon: 'circlehollow',
      // Array of options
      items: [
        { value: 'light', icon: 'circlehollow', title: 'light' },
        { value: 'dark', icon: 'circle', title: 'dark' },
      ],
      // Property that specifies if the name of the item will be displayed
      dynamicTitle: true,
    },
  },
}

const preview: Preview = {
  decorators: [withThemeProvider],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}


export default preview
