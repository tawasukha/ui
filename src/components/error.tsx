/* eslint-disable react/prop-types */
import {
  useContext,
  createContext,
  useEffect,
  createElement,
  Component,
  type PropsWithRef,
  type PropsWithChildren,
} from "react"
import { dialog } from "./dialog"

type FallbackProps = {
  error: any
  reset: () => void
}
type ErrorState = { didCatch: boolean; error: any }
type ErrorContextType = {
  didCatch: boolean
  error: any
  setError: (error: any) => void
  reset: () => void
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined)
const initialState: ErrorState = {
  didCatch: false,
  error: null,
}

function Fallback({ error, reset }: FallbackProps) {
  useEffect(() => {
    void (async () => {
      const result = await dialog.show({
        title: "Error",
        type: "error",
        description: `${error.message} [${error.name}]`,
      })

      if (result.ok) {
        reset()
      }
    })()
  }, [error, reset])

  return <></>
}

export class ErrorHandler extends Component<PropsWithRef<PropsWithChildren<any>>, ErrorState> {
  state = initialState

  static getDerivedStateFromError(error: Error) {
    return { didCatch: true, error }
  }

  setError = (error: any) => {
    this.setState(() => ({ error, didCatch: true }))
  }

  reset = () => {
    const { error } = this.state
    if (error !== null) {
      this.setState(initialState)
    }
  }

  componentDidUpdate(_: any, prevState: ErrorState) {
    const { didCatch } = this.state

    if (didCatch && prevState.error !== null) {
      this.setState(initialState)
    }
  }

  render() {
    const { didCatch, error } = this.state

    let children = this.props.children

    if (didCatch) {
      children = createElement(Fallback, { error, reset: this.reset })
    }
    return (
      <ErrorContext.Provider
        value={{ didCatch, error, setError: this.setError, reset: this.reset }}
      >
        {children}
      </ErrorContext.Provider>
    )
  }
}

export function useErrorHandler(givenError?: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (givenError != null) throw givenError
  const { setError } = useContext(ErrorContext) || {
    setError: (error: any) => {
      console.log(error)
      throw new Error("setError is not defined")
    },
  }
  return { setError }
}
