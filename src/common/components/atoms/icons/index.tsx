import React, { cloneElement } from "react"

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
}

const IconGen = (meta: Record<string, any>) => (props: IconProps) => {
    return <img
        {...props}
        {...meta}
    />
}

export const TestIcon = IconGen({ alt: "arc-icon", src: "" })
// export const ArcIcon = IconGen({ alt: "arc-icon", src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEzIiBkPSJNMzcwLjA5NSA0MzcuMTU4YzYwLjYyLTEyOS45OTkgNC4zNzctMjg0LjUyMi0xMjUuNjE5LTM0NS4xNDEiLz48Y2lyY2xlIGN4PSIxMzQuNzIiIGN5PSIzMjcuNCIgcj0iMzUiIGZpbGw9IiMwMGYiLz48cGF0aCBkPSJNMTYxLjMwNyAzMjIuNzA5YzIuNTg1IDE0LjY1OC03LjI0MSAyOC42OTItMjEuOTAxIDMxLjI3OC0xNC42NjEgMi41ODQtMjguNjk0LTcuMjQyLTMxLjI4LTIxLjkwMy0yLjU4NS0xNC42NjIgNy4yNDEtMjguNjkzIDIxLjkwMi0zMS4yNzcgMTQuNjYtMi41ODYgMjguNjkyIDcuMjM4IDMxLjI3OSAyMS45MDJtMTIuODAyLTIuMjZjLTMuODM3LTIxLjc1NC0yNC41ODYtMzYuMjgxLTQ2LjMzOS0zMi40NDUtMjEuNzU0IDMuODM2LTM2LjI4NCAyNC41ODItMzIuNDQ3IDQ2LjMzOCAzLjgzNiAyMS43NTkgMjQuNTgzIDM2LjI4MiA0Ni4zMzggMzIuNDQ4IDIxLjc1Ni0zLjgzOCAzNi4yODQtMjQuNTgyIDMyLjQ0OC00Ni4zNDF6Ii8+PGNpcmNsZSBjeD0iMjQ0LjMiIGN5PSI5Mi44MSIgcj0iMzUiIGZpbGw9IiMwMGYiLz48cGF0aCBkPSJNMjcwLjg5NSA4OC4xMjVjMi41ODUgMTQuNjU5LTcuMjQxIDI4LjY5Mi0yMS45MDEgMzEuMjc4LTE0LjY2MSAyLjU4NS0yOC42OTQtNy4yNDEtMzEuMjc5LTIxLjkwMi0yLjU4NS0xNC42NjEgNy4yNC0yOC42OTMgMjEuOTAxLTMxLjI3OHMyOC42OTMgNy4yNCAzMS4yNzkgMjEuOTAybTEyLjgwMi0yLjI1OGMtMy44MzctMjEuNzU1LTI0LjU4NS0zNi4yODItNDYuMzM5LTMyLjQ0Ni0yMS43NTUgMy44MzUtMzYuMjg0IDI0LjU4Mi0zMi40NDcgNDYuMzM4IDMuODM3IDIxLjc1NyAyNC41ODMgMzYuMjgzIDQ2LjMzOCAzMi40NDcgMjEuNzU2LTMuODM2IDM2LjI4NC0yNC41ODEgMzIuNDQ4LTQ2LjMzOXoiLz48Y2lyY2xlIGN4PSIzNzguMjgiIGN5PSI0MTYuMTkiIHI9IjM1IiBmaWxsPSIjMDBmIi8+PHBhdGggZD0iTTQwNC44NzUgNDExLjQ5OGMyLjU4NCAxNC42NTgtNy4yNDIgMjguNjkxLTIxLjkwMSAzMS4yNzctMTQuNjYxIDIuNTg2LTI4LjY5NS03LjI0LTMxLjI4LTIxLjkwMnM3LjI0LTI4LjY5MyAyMS45MDItMzEuMjc3YzE0LjY2MS0yLjU4NiAyOC42OTIgNy4yNCAzMS4yNzkgMjEuOTAybTEyLjgwMy0yLjI2Yy0zLjgzOC0yMS43NTQtMjQuNTg2LTM2LjI4MS00Ni4zMzktMzIuNDQ1LTIxLjc1NSAzLjgzNi0zNi4yODQgMjQuNTgyLTMyLjQ0NyA0Ni4zMzggMy44MzYgMjEuNzU4IDI0LjU4MyAzNi4yODMgNDYuMzM4IDMyLjQ0N3MzNi4yODQtMjQuNTgyIDMyLjQ0OC00Ni4zNHoiLz48L3N2Zz4=" })
// export const AngleIcon = IconGen({ alt: "angle-icon", src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0icmVkIiBkPSJNMTA4LjQxNSAzMzUuNTEybDE1OS41MTQgNDQuNTE3czM1LjE3OS04OC4xMTMtNDguMTI1LTE2My44MjFMMTA4LjQxNSAzMzUuNTEyeiIgb3BhY2l0eT0iLjIiLz48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9InJlZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjEzIiBkPSJNMTA4LjQxNSAzMzUuNTEybDE1OS41MTQgNDQuNTE3czM1LjE3OS04OC4xMTMtNDguMTI1LTE2My44MjFMMTA4LjQxNSAzMzUuNTEyeiIvPjxwYXRoIGZpbGw9InJlZCIgZD0iTTM1MC43IDI5OS41NDdjLTcuNzExLjAwMS0xNC45NC0zLjQzMy0xOS41NzMtOS43M2wtLjA2NC0uMDljLTEyLjMyNi0xNy41NTUtOC43Ny00MC45NTcgMS41OTQtNTIuNTcxIDcuNjk4LTguNjI4IDE4LjQzMS0xMC40NDMgMjguNzA2LTQuODQ5bC4yNDQuMTQxYzQuODAxIDIuOTc1IDguMzc2IDYuNjI5IDExLjE2NSAxMC42OTggMS44MTctNy4yNDkgMy42MjUtMTAuMjczIDUuMDgzLTEyLjcxMy43OS0xLjMyMSAxLjE4Ni0xLjk4NCAxLjQ2My0zLjI0N2w5Ljc2OCAyLjE0M2MtLjYyNSAyLjg1Mi0xLjY1MiA0LjU3MS0yLjY0NiA2LjIzMy0xLjY0MSAyLjc0Ni00LjA5MiA2Ljg0OS02LjQwOCAyMy4xNC45MTQgMi43NjIgMS43MyA1LjU1OSAyLjU0MyA4LjMzNiAyLjQ5NiA4LjU0NCA0Ljg1NSAxNi42MTMgOS43NTEgMjIuODY1bC03Ljg3MyA2LjE2NmMtMy40MjctNC4zNzYtNS43OTMtOS4yNjUtNy42ODEtMTQuMzIzLTMuNyA4LjMzNS0xMC4wMDMgMTMuNTQ2LTE2LjMxNSAxNS45NjUtMy4yMzMgMS4yMzctNi41MzcgMS44MzYtOS43NTcgMS44MzZ6bS0xMS40ODctMTUuNjEzYzMuODc0IDUuMjIxIDEwLjk2NSA3LjAwNSAxNy42NjUgNC40MzggOS40OTEtMy42MzcgMTQuMzQyLTE0LjEzNSAxMi45NzctMjguMDgxbC0uMDU3LS41NzguMDAxLS4wMDNjLTIuNzM1LTcuNjI1LTYuMzktMTQuMzMtMTMuMzM5LTE4LjY4Ni03Ljc0NS00LjE1LTEzLjE1OC0uNzgtMTYuMzQzIDIuNzg5LTcuODQ3IDguNzk1LTEwLjA3NiAyNy4wMDQtLjkwNCA0MC4xMjF6Ii8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWExNzFiIiBzdHJva2Utd2lkdGg9IjEzIiBkPSJNMTA4LjQyIDMzNS41MUwzMzMuOCA5NC4xMW0tMjI1LjM4IDI0MS40bDI5NS4xNiA4Mi4zOCIvPjxjaXJjbGUgY3g9IjMzMy44IiBjeT0iOTQuMTEiIHI9IjM1IiBmaWxsPSIjMDBmIi8+PHBhdGggZD0iTTM1NS45MTQgNzguNjI3YzguNTM3IDEyLjE5MyA1LjU2MyAyOS4wNjQtNi42MzEgMzcuNjA0LTEyLjE5NSA4LjUzOS0yOS4wNjYgNS41NjQtMzcuNjA1LTYuNjMxcy01LjU2NC0yOS4wNjQgNi42MzEtMzcuNjA0IDI5LjA2NC01LjU2NCAzNy42MDUgNi42MzFtMTAuNjQ5LTcuNDU3Yy0xMi42NzItMTguMDk2LTM3LjYxNS0yMi40OTItNTUuNzA5LTkuODIyLTE4LjA5NiAxMi42Ny0yMi40OTYgMzcuNjEzLTkuODI0IDU1LjcwOSAxMi42NzIgMTguMDk4IDM3LjYxMyAyMi40OTUgNTUuNzA5IDkuODI0IDE4LjA5NS0xMi42NzIgMjIuNDk1LTM3LjYxMyA5LjgyNC01NS43MTF6Ii8+PGNpcmNsZSBjeD0iMTA4LjQyIiBjeT0iMzM1LjUxIiByPSIzNSIgZmlsbD0iIzAwZiIvPjxwYXRoIGQ9Ik0xMzAuNTMzIDMyMC4wMjVjOC41MzcgMTIuMTkzIDUuNTYzIDI5LjA2NC02LjYzMSAzNy42MDQtMTIuMTk1IDguNTM5LTI5LjA2NiA1LjU2NC0zNy42MDUtNi42MzFzLTUuNTY0LTI5LjA2NCA2LjYzMS0zNy42MDQgMjkuMDY0LTUuNTY0IDM3LjYwNSA2LjYzMW0xMC42NDktNy40NTdjLTEyLjY3Mi0xOC4wOTYtMzcuNjE1LTIyLjQ5Mi01NS43MDktOS44MjItMTguMDk2IDEyLjY3LTIyLjQ5NiAzNy42MTMtOS44MjQgNTUuNzA5IDEyLjY3MiAxOC4wOTggMzcuNjEzIDIyLjQ5NCA1NS43MDkgOS44MjQgMTguMDk1LTEyLjY3MiAyMi40OTYtMzcuNjEzIDkuODI0LTU1LjcxMXoiLz48Y2lyY2xlIGN4PSI0MDMuNTgiIGN5PSI0MTcuODgiIHI9IjM1IiBmaWxsPSIjMDBmIi8+PHBhdGggZD0iTTQyNS43MDIgNDAyLjM5OGM4LjUzNyAxMi4xOTMgNS41NjMgMjkuMDY0LTYuNjMxIDM3LjYwNC0xMi4xOTUgOC41MzktMjkuMDY2IDUuNTY0LTM3LjYwNS02LjYzMXMtNS41NjQtMjkuMDY0IDYuNjMxLTM3LjYwNCAyOS4wNjQtNS41NjQgMzcuNjA1IDYuNjMxbTEwLjY0OS03LjQ1N2MtMTIuNjcyLTE4LjA5Ni0zNy42MTUtMjIuNDkyLTU1LjcwOS05LjgyMi0xOC4wOTYgMTIuNjctMjIuNDk2IDM3LjYxMy05LjgyNCA1NS43MDkgMTIuNjcyIDE4LjA5OCAzNy42MTMgMjIuNDk0IDU1LjcwOSA5LjgyNCAxOC4wOTUtMTIuNjcyIDIyLjQ5NS0zNy42MTMgOS44MjQtNTUuNzExeiIvPjwvc3ZnPg==" })
// export const CircleCenterPointIcon = IconGen({ alt: "circle-center-point-icon", src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEzIiBkPSJNNDQwLjExIDI1NmMwIDEwMS41MDItODIuNDI5IDE4My43ODUtMTg0LjExIDE4My43ODUtMTAxLjY4MSAwLTE4NC4xMS04Mi4yODMtMTg0LjExLTE4My43ODVTMTU0LjMxOSA3Mi4yMTUgMjU2IDcyLjIxNWMxMDEuNjgyIDAgMTg0LjExIDgyLjI4MyAxODQuMTEgMTgzLjc4NXoiLz48Y2lyY2xlIGN4PSI0MDYuMzMiIGN5PSIxNDkuNDUiIHI9IjM1IiBmaWxsPSIjMDBmIi8+PHBhdGggZD0iTTQyOC40NDYgMTMzLjk2MWM4LjUzNyAxMi4xOTMgNS41NjMgMjkuMDY0LTYuNjMxIDM3LjYwNC0xMi4xOTUgOC41MzktMjkuMDY2IDUuNTY0LTM3LjYwNS02LjYzMXMtNS41NjQtMjkuMDY0IDYuNjMxLTM3LjYwNCAyOS4wNjQtNS41NjQgMzcuNjA1IDYuNjMxbTEwLjY0OS03LjQ1N2MtMTIuNjcyLTE4LjA5Ni0zNy42MTUtMjIuNDkyLTU1LjcwOS05LjgyMi0xOC4wOTYgMTIuNjctMjIuNDk2IDM3LjYxMy05LjgyNCA1NS43MDkgMTIuNjcyIDE4LjA5OCAzNy42MTMgMjIuNDk0IDU1LjcwOSA5LjgyNCAxOC4wOTUtMTIuNjcyIDIyLjQ5Ni0zNy42MTMgOS44MjQtNTUuNzExeiIvPjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMzUiIGZpbGw9IiMwMGYiLz48cGF0aCBkPSJNMjc4LjExOCAyNDAuNTEzYzguNTM3IDEyLjE5MyA1LjU2MyAyOS4wNjQtNi42MzEgMzcuNjA0LTEyLjE5NSA4LjUzOS0yOS4wNjYgNS41NjQtMzcuNjA1LTYuNjMxcy01LjU2NC0yOS4wNjQgNi42MzEtMzcuNjA0IDI5LjA2NC01LjU2NSAzNy42MDUgNi42MzFtMTAuNjQ5LTcuNDU3Yy0xMi42NzItMTguMDk2LTM3LjYxNS0yMi40OTItNTUuNzA5LTkuODIyLTE4LjA5NiAxMi42Ny0yMi40OTYgMzcuNjEzLTkuODI0IDU1LjcwOSAxMi42NzIgMTguMDk4IDM3LjYxMyAyMi40OTQgNTUuNzA5IDkuODI0IDE4LjA5NS0xMi42NzIgMjIuNDk1LTM3LjYxNCA5LjgyNC01NS43MTF6Ii8+PC9zdmc+" })
// export const CircleCenterRadiusIcon = IconGen({ alt: "circle-center-radius-icon", src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEzIiBkPSJNNDQwLjExIDI1NmMwIDEwMS41MDItODIuNDI5IDE4My43ODUtMTg0LjExIDE4My43ODUtMTAxLjY4MSAwLTE4NC4xMS04Mi4yODMtMTg0LjExLTE4My43ODVTMTU0LjMxOSA3Mi4yMTUgMjU2IDcyLjIxNWMxMDEuNjgyIDAgMTg0LjExIDgyLjI4MyAxODQuMTEgMTgzLjc4NXpNMjU2IDI1NmwxNTAuMzMtMTA2LjU1Ii8+PGNpcmNsZSBjeD0iMjU2IiBjeT0iMjU2IiByPSIzNSIgZmlsbD0iIzAwZiIvPjxwYXRoIGQ9Ik0yNzguMTE4IDI0MC41MTNjOC41MzcgMTIuMTkzIDUuNTYzIDI5LjA2NC02LjYzMSAzNy42MDQtMTIuMTk1IDguNTM5LTI5LjA2NiA1LjU2NC0zNy42MDUtNi42MzFzLTUuNTY0LTI5LjA2NCA2LjYzMS0zNy42MDQgMjkuMDY0LTUuNTY1IDM3LjYwNSA2LjYzMW0xMC42NDktNy40NTdjLTEyLjY3Mi0xOC4wOTYtMzcuNjE1LTIyLjQ5Mi01NS43MDktOS44MjItMTguMDk2IDEyLjY3LTIyLjQ5NiAzNy42MTMtOS44MjQgNTUuNzA5IDEyLjY3MiAxOC4wOTggMzcuNjEzIDIyLjQ5NCA1NS43MDkgOS44MjQgMTguMDk1LTEyLjY3MiAyMi40OTUtMzcuNjE0IDkuODI0LTU1LjcxMXoiLz48L3N2Zz4=" })
// export const CircumcircleIcon = IconGen({ alt: "circumcircle-icon", src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEzIiBkPSJNNDQwLjExIDI1NmMwIDEwMS41MDItODIuNDI5IDE4My43ODUtMTg0LjExIDE4My43ODUtMTAxLjY4MSAwLTE4NC4xMS04Mi4yODMtMTg0LjExLTE4My43ODVTMTU0LjMxOSA3Mi4yMTUgMjU2IDcyLjIxNWMxMDEuNjgyIDAgMTg0LjExIDgyLjI4MyAxODQuMTEgMTgzLjc4NXoiLz48Y2lyY2xlIGN4PSI0MDYuMzMiIGN5PSIxNDkuNDUiIHI9IjM1IiBmaWxsPSIjMDBmIi8+PHBhdGggZD0iTTQyOC40NDYgMTMzLjk2MWM4LjUzNyAxMi4xOTMgNS41NjMgMjkuMDY0LTYuNjMxIDM3LjYwNC0xMi4xOTUgOC41MzktMjkuMDY2IDUuNTY0LTM3LjYwNS02LjYzMXMtNS41NjQtMjkuMDY0IDYuNjMxLTM3LjYwNCAyOS4wNjQtNS41NjQgMzcuNjA1IDYuNjMxbTEwLjY0OS03LjQ1N2MtMTIuNjcyLTE4LjA5Ni0zNy42MTUtMjIuNDkyLTU1LjcwOS05LjgyMi0xOC4wOTYgMTIuNjctMjIuNDk2IDM3LjYxMy05LjgyNCA1NS43MDkgMTIuNjcyIDE4LjA5OCAzNy42MTMgMjIuNDk0IDU1LjcwOSA5LjgyNCAxOC4wOTUtMTIuNjcyIDIyLjQ5Ni0zNy42MTMgOS44MjQtNTUuNzExeiIvPjxjaXJjbGUgY3g9Ijc0LjMzIiBjeT0iMjI0LjQ1IiByPSIzNSIgZmlsbD0iIzAwZiIvPjxwYXRoIGQ9Ik05Ni40NDYgMjA4Ljk2N2M4LjUzNyAxMi4xOTMgNS41NjMgMjkuMDY0LTYuNjMxIDM3LjYwNC0xMi4xOTUgOC41MzktMjkuMDY2IDUuNTY0LTM3LjYwNS02LjYzMXMtNS41NjQtMjkuMDY0IDYuNjMxLTM3LjYwNCAyOS4wNjQtNS41NjQgMzcuNjA1IDYuNjMxbTEwLjY0OS03LjQ1N2MtMTIuNjcyLTE4LjA5Ni0zNy42MTUtMjIuNDkyLTU1LjcwOS05LjgyMi0xOC4wOTYgMTIuNjctMjIuNDk2IDM3LjYxMy05LjgyNCA1NS43MDkgMTIuNjcyIDE4LjA5NyAzNy42MTMgMjIuNDk0IDU1LjcwOSA5LjgyNCAxOC4wOTUtMTIuNjcyIDIyLjQ5Ni0zNy42MTMgOS44MjQtNTUuNzExeiIvPjxjaXJjbGUgY3g9IjMxMSIgY3k9IjQzMS40NSIgcj0iMzUiIGZpbGw9IiMwMGYiLz48cGF0aCBkPSJNMzMzLjEyMiA0MTUuOTY3YzguNTM3IDEyLjE5MyA1LjU2MyAyOS4wNjQtNi42MzEgMzcuNjA0LTEyLjE5NSA4LjUzOS0yOS4wNjYgNS41NjQtMzcuNjA1LTYuNjMxcy01LjU2NC0yOS4wNjQgNi42MzEtMzcuNjA0IDI5LjA2NC01LjU2NSAzNy42MDUgNi42MzFtMTAuNjQ5LTcuNDU3Yy0xMi42NzItMTguMDk2LTM3LjYxNS0yMi40OTItNTUuNzA5LTkuODIyLTE4LjA5NiAxMi42Ny0yMi40OTYgMzcuNjEzLTkuODI0IDU1LjcwOSAxMi42NzIgMTguMDk4IDM3LjYxMyAyMi40OTQgNTUuNzA5IDkuODI0IDE4LjA5NS0xMi42NzIgMjIuNDk1LTM3LjYxNCA5LjgyNC01NS43MTF6Ii8+PC9zdmc+" })
// export const LineIcon = IconGen({ alt: "line-icon", src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEzIiBkPSJNLTEwLjIyIDQ0Mi40MUw1MjIuMjMgNjkuNTkiLz48Y2lyY2xlIGN4PSIzNjIiIGN5PSIxODEuOTYiIHI9IjM1IiBmaWxsPSIjMDBmIi8+PHBhdGggZD0iTTM2MiAxNTQuOTY0YzE0Ljg4NyAwIDI3IDEyLjExMyAyNyAyNyAwIDE0Ljg4OC0xMi4xMTMgMjcuMDAxLTI3IDI3LjAwMS0xNC44ODkgMC0yNy0xMi4xMTMtMjctMjcuMDAxIDAtMTQuODg3IDEyLjExMS0yNyAyNy0yN20wLTEzYy0yMi4wOTIgMC00MCAxNy45MS00MCA0MCAwIDIyLjA5MSAxNy45MDggNDAuMDAxIDQwIDQwLjAwMXM0MC0xNy45MSA0MC00MC4wMDFjMC0yMi4wOS0xNy45MDgtNDAtNDAtNDB6Ii8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMzMwLjMiIHI9IjM1IiBmaWxsPSIjMDBmIi8+PHBhdGggZD0iTTE1MCAzMDMuMzAxYzE0Ljg4OCAwIDI3IDEyLjExMyAyNyAyNyAwIDE0Ljg4OC0xMi4xMTIgMjcuMDAxLTI3IDI3LjAwMXMtMjctMTIuMTEzLTI3LTI3LjAwMWMwLTE0Ljg4NyAxMi4xMTItMjcgMjctMjdtMC0xM2MtMjIuMDkxIDAtNDAgMTcuOTEtNDAgNDAgMCAyMi4wOTEgMTcuOTA5IDQwLjAwMSA0MCA0MC4wMDEgMjIuMDkyIDAgNDAtMTcuOTEgNDAtNDAuMDAxIDAtMjIuMDktMTcuOTA4LTQwLTQwLTQweiIvPjwvc3ZnPg==" })
// export const PointIcon = IconGen({ alt: "point-icon", src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PGNpcmNsZSBjeD0iMTY4LjciIGN5PSIzNTEuNzMiIHI9IjUzLjM4IiBmaWxsPSIjMDBmIi8+PHBhdGggZD0iTTE2OC43MDQgMzEwLjU1YzIyLjcwNCAwIDQxLjE3NSAxOC40NzIgNDEuMTc1IDQxLjE3NVMxOTEuNDA4IDM5Mi45IDE2OC43MDQgMzkyLjlzLTQxLjE3NS0xOC40NzItNDEuMTc1LTQxLjE3NVMxNDYgMzEwLjU1IDE2OC43MDQgMzEwLjU1bTAtMTkuODI1Yy0zMy42ODkgMC02MSAyNy4zMTItNjEgNjFzMjcuMzExIDYxIDYxIDYxIDYxLTI3LjMxMiA2MS02MS0yNy4zMTEtNjEtNjEtNjF6Ii8+PHBhdGggZmlsbD0iIzAwZiIgZD0iTTQyOC4xOTkgMjUyLjg3M2gtMjQuNzU1bC0xOC4xNy00NS41NDdoLTgyLjIxMmwtMTguMzk3IDQ1LjU0N2gtMjQuMDczbDcwLjYzLTE3MGgyNS40MzdsNzEuNTQgMTcwem0tNTIuNjktNjUuNTZsLTMyLjAyMS03OC40NDUtMzEuMzQgNzguNDQ0aDYzLjM2MnoiLz48L3N2Zz4=" })
// export const SegmentIcon = IconGen({ alt: "segment-icon", src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEzIiBkPSJNMTIwIDM1MC4zbDI3Mi0xODkuMzQiLz48Y2lyY2xlIGN4PSIzOTIiIGN5PSIxNjAuOTYiIHI9IjM1IiBmaWxsPSIjMDBmIi8+PHBhdGggZD0iTTM5MiAxMzMuOTY0YzE0Ljg4NyAwIDI3IDEyLjExMyAyNyAyNyAwIDE0Ljg4OC0xMi4xMTMgMjcuMDAxLTI3IDI3LjAwMS0xNC44ODkgMC0yNy0xMi4xMTMtMjctMjcuMDAxIDAtMTQuODg3IDEyLjExMS0yNyAyNy0yN20wLTEzYy0yMi4wOTIgMC00MCAxNy45MS00MCA0MCAwIDIyLjA5MSAxNy45MDggNDAuMDAxIDQwIDQwLjAwMXM0MC0xNy45MSA0MC00MC4wMDFjMC0yMi4wOS0xNy45MDgtNDAtNDAtNDB6Ii8+PGNpcmNsZSBjeD0iMTIwIiBjeT0iMzUwLjMiIHI9IjM1IiBmaWxsPSIjMDBmIi8+PHBhdGggZD0iTTEyMCAzMjMuMzAxYzE0Ljg4OCAwIDI3IDEyLjExMyAyNyAyNyAwIDE0Ljg4OC0xMi4xMTIgMjcuMDAxLTI3IDI3LjAwMXMtMjctMTIuMTEzLTI3LTI3LjAwMWMwLTE0Ljg4NyAxMi4xMTItMjcgMjctMjdtMC0xM2MtMjIuMDkxIDAtNDAgMTcuOTEtNDAgNDAgMCAyMi4wOTEgMTcuOTA5IDQwLjAwMSA0MCA0MC4wMDEgMjIuMDkyIDAgNDAtMTcuOTEgNDAtNDAuMDAxIDAtMjIuMDktMTcuOTA4LTQwLTQwLTQweiIvPjwvc3ZnPg==" })
// export const SemicircleIcon = IconGen({ alt: "semicircle-icon", src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEzIiBkPSJNMTA1LjE1MiAzNjEuNTU1Yy01OC4xOTMtODMuMTY1LTM3LjgzLTE5Ny44NDEgNDUuNDgtMjU2LjEzNiA4My4zMTEtNTguMjk2IDE5OC4wMjItMzguMTM2IDI1Ni4yMTUgNDUuMDI4Ii8+PGNpcmNsZSBjeD0iNDA2LjMzIiBjeT0iMTQ5LjQ1IiByPSIzNSIgZmlsbD0iIzAwZiIvPjxwYXRoIGQ9Ik00MjguNDQ2IDEzMy45NjFjOC41MzcgMTIuMTkzIDUuNTYzIDI5LjA2NC02LjYzMSAzNy42MDQtMTIuMTk1IDguNTM5LTI5LjA2NiA1LjU2NC0zNy42MDUtNi42MzFzLTUuNTY0LTI5LjA2NCA2LjYzMS0zNy42MDQgMjkuMDY0LTUuNTY0IDM3LjYwNSA2LjYzMW0xMC42NDktNy40NTdjLTEyLjY3Mi0xOC4wOTYtMzcuNjE1LTIyLjQ5Mi01NS43MDktOS44MjItMTguMDk2IDEyLjY3LTIyLjQ5NiAzNy42MTMtOS44MjQgNTUuNzA5IDEyLjY3MiAxOC4wOTggMzcuNjEzIDIyLjQ5NCA1NS43MDkgOS44MjQgMTguMDk1LTEyLjY3MiAyMi40OTYtMzcuNjEzIDkuODI0LTU1LjcxMXoiLz48Y2lyY2xlIGN4PSIxMDUuMzMiIGN5PSIzNjEuNTUiIHI9IjM1IiBmaWxsPSIjMDBmIi8+PHBhdGggZD0iTTEyNy40NDYgMzQ2LjA2N2M4LjUzNyAxMi4xOTMgNS41NjMgMjkuMDY0LTYuNjMxIDM3LjYwNC0xMi4xOTUgOC41MzktMjkuMDY2IDUuNTY0LTM3LjYwNS02LjYzMXMtNS41NjQtMjkuMDY0IDYuNjMxLTM3LjYwNCAyOS4wNjQtNS41NjQgMzcuNjA1IDYuNjMxbTEwLjY0OS03LjQ1N2MtMTIuNjcyLTE4LjA5Ni0zNy42MTUtMjIuNDkyLTU1LjcwOS05LjgyMi0xOC4wOTYgMTIuNjctMjIuNDk2IDM3LjYxMy05LjgyNCA1NS43MDkgMTIuNjcyIDE4LjA5OCAzNy42MTMgMjIuNDk0IDU1LjcwOSA5LjgyNCAxOC4wOTUtMTIuNjcyIDIyLjQ5Ni0zNy42MTMgOS44MjQtNTUuNzExeiIvPjwvc3ZnPg==" })
// export const CircumcircleArcIcon = IconGen({ alt: "circumcircle-arc-icon", src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEzIiBkPSJNNzQuMzE0IDIyNi4wOTlDODguNjIxIDEzOC44MTggMTY0LjUxOSA3Mi4yMTUgMjU2IDcyLjIxNWMxMDEuNjgyIDAgMTg0LjExIDgyLjI4MyAxODQuMTEgMTgzLjc4NSAwIDgyLjM3OC01NC4yOTQgMTUyLjA5Ny0xMjkuMTA5IDE3NS40NDQiLz48Y2lyY2xlIGN4PSI0MDYuMzMiIGN5PSIxNDkuNDUiIHI9IjM1IiBmaWxsPSIjMDBmIi8+PHBhdGggZD0iTTQyOC40NDYgMTMzLjk2MWM4LjUzNyAxMi4xOTMgNS41NjMgMjkuMDY0LTYuNjMxIDM3LjYwNC0xMi4xOTUgOC41MzktMjkuMDY2IDUuNTY0LTM3LjYwNS02LjYzMXMtNS41NjQtMjkuMDY0IDYuNjMxLTM3LjYwNCAyOS4wNjQtNS41NjQgMzcuNjA1IDYuNjMxbTEwLjY0OS03LjQ1N2MtMTIuNjcyLTE4LjA5Ni0zNy42MTUtMjIuNDkyLTU1LjcwOS05LjgyMi0xOC4wOTYgMTIuNjctMjIuNDk2IDM3LjYxMy05LjgyNCA1NS43MDkgMTIuNjcyIDE4LjA5OCAzNy42MTMgMjIuNDk0IDU1LjcwOSA5LjgyNCAxOC4wOTUtMTIuNjcyIDIyLjQ5Ni0zNy42MTMgOS44MjQtNTUuNzExeiIvPjxjaXJjbGUgY3g9Ijc0LjMzIiBjeT0iMjI0LjQ1IiByPSIzNSIgZmlsbD0iIzAwZiIvPjxwYXRoIGQ9Ik05Ni40NDYgMjA4Ljk2N2M4LjUzNyAxMi4xOTMgNS41NjMgMjkuMDY0LTYuNjMxIDM3LjYwNC0xMi4xOTUgOC41MzktMjkuMDY2IDUuNTY0LTM3LjYwNS02LjYzMXMtNS41NjQtMjkuMDY0IDYuNjMxLTM3LjYwNCAyOS4wNjQtNS41NjQgMzcuNjA1IDYuNjMxbTEwLjY0OS03LjQ1N2MtMTIuNjcyLTE4LjA5Ni0zNy42MTUtMjIuNDkyLTU1LjcwOS05LjgyMi0xOC4wOTYgMTIuNjctMjIuNDk2IDM3LjYxMy05LjgyNCA1NS43MDkgMTIuNjcyIDE4LjA5NyAzNy42MTMgMjIuNDk0IDU1LjcwOSA5LjgyNCAxOC4wOTUtMTIuNjcyIDIyLjQ5Ni0zNy42MTMgOS44MjQtNTUuNzExeiIvPjxjaXJjbGUgY3g9IjMxMSIgY3k9IjQzMS40NSIgcj0iMzUiIGZpbGw9IiMwMGYiLz48cGF0aCBkPSJNMzMzLjEyMiA0MTUuOTY3YzguNTM3IDEyLjE5MyA1LjU2MyAyOS4wNjQtNi42MzEgMzcuNjA0LTEyLjE5NSA4LjUzOS0yOS4wNjYgNS41NjQtMzcuNjA1LTYuNjMxcy01LjU2NC0yOS4wNjQgNi42MzEtMzcuNjA0IDI5LjA2NC01LjU2NSAzNy42MDUgNi42MzFtMTAuNjQ5LTcuNDU3Yy0xMi42NzItMTguMDk2LTM3LjYxNS0yMi40OTItNTUuNzA5LTkuODIyLTE4LjA5NiAxMi42Ny0yMi40OTYgMzcuNjEzLTkuODI0IDU1LjcwOSAxMi42NzIgMTguMDk4IDM3LjYxMyAyMi40OTQgNTUuNzA5IDkuODI0IDE4LjA5NS0xMi42NzIgMjIuNDk1LTM3LjYxNCA5LjgyNC01NS43MTF6Ii8+PC9zdmc+" })

