/* eslint-disable react/prop-types */
import React from "react"
import { dialog } from "./dialog"

type ErrorHandlerState = { error: Error | null; catched: boolean }

export interface ErrorHandlerProps {
  onResetKeysChange?: (
    prevResetKeys: unknown[] | undefined,
    resetKeys: unknown[] | undefined
  ) => void
  onReset?: (...args: unknown[]) => void
  resetKeys?: unknown[]
}

const ErrorContext = React.createContext<any>(undefined)

const changedArray = (a: unknown[] = [], b: unknown[] = []) =>
  a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]))

const initialState: ErrorHandlerState = { error: null, catched: false }

export class ErrorHandler extends React.Component<
  React.PropsWithRef<React.PropsWithChildren<ErrorHandlerProps>>,
  ErrorHandlerState
> {
  static contextType = ErrorContext
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  state = initialState
  resetErrorHandler = (...args: unknown[]) => {
    this.props.onReset?.(...args)
    this.reset()
  }

  setError = (error: any) => {
    this.setState(() => ({ error, catched: true }))
  }

  reset() {
    this.setState(initialState)
  }

  async componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.resetErrorHandler()
    console.error(JSON.stringify(info), error)
    await dialog.show({
      title: "Error",
      type: "error",
      description: `${error.message} [${error.name}]`,
    })
  }

  async componentDidUpdate(
    prevProps: ErrorHandlerProps,
    prevState: ErrorHandlerState,
  ) {
    const { error, catched } = this.state
    const { resetKeys } = this.props

    if (catched && !!error) {
      const result = await dialog.show({
        title: "Error",
        type: "error",
        description: `${error.message} [${error.name}]`,
      })
      if (result.ok) {
        this.reset()
      }
    }

    if (
      error !== null &&
      prevState.error !== null &&
      changedArray(prevProps.resetKeys, resetKeys)
    ) {
      this.props.onResetKeysChange?.(prevProps.resetKeys, resetKeys)
      this.reset()
    }
  }

  render() {
    return (
      <ErrorContext.Provider
        value={{ error: this.state.error, setError: this.setError }}
      >
        {this.props.children}
      </ErrorContext.Provider>
    )
  }
}

export function useErrorHandler(givenError?: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (givenError != null) throw givenError
  const { setError } = React.useContext(ErrorContext)
  return { setError }
}
