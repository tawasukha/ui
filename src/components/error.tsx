import { ErrorBoundary, useErrorBoundary } from "react-error-boundary"
import { dialog } from "./dialog"
import { useEffect } from "react"

type ErrorDialogProps = {
  error: any
  resetErrorBoundary: () => void
}

function ErrorDialog({ error, resetErrorBoundary }: ErrorDialogProps) {
  useEffect(() => {
    void (async () => {
      const result = await dialog.show({
        title: "Error",
        type: "error",
        description: `${error.message} [${error.name}]`,
      })

      if (result.ok) {
        resetErrorBoundary()
      }
    })()
  }, [error, resetErrorBoundary])

  return <></>
}

type ChildrenProps = {
  children: React.ReactNode
}

const logError = (error: Error, info: { componentStack: string }) => {
  console.error(info.componentStack, error)
}

export function ErrorHandler({ children }: ChildrenProps) {
  return (
    <ErrorBoundary onError={logError} FallbackComponent={ErrorDialog}>
      {children}
    </ErrorBoundary>
  )
}

export function useErrorHandler() {
  const { showBoundary } = useErrorBoundary()
  return { setError: showBoundary }
}