export function ArcIcon2(props) {
    return <svg width="512" height="512" viewBox="0 0 512 512" {...props}>
        <path fill="none" strokeWidth="13" d="M370.095 437.158c60.62-129.999 4.377-284.522-125.619-345.141" />
        <circle cx="134.72" cy="327.4" r="35" fill="#00f" />
        <path d="M161.307 322.709c2.585 14.658-7.241 28.692-21.901 31.278-14.661 2.584-28.694-7.242-31.28-21.903-2.585-14.662 7.241-28.693 21.902-31.277 14.66-2.586 28.692 7.238 31.279 21.902m12.802-2.26c-3.837-21.754-24.586-36.281-46.339-32.445-21.754 3.836-36.284 24.582-32.447 46.338 3.836 21.759 24.583 36.282 46.338 32.448 21.756-3.838 36.284-24.582 32.448-46.341z" />
        <circle cx="244.3" cy="92.81" r="35" fill="#00f" />
        <path d="M270.895 88.125c2.585 14.659-7.241 28.692-21.901 31.278-14.661 2.585-28.694-7.241-31.279-21.902-2.585-14.661 7.24-28.693 21.901-31.278s28.693 7.24 31.279 21.902m12.802-2.258c-3.837-21.755-24.585-36.282-46.339-32.446-21.755 3.835-36.284 24.582-32.447 46.338 3.837 21.757 24.583 36.283 46.338 32.447 21.756-3.836 36.284-24.581 32.448-46.339z" />
        <circle cx="378.28" cy="416.19" r="35" fill="#00f" />
        <path d="M404.875 411.498c2.584 14.658-7.242 28.691-21.901 31.277-14.661 2.586-28.695-7.24-31.28-21.902s7.24-28.693 21.902-31.277c14.661-2.586 28.692 7.24 31.279 21.902m12.803-2.26c-3.838-21.754-24.586-36.281-46.339-32.445-21.755 3.836-36.284 24.582-32.447 46.338 3.836 21.758 24.583 36.283 46.338 32.447s36.284-24.582 32.448-46.34z" />
    </svg>
}

