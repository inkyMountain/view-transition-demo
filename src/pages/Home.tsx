import React, { useRef } from "react"
import "./Home.scss"
import { useNavigate } from "react-router-dom"
import { flushSync } from "react-dom"
import { Property } from "csstype"
import { useViewTransitionStore } from "../store/viewTransition"

interface IProps {}

const Home: React.FunctionComponent<IProps> = () => {
  const navigate = useNavigate()
  const colors: Array<Property.Color> = ["lightblue", "lightgreen", "pink"]
  const colorElementRefs = useRef<Array<HTMLDivElement | null>>([])
  const viewTransitionStore = useViewTransitionStore()

  return (
    <div className="home">
      {colors.map((color, index) => {
        return (
          <div
            className={`color ${color}`}
            key={color}
            style={{
              backgroundColor: color,
              height: 100,
              viewTransitionName:
                color === viewTransitionStore.activeColor ? "image" : undefined,
            }}
            ref={(r) => {
              colorElementRefs.current[index] = r
            }}
            data-color={color}
            onClick={() => {
              // 把点击的元素的 viewTransitionName 设置成 image，
              // 和 Detail 中的 div 的 viewTransitionName 同名。
              viewTransitionStore.setActiveColor(color)
              document.startViewTransition(() => {
                flushSync(() => {
                  navigate(`/detail`)
                })
              })
            }}
          >
            {color}
          </div>
        )
      })}
    </div>
  )
}

export default Home
