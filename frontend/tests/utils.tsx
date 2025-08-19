import { ReactNode } from 'react'
import { render } from '@testing-library/react'

// Create a wrapper component that provides the necessary context
function TestWrapper({ children }: { children: ReactNode }) {
  return (
    <div id="modal-root">
      {children}
    </div>
  )
}

// Create a custom render function
const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: TestWrapper, ...options })

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }