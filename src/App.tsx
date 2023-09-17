import React, { useEffect } from "react"
import { Outlet, useNavigate, useSearchParams } from "react-router-dom"
import { flushSync } from "react-dom"

interface IProps {}

const App: React.FunctionComponent<IProps> = () => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (!window.navigation) {
      return
    }
    window.navigation?.addEventListener("navigate", () => {
      // console.log("event ===========>", event)
      // event.preventDefault()
      // event.intercept({
      //   handler() {
      //     navigation?.traverseTo(event.destination.key)
      //   },
      // })
      // if (event.userInitiated) {
      //   event.intercept({
      //     handler() {
      //       // navigation?.traverseTo(event.destination.key)
      //       // const pathname = new URL(event.destination.url).pathname
      //       // navigate(pathname)
      //       const isBack =
      //         event.destination.index < navigation?.currentEntry?.index
      //       // navigate(isBack ? -1 : 1)
      //       navigate(-1)
      //     },
      //   })
      // }
      // event.intercept({
      //   handler(...args) {
      //     console.log("args ===========>", args)
      //   },
      // })
      // event.preventDefault()
      // type NavigationType = "replace" | "push" | "traverse" | "reload"
      // const type = event.navigationType as NavigationType
      // if (event.userInitiated) {
      //   event.intercept({
      //     handler() {
      //       console.log(111)
      //     },
      //   })
      // }
    })

    window.navigation.addEventListener("navigateerror", (e) => {
      console.log("e ===========>", e)
    })
  }, [])

  return (
    <div className="app">
      <button
        onClick={() => {
          document.startViewTransition(() => {
            return new Promise<void>((resolve) => {
              navigate(-1)
              setTimeout(() => {
                resolve()
              }, 10)
            })
          })
        }}
      >
        back
      </button>
      <button
        onClick={() => {
          document.startViewTransition(() => {
            flushSync(() => {
              const search = new URLSearchParams({
                "animate-element-index":
                  searchParams.get("animate-element-index") ?? "0",
              })
              navigate(`/?${search.toString()}`)
            })
          })
        }}
      >
        home
      </button>
      <button
        onClick={() => {
          navigate("/xxx", {
            replace: true,
          })
        }}
      >
        replace /xxx
      </button>
      <Outlet />
    </div>
  )
}

export default App
