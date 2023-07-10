import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react"

import { hexGen, type Hex, registerContainer, unregisterContainer, DEFAULT_SCOPE } from "./utils"

import {
  type ContainerRef,
  type ContainerProps,
  type Instance,
  type InstanceId,
  type InstanceCreator,
  type InstanceOptions,
} from "./types"

const InstanceContainer: React.ForwardRefRenderFunction<ContainerRef, ContainerProps> = (
  props,
  ref,
) => {
  const { scope = DEFAULT_SCOPE } = props || {}

  const propsRef = useRef(props)

  const [instances, setInstances] = useState<Record<string, Instance>>({})
  const [hashStack, setHashStack] = useState<Hex[]>([])

  const resolve = useCallback(
    (hash: InstanceId, v: any) => {
      instances?.[hash]?.resolve(v)
    },
    [instances],
  )
  const resolveAll = useCallback(
    (v: any) => {
      Object.values(instances).forEach((i) => {
        i.resolve(v)
      })
    },
    [instances],
  )

  const reject = useCallback(
    (hash: InstanceId, r: any) => {
      instances?.[hash]?.reject(r)
    },
    [instances],
  )
  const rejectAll = useCallback(
    (r: any) => {
      Object.values(instances).forEach((i) => {
        i.reject(r)
      })
    },
    [instances],
  )
  const hasInstance = useCallback(
    (hash: InstanceId) => !!hashStack.find((id) => id === hash),
    [hashStack],
  )
  const getInstance = useCallback((hash: InstanceId) => instances?.[hash], [instances])

  const remove = (hash: InstanceId, options: InstanceOptions): void => {
    setHashStack((stack) => stack.filter((s) => s !== hash))

    setTimeout(() => {
      setInstances((instances) => {
        const { [hash]: _, ...omitHash } = instances

        return omitHash
      })
    }, options?.exitTimeout)

    props.onRemove?.(hash)
  }

  const create: InstanceCreator = async (Component, options = {}, instanceProps) =>
    await new Promise((resolve, reject) => {
      const hash = instanceProps?.instanceId || hexGen()

      const { enterTimeout, exitTimeout, isAppendIntances, onResolve, onReject } = propsRef.current

      const instanceOptions = {
        enterTimeout,
        exitTimeout,
        instanceId: hash,
        ...options,
      }

      const instance: Instance = {
        Component,
        props: { ...options, ...instanceProps },
        resolve: (v) => {
          removeRef.current(hash, instanceOptions)
          resolve(v)
          onResolve?.(v, hash)
        },
        reject: (r) => {
          removeRef.current(hash, instanceOptions)
          reject(r)
          onReject?.(r, hash)
        },
        ...instanceOptions,
      }

      setInstances((instances) =>
        isAppendIntances
          ? {
              ...instances,
              [hash]: instance,
            }
          : {
              [hash]: instance,
              ...instances,
            },
      )

      setTimeout(() => {
        setHashStack((stack) => [...stack, hash])
        propsRef.current.onOpen?.(hash, instance)
      }, instanceOptions.enterTimeout)
    })

  const removeRef = useRef(remove)
  const createRef = useRef(create)

  useEffect(() => {
    propsRef.current = props
    removeRef.current = remove
    createRef.current = create
  })

  useImperativeHandle(ref, () => ({
    create: createRef.current,
    resolve,
    reject,
    resolveAll,
    rejectAll,
    hasInstance,
    getInstance,
  }))

  useEffect(() => {
    registerContainer(scope, {
      create: createRef.current,
      resolve,
      reject,
      resolveAll,
      rejectAll,
      hasInstance,
      getInstance,
    })

    return () => {
      unregisterContainer(scope)
    }
  }, [scope])

  const mapKeys = useMemo(() => {
    const keys = Object.keys(instances)

    return keys.map((key) => {
      const { Component, props, resolve, reject } = instances[key]

      const isOpen = !!hashStack.find((h) => h === key)

      return (
        <Component
          {...props}
          key={key}
          isOpen={isOpen}
          onReject={reject}
          onResolve={resolve}
          /** @deprecated **/
          close={resolve}
          /** @deprecated **/
          open={isOpen}
        />
      )
    })
  }, [instances, hashStack])

  return <>{mapKeys}</>
}

export const Container = forwardRef(InstanceContainer)

Container.defaultProps = {
  exitTimeout: 500,
  enterTimeout: 50,
}