export function ArcIcon(props) {
    return <svg width="512" height="512" viewBox="0 0 512 512" {...props}>
        <path fill="none" strokeWidth="13" d="M370.095 437.158c60.62-129.999 4.377-284.522-125.619-345.141" />
        <circle cx="134.72" cy="327.4" r="35" fill="#00f" />
        <path d="M161.307 322.709c2.585 14.658-7.241 28.692-21.901 31.278-14.661 2.584-28.694-7.242-31.28-21.903-2.585-14.662 7.241-28.693 21.902-31.277 14.66-2.586 28.692 7.238 31.279 21.902m12.802-2.26c-3.837-21.754-24.586-36.281-46.339-32.445-21.754 3.836-36.284 24.582-32.447 46.338 3.836 21.759 24.583 36.282 46.338 32.448 21.756-3.838 36.284-24.582 32.448-46.341z" />
        <circle cx="244.3" cy="92.81" r="35" fill="#00f" />
        <path d="M270.895 88.125c2.585 14.659-7.241 28.692-21.901 31.278-14.661 2.585-28.694-7.241-31.279-21.902-2.585-14.661 7.24-28.693 21.901-31.278s28.693 7.24 31.279 21.902m12.802-2.258c-3.837-21.755-24.585-36.282-46.339-32.446-21.755 3.835-36.284 24.582-32.447 46.338 3.837 21.757 24.583 36.283 46.338 32.447 21.756-3.836 36.284-24.581 32.448-46.339z" />
        <circle cx="378.28" cy="416.19" r="35" fill="#00f" />
        <path d="M404.875 411.498c2.584 14.658-7.242 28.691-21.901 31.277-14.661 2.586-28.695-7.24-31.28-21.902s7.24-28.693 21.902-31.277c14.661-2.586 28.692 7.24 31.279 21.902m12.803-2.26c-3.838-21.754-24.586-36.281-46.339-32.445-21.755 3.836-36.284 24.582-32.447 46.338 3.836 21.758 24.583 36.283 46.338 32.447s36.284-24.582 32.448-46.34z" />
    </svg>
}

