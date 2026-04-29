export {}

declare global {
  interface Window {
    Jupiter: {
      init: (config: object) => void
      close: () => void
      resume: () => void
      syncProps: (props: object) => void
      _instance?: unknown
    }
  }
}