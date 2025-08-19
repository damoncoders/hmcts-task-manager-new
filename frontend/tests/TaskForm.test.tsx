import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import TaskForm from '../components/TaskForm'

// Mock the shadcn components
jest.mock('@/components/ui/form', () => ({
  Form: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormField: ({ control, name, render }: any) => render({ 
    field: { 
      value: '', 
      onChange: jest.fn(),
      name,
      ref: jest.fn()
    } 
  }),
  FormItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormLabel: ({ children }: { children: React.ReactNode }) => (
    <label htmlFor={children?.toString().toLowerCase().replace(/\s+/g, '_')}>
      {children}
    </label>
  ),
  FormControl: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormMessage: () => null,
}))

jest.mock('@/components/ui/input', () => ({
  Input: (props: any) => (
    <input 
      {...props} 
      id={props.name.toLowerCase().replace(/\s+/g, '_')}
    />
  ),
}))

jest.mock('@/components/ui/textarea', () => ({
  Textarea: (props: any) => (
    <textarea 
      {...props} 
      id={props.name.toLowerCase().replace(/\s+/g, '_')}
    />
  ),
}))

jest.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <select 
      value={value} 
      onChange={e => onValueChange(e.target.value)}
      id="status"
    >
      <option value="pending">Pending</option>
      <option value="in_progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  ),
  SelectTrigger: () => null,
  SelectValue: () => null,
  SelectContent: () => null,
  SelectItem: () => null,
}))

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  }
}))

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: (cb: any) => (data: any) => cb(data),
    formState: { 
      errors: {},
      isSubmitting: false,
      isValid: true 
    },
    reset: jest.fn(),
    setValue: jest.fn(),
    control: {
      register: jest.fn(),
      unregister: jest.fn(),
      getFieldState: jest.fn(),
      _names: {
        array: new Set(),
        mount: new Set(),
        unMount: new Set(),
        watch: new Set(),
        focus: '',
        watchAll: false
      },
      _subjects: {
        watch: jest.fn(),
        array: jest.fn(),
        state: jest.fn()
      },
      _getWatch: jest.fn(),
      _formValues: {},
      _defaultValues: {}
    }
  }),
}))

// Mock zod and resolvers
jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => async (values: any) => ({
    values,
    errors: {}
  })
}))

jest.mock('zod', () => ({
  z: {
    object: () => ({
      shape: {
        title: { _def: { checks: [{ kind: 'min', value: 1 }] } },
        description: { _def: { checks: [] } },
        status: { _def: { values: ['pending', 'completed', 'in_progress'] } },
        due_date: { _def: { checks: [{ kind: 'min', value: 1 }] } }
      }
    }),
    string: () => ({
      min: () => ({
        optional: () => ({}),
      }),
      optional: () => ({}),
    }),
    enum: (values: string[]) => ({
      _def: {
        values: values
      }
    })
  }
}))

describe('TaskForm', () => {
  it('renders all form fields', () => {
    render(<TaskForm />)

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
  })
})