export function AngleIcon(props) {
    return <svg width="512" height="512" viewBox="0 0 512 512" {...props}>
        <path fill="red" d="M108.415 335.512l159.514 44.517s35.179-88.113-48.125-163.821L108.415 335.512z" opacity=".2" />
        <path fill="none" stroke="red" stroke-miterlimit="10" strokeWidth="13" d="M108.415 335.512l159.514 44.517s35.179-88.113-48.125-163.821L108.415 335.512z" />
        <path fill="red" d="M350.7 299.547c-7.711.001-14.94-3.433-19.573-9.73l-.064-.09c-12.326-17.555-8.77-40.957 1.594-52.571 7.698-8.628 18.431-10.443 28.706-4.849l.244.141c4.801 2.975 8.376 6.629 11.165 10.698 1.817-7.249 3.625-10.273 5.083-12.713.79-1.321 1.186-1.984 1.463-3.247l9.768 2.143c-.625 2.852-1.652 4.571-2.646 6.233-1.641 2.746-4.092 6.849-6.408 23.14.914 2.762 1.73 5.559 2.543 8.336 2.496 8.544 4.855 16.613 9.751 22.865l-7.873 6.166c-3.427-4.376-5.793-9.265-7.681-14.323-3.7 8.335-10.003 13.546-16.315 15.965-3.233 1.237-6.537 1.836-9.757 1.836zm-11.487-15.613c3.874 5.221 10.965 7.005 17.665 4.438 9.491-3.637 14.342-14.135 12.977-28.081l-.057-.578.001-.003c-2.735-7.625-6.39-14.33-13.339-18.686-7.745-4.15-13.158-.78-16.343 2.789-7.847 8.795-10.076 27.004-.904 40.121z" />
        <path fill="none" stroke="#1a171b" strokeWidth="13" d="M108.42 335.51L333.8 94.11m-225.38 241.4l295.16 82.38" />
        <circle cx="333.8" cy="94.11" r="35" fill="#00f" />
        <path d="M355.914 78.627c8.537 12.193 5.563 29.064-6.631 37.604-12.195 8.539-29.066 5.564-37.605-6.631s-5.564-29.064 6.631-37.604 29.064-5.564 37.605 6.631m10.649-7.457c-12.672-18.096-37.615-22.492-55.709-9.822-18.096 12.67-22.496 37.613-9.824 55.709 12.672 18.098 37.613 22.495 55.709 9.824 18.095-12.672 22.495-37.613 9.824-55.711z" />
        <circle cx="108.42" cy="335.51" r="35" fill="#00f" />
        <path d="M130.533 320.025c8.537 12.193 5.563 29.064-6.631 37.604-12.195 8.539-29.066 5.564-37.605-6.631s-5.564-29.064 6.631-37.604 29.064-5.564 37.605 6.631m10.649-7.457c-12.672-18.096-37.615-22.492-55.709-9.822-18.096 12.67-22.496 37.613-9.824 55.709 12.672 18.098 37.613 22.494 55.709 9.824 18.095-12.672 22.496-37.613 9.824-55.711z" />
        <circle cx="403.58" cy="417.88" r="35" fill="#00f" />
        <path d="M425.702 402.398c8.537 12.193 5.563 29.064-6.631 37.604-12.195 8.539-29.066 5.564-37.605-6.631s-5.564-29.064 6.631-37.604 29.064-5.564 37.605 6.631m10.649-7.457c-12.672-18.096-37.615-22.492-55.709-9.822-18.096 12.67-22.496 37.613-9.824 55.709 12.672 18.098 37.613 22.494 55.709 9.824 18.095-12.672 22.495-37.613 9.824-55.711z" />
    </svg>
}

