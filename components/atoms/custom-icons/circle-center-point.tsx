import React from "react";

type CircleCenterPointProps = {
    width?: number;
}

const CircleCenterPoint = ({width}: CircleCenterPointProps) => {
    return <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEzIiBkPSJNNDQwLjExIDI1NmMwIDEwMS41MDItODIuNDI5IDE4My43ODUtMTg0LjExIDE4My43ODUtMTAxLjY4MSAwLTE4NC4xMS04Mi4yODMtMTg0LjExLTE4My43ODVTMTU0LjMxOSA3Mi4yMTUgMjU2IDcyLjIxNWMxMDEuNjgyIDAgMTg0LjExIDgyLjI4MyAxODQuMTEgMTgzLjc4NXoiLz48Y2lyY2xlIGN4PSI0MDYuMzMiIGN5PSIxNDkuNDUiIHI9IjM1IiBmaWxsPSIjMDBmIi8+PHBhdGggZD0iTTQyOC40NDYgMTMzLjk2MWM4LjUzNyAxMi4xOTMgNS41NjMgMjkuMDY0LTYuNjMxIDM3LjYwNC0xMi4xOTUgOC41MzktMjkuMDY2IDUuNTY0LTM3LjYwNS02LjYzMXMtNS41NjQtMjkuMDY0IDYuNjMxLTM3LjYwNCAyOS4wNjQtNS41NjQgMzcuNjA1IDYuNjMxbTEwLjY0OS03LjQ1N2MtMTIuNjcyLTE4LjA5Ni0zNy42MTUtMjIuNDkyLTU1LjcwOS05LjgyMi0xOC4wOTYgMTIuNjctMjIuNDk2IDM3LjYxMy05LjgyNCA1NS43MDkgMTIuNjcyIDE4LjA5OCAzNy42MTMgMjIuNDk0IDU1LjcwOSA5LjgyNCAxOC4wOTUtMTIuNjcyIDIyLjQ5Ni0zNy42MTMgOS44MjQtNTUuNzExeiIvPjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMzUiIGZpbGw9IiMwMGYiLz48cGF0aCBkPSJNMjc4LjExOCAyNDAuNTEzYzguNTM3IDEyLjE5MyA1LjU2MyAyOS4wNjQtNi42MzEgMzcuNjA0LTEyLjE5NSA4LjUzOS0yOS4wNjYgNS41NjQtMzcuNjA1LTYuNjMxcy01LjU2NC0yOS4wNjQgNi42MzEtMzcuNjA0IDI5LjA2NC01LjU2NSAzNy42MDUgNi42MzFtMTAuNjQ5LTcuNDU3Yy0xMi42NzItMTguMDk2LTM3LjYxNS0yMi40OTItNTUuNzA5LTkuODIyLTE4LjA5NiAxMi42Ny0yMi40OTYgMzcuNjEzLTkuODI0IDU1LjcwOSAxMi42NzIgMTguMDk4IDM3LjYxMyAyMi40OTQgNTUuNzA5IDkuODI0IDE4LjA5NS0xMi42NzIgMjIuNDk1LTM3LjYxNCA5LjgyNC01NS43MTF6Ii8+PC9zdmc+" alt="" width={width ?? 40} />
}

export default CircleCenterPoint;