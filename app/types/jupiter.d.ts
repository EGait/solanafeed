export {}

declare global {
  interface Window {
    Jupiter: {
      init: (config: object) => void
      close: () => void
      syncProps: (props: object) => void
      _instance?: unknown
    }
  }
}