export function CircleCenterPointIcon(props) {
    return <svg width="512" height="512" viewBox="0 0 512 512" {...props}>
        <path fill="none" strokeWidth="13" d="M440.11 256c0 101.502-82.429 183.785-184.11 183.785-101.681 0-184.11-82.283-184.11-183.785S154.319 72.215 256 72.215c101.682 0 184.11 82.283 184.11 183.785z" />
        <circle cx="406.33" cy="149.45" r="35" fill="#00f" />
        <path d="M428.446 133.961c8.537 12.193 5.563 29.064-6.631 37.604-12.195 8.539-29.066 5.564-37.605-6.631s-5.564-29.064 6.631-37.604 29.064-5.564 37.605 6.631m10.649-7.457c-12.672-18.096-37.615-22.492-55.709-9.822-18.096 12.67-22.496 37.613-9.824 55.709 12.672 18.098 37.613 22.494 55.709 9.824 18.095-12.672 22.496-37.613 9.824-55.711z" />
        <circle cx="256" cy="256" r="35" fill="#00f" />
        <path d="M278.118 240.513c8.537 12.193 5.563 29.064-6.631 37.604-12.195 8.539-29.066 5.564-37.605-6.631s-5.564-29.064 6.631-37.604 29.064-5.565 37.605 6.631m10.649-7.457c-12.672-18.096-37.615-22.492-55.709-9.822-18.096 12.67-22.496 37.613-9.824 55.709 12.672 18.098 37.613 22.494 55.709 9.824 18.095-12.672 22.495-37.614 9.824-55.711z" />
    </svg>
}

