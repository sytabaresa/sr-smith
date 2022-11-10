import React, { useContext, useEffect, useState } from "react";
import { BeakerIcon, HandIcon } from "@heroicons/react/outline";
import { SmithContext } from "../../providers/smithContext";
import PointTooltip from "../atoms/tooltips/point";
import SegmentTooltip from "../atoms/tooltips/segment";
import LineTooltip from "../atoms/tooltips/line";
import CircleTooltip from "../atoms/tooltips/circle";
import CircleRadiusTooltip from "../atoms/tooltips/circleRadius";
import CircumcircleTooltip from "../atoms/tooltips/circumcircle";
import SemicircleTooltip from "../atoms/tooltips/semicircle";
import ArcTooltip from "../atoms/tooltips/arc";
import ReCircleTooltip from "../atoms/tooltips/reCircle";
import ImCircleTooltip from "../atoms/tooltips/imCircle";

interface PrimitivesMenuProps extends React.HTMLAttributes<HTMLDivElement> {
};

const PrimitivesMenu = (props: PrimitivesMenuProps) => {

  const { ui } = useContext(SmithContext)

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
      <div className="form-control">
        <label className="label cursor-pointer pt-0">
          <span className="label-text">smith <br />mode</span>
          <input type="checkbox" className="toggle toggle-primary" checked={ui.context().smithMode} onChange={(e) => ui.sendEvent('SMITH_MODE', !ui.context().smithMode)} />
        </label>
      </div>
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
        {[new PointTooltip(), new SegmentTooltip(), new LineTooltip(),
        new CircleTooltip(), new CircleRadiusTooltip(), new CircumcircleTooltip(),
        new SemicircleTooltip(), new ArcTooltip(), new ReCircleTooltip(),
        new ImCircleTooltip()].map((plugin, index) =>
          <li key={index} onClick={() => ui.setTooltip(plugin.name)}>
            <a
              className={`tooltip tooltip-right p-0 py-2 md:px-2 ${ui.context().tooltipSelected == plugin.name ? 'bg-gray-200' : ''}`}
              data-tip={plugin.tooltip}
            >
              <plugin.icon className="w-8 h-8 fill-amber-500" />
              <span className="ml-2 hidden">Punto</span>
            </a>
          </li>
        )}
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
