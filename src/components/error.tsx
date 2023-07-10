import { ErrorBoundary, useErrorBoundary } from "react-error-boundary"
import { dialog } from "./dialog"
import { useEffect } from "react"

type ChildrenProps = {
  children: React.ReactNode
}

type ErrorDialogProps = {
  error: any
  resetErrorBoundary: () => void
}

async function showError(error: any) {
  return await dialog.show({
    title: "Error",
    type: "error",
    description: `${error.message} [${error.name}]`,
  })
}

const logError = (error: Error, info: { componentStack: string }) => {
  console.error(`[ERROR] Tawasukha UI : ${info.componentStack}`, error)
}

function ErrorDialog({ error, resetErrorBoundary }: ErrorDialogProps) {
  useEffect(() => {
    void (async () => {
      const result = await showError(error)

      if (result.ok) {
        resetErrorBoundary()
      }
    })()
  }, [error, resetErrorBoundary])

  return <></>
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
  return { setError: showBoundary, showError }
}