export function CircleCenterRadiusIcon(props) {
    return <svg width="512" height="512" viewBox="0 0 512 512" {...props}>
        <path fill="none" strokeWidth="13" d="M440.11 256c0 101.502-82.429 183.785-184.11 183.785-101.681 0-184.11-82.283-184.11-183.785S154.319 72.215 256 72.215c101.682 0 184.11 82.283 184.11 183.785zM256 256l150.33-106.55" />
        <circle cx="256" cy="256" r="35" fill="#00f" />
        <path d="M278.118 240.513c8.537 12.193 5.563 29.064-6.631 37.604-12.195 8.539-29.066 5.564-37.605-6.631s-5.564-29.064 6.631-37.604 29.064-5.565 37.605 6.631m10.649-7.457c-12.672-18.096-37.615-22.492-55.709-9.822-18.096 12.67-22.496 37.613-9.824 55.709 12.672 18.098 37.613 22.494 55.709 9.824 18.095-12.672 22.495-37.614 9.824-55.711z" />
    </svg>
}

export function CircumcircleIcon(props) {
    return <svg width="512" height="512" viewBox="0 0 512 512" {...props}>
        <path fill="none" strokeWidth="13" d="M440.11 256c0 101.502-82.429 183.785-184.11 183.785-101.681 0-184.11-82.283-184.11-183.785S154.319 72.215 256 72.215c101.682 0 184.11 82.283 184.11 183.785z" />
        <circle cx="406.33" cy="149.45" r="35" fill="#00f" />
        <path d="M428.446 133.961c8.537 12.193 5.563 29.064-6.631 37.604-12.195 8.539-29.066 5.564-37.605-6.631s-5.564-29.064 6.631-37.604 29.064-5.564 37.605 6.631m10.649-7.457c-12.672-18.096-37.615-22.492-55.709-9.822-18.096 12.67-22.496 37.613-9.824 55.709 12.672 18.098 37.613 22.494 55.709 9.824 18.095-12.672 22.496-37.613 9.824-55.711z" />
        <circle cx="74.33" cy="224.45" r="35" fill="#00f" />
        <path d="M96.446 208.967c8.537 12.193 5.563 29.064-6.631 37.604-12.195 8.539-29.066 5.564-37.605-6.631s-5.564-29.064 6.631-37.604 29.064-5.564 37.605 6.631m10.649-7.457c-12.672-18.096-37.615-22.492-55.709-9.822-18.096 12.67-22.496 37.613-9.824 55.709 12.672 18.097 37.613 22.494 55.709 9.824 18.095-12.672 22.496-37.613 9.824-55.711z" />
        <circle cx="311" cy="431.45" r="35" fill="#00f" />
        <path d="M333.122 415.967c8.537 12.193 5.563 29.064-6.631 37.604-12.195 8.539-29.066 5.564-37.605-6.631s-5.564-29.064 6.631-37.604 29.064-5.565 37.605 6.631m10.649-7.457c-12.672-18.096-37.615-22.492-55.709-9.822-18.096 12.67-22.496 37.613-9.824 55.709 12.672 18.098 37.613 22.494 55.709 9.824 18.095-12.672 22.495-37.614 9.824-55.711z" />
    </svg>
}

