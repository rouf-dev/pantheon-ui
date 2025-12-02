import type { Preview } from '@storybook/react-vite'

// Import global styles (Tailwind + design tokens)
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#092b3a' },
      ],
    },
  },
};

export default preview;