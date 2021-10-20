import type { Theme } from 'theme-ui'

export const theme: Theme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
  cards: {
    primary: {
      bg: '#F9F9F9',
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.08)',
      transition: '0.6s ease',
      width: '310px',
    }
  },
  images: {
    card: {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      width: '100%',
      height: '180px',
    },
  }
}