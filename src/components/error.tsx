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

type ErrorDialogProps = {
  error: any
  retry: boolean
  reset: () => void
}
type ErrorState = { didCatch: boolean; error: any; retry: boolean }
type ErrorContextType = {
  didCatch: boolean
  error: any
  setError: (error: any, retry?: boolean) => void
  reset: () => void
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined)
const initialState: ErrorState = {
  retry: false,
  didCatch: false,
  error: null,
}

function ErrorDialog({ error, reset, retry }: ErrorDialogProps) {
  useEffect(() => {
    void (async () => {
      const result = await dialog.show({
        title: "Error",
        type: "error",
        description: `${error.message} [${error.name}]`,
      })

      if (result.ok) {
        if (retry) reset()
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

  setError = (error: any, retry = false) => {
    this.setState(() => ({ error, didCatch: true, retry }))
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
    const { didCatch, error, retry = false } = this.state

    let errorDialog
    let children = this.props.children

    if (didCatch) {
      errorDialog = createElement(ErrorDialog, { error, reset: this.reset, retry })
      if (retry) {
        children = errorDialog
        errorDialog = undefined
      }
    }
    return (
      <ErrorContext.Provider
        value={{
          didCatch,
          error,
          setError: this.setError,
          reset: this.reset,
        }}
      >
        {children}
        {errorDialog}
      </ErrorContext.Provider>
    )
  }
}

export function useErrorHandler(givenError?: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (givenError != null) throw givenError
  const { setError } = useContext(ErrorContext) || {
    setError: (error: any, retry?: boolean) => {
      console.log(error)
      throw new Error("setError is not defined")
    },
  }
  return { setError }
}