export function LineIcon(props) {
    return <svg width="512" height="512" viewBox="0 0 512 512" {...props}>
        <path fill="none" strokeWidth="13" d="M-10.22 442.41L522.23 69.59" />
        <circle cx="362" cy="181.96" r="35" fill="#00f" />
        <path d="M362 154.964c14.887 0 27 12.113 27 27 0 14.888-12.113 27.001-27 27.001-14.889 0-27-12.113-27-27.001 0-14.887 12.111-27 27-27m0-13c-22.092 0-40 17.91-40 40 0 22.091 17.908 40.001 40 40.001s40-17.91 40-40.001c0-22.09-17.908-40-40-40z" />
        <circle cx="150" cy="330.3" r="35" fill="#00f" />
        <path d="M150 303.301c14.888 0 27 12.113 27 27 0 14.888-12.112 27.001-27 27.001s-27-12.113-27-27.001c0-14.887 12.112-27 27-27m0-13c-22.091 0-40 17.91-40 40 0 22.091 17.909 40.001 40 40.001 22.092 0 40-17.91 40-40.001 0-22.09-17.908-40-40-40z" />
    </svg>
}

export function PointIcon(props) {
    return <svg width="512" height="512" viewBox="0 0 512 512" {...props}>
        <circle cx="168.7" cy="351.73" r="53.38" fill="#00f" />
        <path d="M168.704 310.55c22.704 0 41.175 18.472 41.175 41.175S191.408 392.9 168.704 392.9s-41.175-18.472-41.175-41.175S146 310.55 168.704 310.55m0-19.825c-33.689 0-61 27.312-61 61s27.311 61 61 61 61-27.312 61-61-27.311-61-61-61z" />
        <path fill="#00f" d="M428.199 252.873h-24.755l-18.17-45.547h-82.212l-18.397 45.547h-24.073l70.63-170h25.437l71.54 170zm-52.69-65.56l-32.021-78.445-31.34 78.444h63.362z" />
    </svg>
}

export function SegmentIcon(props) {
    return <svg width="512" height="512" viewBox="0 0 512 512" {...props}>
        <path fill="none" strokeWidth="13" d="M120 350.3l272-189.34" />
        <circle cx="392" cy="160.96" r="35" fill="#00f" />
        <path d="M392 133.964c14.887 0 27 12.113 27 27 0 14.888-12.113 27.001-27 27.001-14.889 0-27-12.113-27-27.001 0-14.887 12.111-27 27-27m0-13c-22.092 0-40 17.91-40 40 0 22.091 17.908 40.001 40 40.001s40-17.91 40-40.001c0-22.09-17.908-40-40-40z" />
        <circle cx="120" cy="350.3" r="35" fill="#00f" />
        <path d="M120 323.301c14.888 0 27 12.113 27 27 0 14.888-12.112 27.001-27 27.001s-27-12.113-27-27.001c0-14.887 12.112-27 27-27m0-13c-22.091 0-40 17.91-40 40 0 22.091 17.909 40.001 40 40.001 22.092 0 40-17.91 40-40.001 0-22.09-17.908-40-40-40z" />
    </svg>
}

export function SemicircleIcon(props) {
    return <svg width="512" height="512" viewBox="0 0 512 512" {...props}>
        <path fill="none" strokeWidth="13" d="M105.152 361.555c-58.193-83.165-37.83-197.841 45.48-256.136 83.311-58.296 198.022-38.136 256.215 45.028" />
        <circle cx="406.33" cy="149.45" r="35" fill="#00f" />
        <path d="M428.446 133.961c8.537 12.193 5.563 29.064-6.631 37.604-12.195 8.539-29.066 5.564-37.605-6.631s-5.564-29.064 6.631-37.604 29.064-5.564 37.605 6.631m10.649-7.457c-12.672-18.096-37.615-22.492-55.709-9.822-18.096 12.67-22.496 37.613-9.824 55.709 12.672 18.098 37.613 22.494 55.709 9.824 18.095-12.672 22.496-37.613 9.824-55.711z" />
        <circle cx="105.33" cy="361.55" r="35" fill="#00f" />
        <path d="M127.446 346.067c8.537 12.193 5.563 29.064-6.631 37.604-12.195 8.539-29.066 5.564-37.605-6.631s-5.564-29.064 6.631-37.604 29.064-5.564 37.605 6.631m10.649-7.457c-12.672-18.096-37.615-22.492-55.709-9.822-18.096 12.67-22.496 37.613-9.824 55.709 12.672 18.098 37.613 22.494 55.709 9.824 18.095-12.672 22.496-37.613 9.824-55.711z" />
    </svg>
}

export function CircumcircleArcIcon(props) {
    return <svg width="512" height="512" viewBox="0 0 512 512" {...props}>
        <path fill="none" strokeWidth="13" d="M74.314 226.099C88.621 138.818 164.519 72.215 256 72.215c101.682 0 184.11 82.283 184.11 183.785 0 82.378-54.294 152.097-129.109 175.444" />
        <circle cx="406.33" cy="149.45" r="35" fill="#00f" />
        <path d="M428.446 133.961c8.537 12.193 5.563 29.064-6.631 37.604-12.195 8.539-29.066 5.564-37.605-6.631s-5.564-29.064 6.631-37.604 29.064-5.564 37.605 6.631m10.649-7.457c-12.672-18.096-37.615-22.492-55.709-9.822-18.096 12.67-22.496 37.613-9.824 55.709 12.672 18.098 37.613 22.494 55.709 9.824 18.095-12.672 22.496-37.613 9.824-55.711z" /><circle cx="74.33" cy="224.45" r="35" fill="#00f" /><path d="M96.446 208.967c8.537 12.193 5.563 29.064-6.631 37.604-12.195 8.539-29.066 5.564-37.605-6.631s-5.564-29.064 6.631-37.604 29.064-5.564 37.605 6.631m10.649-7.457c-12.672-18.096-37.615-22.492-55.709-9.822-18.096 12.67-22.496 37.613-9.824 55.709 12.672 18.097 37.613 22.494 55.709 9.824 18.095-12.672 22.496-37.613 9.824-55.711z" /><circle cx="311" cy="431.45" r="35" fill="#00f" /><path d="M333.122 415.967c8.537 12.193 5.563 29.064-6.631 37.604-12.195 8.539-29.066 5.564-37.605-6.631s-5.564-29.064 6.631-37.604 29.064-5.565 37.605 6.631m10.649-7.457c-12.672-18.096-37.615-22.492-55.709-9.822-18.096 12.67-22.496 37.613-9.824 55.709 12.672 18.098 37.613 22.494 55.709 9.824 18.095-12.672 22.495-37.614 9.824-55.711z" />
    </svg>
}

