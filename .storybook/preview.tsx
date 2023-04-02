import '../src/styles/index.css'

import React from "react"
import { Provider } from "../src/components/provider"

export const parameters = {
  themeSwitcher: {
    themes: ["light", "dark"],
    dataAttribute: "theme"
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


const preview = {
  decorators: [
    (Story) => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
};

export default preview;