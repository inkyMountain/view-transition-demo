import React, { useRef, useState } from "react"
import "./Home.scss"
import { useNavigate, useSearchParams } from "react-router-dom"
import { flushSync } from "react-dom"
import { Property } from "csstype"

interface IProps {}

const Home: React.FunctionComponent<IProps> = () => {
  const navigate = useNavigate()
  const colors: Array<Property.Color> = ["lightblue", "lightgreen", "pink"]
  const colorElementRefs = useRef<Array<HTMLDivElement | null>>([])
  const [searchParams] = useSearchParams()
  const [animateElementIndex, setAnimateElementIndex] = useState(
    Number(searchParams.get("animate-element-index")) ?? 0,
  )

  return (
    <div className="home">
      {colors.map((color, index) => {
        return (
          <div
            className="color"
            key={color}
            style={{
              backgroundColor: color,
              height: 100,
              viewTransitionName:
                index === animateElementIndex ? "image" : undefined,
            }}
            ref={(r) => {
              colorElementRefs.current[index] = r
            }}
            data-color={color}
            onClick={() => {
              // 把点击的元素的 viewTransitionName 设置成 image，
              // 和 Detail 中的 div 的 viewTransitionName 同名。
              flushSync(() => {
                setAnimateElementIndex(index)
              })
              document.startViewTransition(() => {
                flushSync(() => {
                  // 把用户点击了第几个元素，放到查询参数上。
                  // 这是为了从 Detail 页面返回时，animateElementIndex 有正确的值。
                  // 否则详情页的div就会缩放到 index = 0 的 color div 上。
                  const search = new URLSearchParams({
                    "animate-element-index": index.toString(),
                  })
                  navigate(`/detail?${search.toString()}`)
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
