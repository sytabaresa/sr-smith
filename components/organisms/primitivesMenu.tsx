import React, { useContext, useEffect, useState } from "react";
import { BeakerIcon } from "@heroicons/react/outline";
import CircleCenterRadius from "../atoms/custom-icons/circle-center-radius";
import CircleCenterPoint from "../atoms/custom-icons/circle-center-point";
import PointIcons from "../atoms/custom-icons/point";
import SegmentIcon from "../atoms/custom-icons/segment";
import LineIcon from "../atoms/custom-icons/line-icon";
import AngleIcon from "../atoms/custom-icons/angle-icon";
import { SmithContext } from "../../providers/smithContext";

type PrimitivesMenuProps = {
};

const PrimitivesMenu = (props: PrimitivesMenuProps) => {

  const { ui } = useContext(SmithContext)


  const onClickPoint = () => ui.setTooltip('point')
  const onClickLine = () => ui.setTooltip('line')
  const onClickAngle = () => ui.setTooltip('angle')
  const onClickSegment = () => ui.setTooltip('segment')
  const onClickCircleCenterPoint = () => ui.setTooltip('circle')
  const onClickCircleCenterRadius = () => ui.setTooltip('circleRadius')
  const onClickCircleCenterRadiusValue = (v: string) => {
    const n = parseFloat(v)
    n > 0 && ui.sendEvent("RADIUS", n)
  }
  const onClickCircleCenterRadiusCancel = () => ui.sendEvent('CANCEL')

  const [radius, setRadius] = useState("")
  const [showHelp, setShowHelp] = useState(false)

  // console.log('render', ui.current(true))

  useEffect(() => {
    if (ui.current() == "tooltipSelected") {
      // console.log('toast')
      setShowHelp(true)
      setTimeout(() => setShowHelp(false), 3000)
    }
  }, [ui.current()])

  return (
    <div className="dropdown dropdown-hover">
      <button tabIndex={0} className="btn btn-primary">
        <BeakerIcon className="w-6" />
      </button>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a onClick={onClickPoint}>
            <PointIcons width={30} /> <span className="ml-2">Punto</span>
          </a>
        </li>
        <li onClick={onClickSegment}>
          <a>
            <SegmentIcon width={30} /> <span className="ml-2">Segmento</span>
          </a>
        </li>
        <li onClick={onClickLine}>
          <a>
            <LineIcon width={30} /> <span className="ml-2">Recta</span>
          </a>
        </li>
        <li onClick={onClickAngle}>
          <a>
            <AngleIcon width={30} /> <span className="ml-2">Angulo</span>{" "}
          </a>
        </li>
        <li onClick={onClickCircleCenterRadius}>
          <a>
            <CircleCenterRadius width={30} />{" "}
            <span className="ml-2">Circunferencia: centro y radio</span>{" "}
          </a>
        </li>
        <li onClick={onClickCircleCenterPoint}>
          <a>
            <CircleCenterPoint width={30} />{" "}
            <span className="ml-2">Circunferencia (centro, punto)</span>{" "}
          </a>
        </li>
      </ul>
      <div className={`modal ${ui.current(true) == "draw.drawCircle" && 'modal-open'}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">
            Circunferencia: centro y radio
          </h3>
          <input
            type="text"
            placeholder="Elija el Radio"
            className="input input-bordered w-full max-w-xs"
            onChange={ev => setRadius(ev.target.value)}
          />
          <div className="modal-action flex items-center">
            <a href="#" className="text-gray-500" onClick={onClickCircleCenterRadiusCancel}>Cancelar</a>
            <a href="#" className="btn" onClick={() => onClickCircleCenterRadiusValue(radius)} >
              Crear
            </a>
          </div>
        </div>
      </div>
      {ui.tooltipSelected &&
        <div className={`toast toast-start transition-opacity ${showHelp ? "opacity-1" : "opacity-0"}`}>
          <div className="alert shadow-lg">
            <div className="!block">
              <h2 className="font-bold">{ui.tooltipSelected.name}</h2>
              <p>
                {ui.tooltipSelected.description}
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default PrimitivesMenu;
