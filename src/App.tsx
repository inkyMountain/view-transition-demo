import React from "react"
import { Outlet, useNavigate, useSearchParams } from "react-router-dom"
import { flushSync } from "react-dom"

interface IProps {}

const App: React.FunctionComponent<IProps> = () => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  return (
    <div className="app">
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
      <Outlet />
    </div>
  )
}

export default App
