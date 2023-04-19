import React from "react"

export type LazyOption = {
  fallback: React.ReactNode
}

export function dynamic<T extends React.FunctionComponent<any>>(
  load: () => Promise<{ default: T }>,
  option?: LazyOption,
) {
  const Component = React.lazy<T>(load)
  const Lazy = function (props: React.ComponentProps<typeof Component>) {
    const [isMounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      if (!isMounted) {
        setMounted(true)
      }
    })

    return (
      <React.Suspense fallback={option?.fallback || <span />}>
        {isMounted && <Component {...props} />}
      </React.Suspense>
    )
  }

  return Lazy
}