export function ReCircleIcon(props) {

    return <svg width="512" height="512" viewBox="0 0 512 512" {...props}>
        <path fill="none" stroke="red" opacity=".6" strokeWidth="13" d="M440.11 256c0 101.502-82.429 183.785-184.11 183.785-101.681 0-184.11-82.283-184.11-183.785S154.319 72.215 256 72.215c101.682 0 184.11 82.283 184.11 183.785z" />
        <path stroke="#00f" strokeWidth="13" opacity=".6" d="m 256.36387,52.551227 1.69377,414.810723" />
        <path stroke="#00f" strokeWidth="13" opacity=".6" d="M 464.57321,256.94796 49.762482,258.64173" />
        <path fill="none" strokeWidth="18" d="m 439.6681,253.84568 c 0,69.28806 -58.81453,125.45669 -131.3657,125.45669 -72.55118,0 -131.3657,-56.16863 -131.3657,-125.45669 0,-69.28805 58.81452,-125.45669 131.3657,-125.45669 72.55189,0 131.3657,56.16864 131.3657,125.45669 z" />
        <circle fill="#00f" cx="202.7123" cy="184.80946" r="35" />
        <path d="m 224.82827,169.32647 c 8.537,12.193 5.563,29.064 -6.631,37.604 -12.195,8.539 -29.066,5.564 -37.605,-6.631 -8.539,-12.195 -5.564,-29.064 6.631,-37.604 12.195,-8.54 29.064,-5.564 37.605,6.631 m 10.649,-7.457 c -12.672,-18.09601 -37.615,-22.49201 -55.709,-9.82201 -18.096,12.67 -22.496,37.613 -9.824,55.709 12.672,18.097 37.613,22.494 55.709,9.82401 18.095,-12.672 22.496,-37.613 9.824,-55.711 z" />
    </svg>
}

export function ReCircleIconAd(props) {
    const {className, ...rest} = props

    return <svg width="512" height="512" viewBox="0 0 512 512" className={`-scale-x-100 ${className}`}  {...rest}>
        <path fill="none" stroke="red" opacity=".6" strokeWidth="13" d="M440.11 256c0 101.502-82.429 183.785-184.11 183.785-101.681 0-184.11-82.283-184.11-183.785S154.319 72.215 256 72.215c101.682 0 184.11 82.283 184.11 183.785z" />
        <path stroke="#00f" strokeWidth="13" opacity=".6" d="m 256.36387,52.551227 1.69377,414.810723" />
        <path stroke="#00f" strokeWidth="13" opacity=".6" d="M 464.57321,256.94796 49.762482,258.64173" />
        <path fill="none" strokeWidth="18" d="m 439.6681,253.84568 c 0,69.28806 -58.81453,125.45669 -131.3657,125.45669 -72.55118,0 -131.3657,-56.16863 -131.3657,-125.45669 0,-69.28805 58.81452,-125.45669 131.3657,-125.45669 72.55189,0 131.3657,56.16864 131.3657,125.45669 z" />
        <circle fill="#00f" cx="202.7123" cy="184.80946" r="35" />
        <path d="m 224.82827,169.32647 c 8.537,12.193 5.563,29.064 -6.631,37.604 -12.195,8.539 -29.066,5.564 -37.605,-6.631 -8.539,-12.195 -5.564,-29.064 6.631,-37.604 12.195,-8.54 29.064,-5.564 37.605,6.631 m 10.649,-7.457 c -12.672,-18.09601 -37.615,-22.49201 -55.709,-9.82201 -18.096,12.67 -22.496,37.613 -9.824,55.709 12.672,18.097 37.613,22.494 55.709,9.82401 18.095,-12.672 22.496,-37.613 9.824,-55.711 z" />
    </svg>
}

export function ImCircleIcon(props) {

    return <svg width="512" height="512" viewBox="0 0 512 512" {...props}>
        <path fill="none" stroke="red" opacity=".6" strokeWidth="13" d="M440.11 256c0 101.502-82.429 183.785-184.11 183.785-101.681 0-184.11-82.283-184.11-183.785S154.319 72.215 256 72.215c101.682 0 184.11 82.283 184.11 183.785z" />
        <path stroke="#00f" strokeWidth="13" opacity=".6" d="m 256.36387,52.551227 1.69377,414.810723" />
        <path stroke="#00f" strokeWidth="13" opacity=".6" d="M 464.57321,256.94796 49.762482,258.64173" />
        <path fill="none" strokeWidth="18" d="M 436.80554,256.37185 C 322.73167,253.90516 206.93995,222.7357 160.67461,96.995931" />
        <circle cx="196.77518" cy="157.2728" r="35" fill="#00f" />
        <path d="m 218.89116,141.7898 c 8.537,12.193 5.563,29.064 -6.631,37.604 -12.195,8.539 -29.066,5.564 -37.605,-6.631 -8.539,-12.195 -5.564,-29.064 6.631,-37.604 12.195,-8.54 29.064,-5.564 37.605,6.631 m 10.649,-7.457 c -12.672,-18.09601 -37.615,-22.49201 -55.709,-9.82201 -18.096,12.67 -22.496,37.613 -9.824,55.709 12.672,18.097 37.613,22.494 55.709,9.82401 18.095,-12.672 22.496,-37.613 9.824,-55.711 z" />
    </svg>
}

export function ImCircleIconAd(props) {
    const {className, ...rest} = props

    return <svg width="512" height="512" viewBox="0 0 512 512" className={`-scale-x-100 ${className}`} {...rest}>
        <path fill="none" stroke="#0F0" opacity=".6" strokeWidth="13" d="M440.11 256c0 101.502-82.429 183.785-184.11 183.785-101.681 0-184.11-82.283-184.11-183.785S154.319 72.215 256 72.215c101.682 0 184.11 82.283 184.11 183.785z" />
        <path stroke="#00f" strokeWidth="13" opacity=".6" d="m 256.36387,52.551227 1.69377,414.810723" />
        <path stroke="#00f" strokeWidth="13" opacity=".6" d="M 464.57321,256.94796 49.762482,258.64173" />
        <path fill="none" strokeWidth="18" d="M 436.80554,256.37185 C 322.73167,253.90516 206.93995,222.7357 160.67461,96.995931" />
        <circle cx="196.77518" cy="157.2728" r="35" fill="#00f" />
        <path d="m 218.89116,141.7898 c 8.537,12.193 5.563,29.064 -6.631,37.604 -12.195,8.539 -29.066,5.564 -37.605,-6.631 -8.539,-12.195 -5.564,-29.064 6.631,-37.604 12.195,-8.54 29.064,-5.564 37.605,6.631 m 10.649,-7.457 c -12.672,-18.09601 -37.615,-22.49201 -55.709,-9.82201 -18.096,12.67 -22.496,37.613 -9.824,55.709 12.672,18.097 37.613,22.494 55.709,9.82401 18.095,-12.672 22.496,-37.613 9.824,-55.711 z" />
    </svg>
}


export function GoogleIcon(props) {
    return <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 210 210" {...props}>
        <path d="M0,105C0,47.103,47.103,0,105,0c23.383,0,45.515,7.523,64.004,21.756l-24.4,31.696C133.172,44.652,119.477,40,105,40
c-35.841,0-65,29.159-65,65s29.159,65,65,65c28.867,0,53.398-18.913,61.852-45H105V85h105v20c0,57.897-47.103,105-105,105
S0,162.897,0,105z"/>
    </svg>
}