import React, { useContext, useEffect, useState } from "react";
import { BeakerIcon, HandIcon } from "@heroicons/react/outline";
import CircleCenterRadius from "../atoms/custom-icons/circle-center-radius";
import CircleCenterPoint from "../atoms/custom-icons/circle-center-point";
import PointIcons from "../atoms/custom-icons/point";
import SegmentIcon from "../atoms/custom-icons/segment";
import LineIcon from "../atoms/custom-icons/line-icon";
import AngleIcon from "../atoms/custom-icons/angle-icon";
import { SmithContext } from "../../providers/smithContext";
import Circumcircle from "../atoms/custom-icons/circumcenter";

interface PrimitivesMenuProps extends React.HTMLAttributes<HTMLDivElement> {
};

const PrimitivesMenu = (props: PrimitivesMenuProps) => {

  const { ui } = useContext(SmithContext)


  const onClickPoint = () => ui.setTooltip('point')
  const onClickLine = () => ui.setTooltip('line')
  const onClickAngle = () => ui.setTooltip('angle')
  const onClickSegment = () => ui.setTooltip('segment')
  const onClickCircleCenterPoint = () => ui.setTooltip('circle')
  const onClickCircleCenterRadius = () => ui.setTooltip('circleRadius')
  const onClickCircumcircleRadius = () => ui.setTooltip('circumcircle')

  const onClickCircleCenterRadiusValue = (v: string) => {
    const n = parseFloat(v)
    n > 0 && ui.sendEvent("RADIUS", n)
  }
  const onClickCircleCenterRadiusCancel = () => ui.sendEvent('CANCEL')

  const [radius, setRadius] = useState("")
  const [showHelp, setShowHelp] = useState(false)
  const [showMenu, setShowMenu] = useState(true)

  // console.log('render', ui.current(true))

  useEffect(() => {
    if (ui.current() == "tooltipSelected") {
      // console.log('toast')
      setShowHelp(true)
      setTimeout(() => setShowHelp(false), 3000)
    }
  }, [ui.current()])

  return (
    <div className={`dropdown ${showMenu ? ' dropdown-open' : ''} ${props.className}`}>
      <label
        tabIndex={0}
        className={`btn ${showMenu ? 'btn-primary' : ''}`}
        onClick={() => setShowMenu(!showMenu)}>
        <BeakerIcon className="w-6" />
      </label>
      <label
        tabIndex={0}
        className={`btn ${ui.current() == "idle" ? 'btn-primary hover:bg-primary' : ''} ml-1`}
        onClick={() => ui.sendEvent('EXIT')}>
        <HandIcon className="w-6" />
      </label>
      <ul tabIndex={0} className={`dropdown-content menu p-2 mt-2 shadow bg-base-100 rounded-box ${showMenu ? '' : 'hidden'}`}>
        <li onClick={onClickPoint}>
          <a className={`tooltip tooltip-right p-0 py-2 md:px-2 ${ui.context().tooltipSelected == 'point' ? 'bg-gray-200' : ''}`} data-tip="Punto">
            <PointIcons width={30} />
            <span className="ml-2 hidden">Punto</span>
          </a>
        </li>
        <li onClick={onClickSegment}>
          <a className={`tooltip tooltip-right p-0 py-2 md:px-2 ${ui.context().tooltipSelected == 'segment' ? 'bg-gray-200' : ''}`} data-tip="Segmento">
            <SegmentIcon width={30} />
            <span className="ml-2 hidden">Segmento</span>
          </a>
        </li>
        <li onClick={onClickLine}>
          <a className={`tooltip tooltip-right p-0 py-2 md:px-2  ${ui.context().tooltipSelected == 'line' ? 'bg-gray-200' : ''}`} data-tip="Recta">
            <LineIcon width={30} />
            <span className="ml-2 hidden">Recta</span>
          </a>
        </li>
        {/* <li onClick={onClickAngle}>
          <a className={`tooltip tooltip-right p-0 py-2 md:px-2 ${ui.context().tooltipSelected == 'angle' ? 'bg-gray-200' : ''}`} data-tip="Ángulo">
            <AngleIcon width={30} />
            <span className="ml-2 hidden">Ángulo</span>{" "}
          </a>
        </li> */}
        <li onClick={onClickCircleCenterRadius}>
          <a className={`tooltip tooltip-right p-0 py-2 md:px-2 ${ui.context().tooltipSelected == 'circleRadius' ? 'bg-gray-200' : ''}`} data-tip="Circunferencia: centro y radio">
            <CircleCenterRadius width={30} />{" "}
            <span className="ml-2 hidden">Circunferencia: centro y radio</span>{" "}
          </a>
        </li>
        <li onClick={onClickCircleCenterPoint}>
          <a className={`tooltip tooltip-right p-0 py-2 md:px-2 ${ui.context().tooltipSelected == 'circle' ? 'bg-gray-200' : ''}`} data-tip="Circunferencia (centro, punto)">
            <CircleCenterPoint width={30} />{" "}
            <span className="ml-2 hidden">Circunferencia (centro, punto)</span>{" "}
          </a>
        </li>
        <li onClick={onClickCircumcircleRadius}>
          <a className={`tooltip tooltip-right p-0 py-2 md:px-2 ${ui.context().tooltipSelected == 'circumcircle' ? 'bg-gray-200' : ''}`} data-tip="Circunferencia por 3 puntos">
            <Circumcircle width={30} />{" "}
            <span className="ml-2 hidden">Circunferencia (centro, punto)</span>{" "}
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
        <div className={`toast toast-start transition-all ${!showHelp && "invisible"}`}>
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
