import React, { useContext, useEffect, useRef, useState } from "react";
import {HandIcon, ReplyIcon, TemplateIcon} from "@heroicons/react/outline"
import TrashIcon from "@heroicons/react/outline/TrashIcon"
import { SmithContext } from "@providers/smithContext";
import PointTooltip from "@core/tooltips/point";
import SegmentTooltip from "@core/tooltips/segment";
import LineTooltip from "@core/tooltips/line";
import CircleTooltip from "@core/tooltips/circle";
import CircleRadiusTooltip from "@core/tooltips/circleRadius";
import CircumcircleTooltip from "@core/tooltips/circumcircle";
import SemicircleTooltip from "@core/tooltips/semicircle";
import ArcTooltip from "@core/tooltips/arc";
import ReCircleTooltip from "@core/tooltips/reCircle";
import ImCircleTooltip from "@core/tooltips/imCircle";
import { useTranslation } from "@modules/i18n"
import ImCircleAdTooltip from "@core/tooltips/imCircleAd";
import ReCircleAdTooltip from "@core/tooltips/reCircleAd";

interface PrimitivesMenuProps extends React.HTMLAttributes<HTMLDivElement> {
};

const PrimitivesMenu = (props: PrimitivesMenuProps) => {
  const { className, ...rest } = props
  const { t } = useTranslation()
  const { ui } = useContext(SmithContext)

  const onClickCircleCenterRadiusValue = (v: string) => {
    const n = parseFloat(v)
    n > 0 && ui.sendEvent("RADIUS", n)
  }
  const onClickCircleCenterRadiusCancel = () => ui.sendEvent('CANCEL')

  const [radius, setRadius] = useState("")
  const [offset, setOffset] = useState(0)

  const ref = useRef()
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

  const offsetCalc = (e) => {
    // console.log(e?.offsetTop)
    if (e?.offsetTop)
      setOffset(e.offsetTop + 50)
  }

  const _delete = (e) => {
    ui.sendEvent('EXIT')
    ui.sendEvent('DELETE_MODE')
  }

  useEffect(() => {
    if (typeof window != 'undefined')
      window.addEventListener('resize', () => offsetCalc(ref.current));
    offsetCalc(ref.current)
  }, [])

  return (
    <div className={`flex flex-col ${className}`} {...rest}>
      <div className=" flex gap-2 lg:mt-0 mt-2 mb-2 flex-0">

        <div className="btn-group">
          <button
            aria-label={t.canvas.undo()}
            tabIndex={0}
            className={`btn btn-square btn-disabled`}
            onClick={() => ui.sendEvent('UNDO')}>
            <ReplyIcon className="w-6" />
          </button>
        </div>
        <div className="btn-group">
          <button
            aria-label={t.canvas.delete()}
            tabIndex={0}
            className={`btn btn-square ${ui.current() == "delete" ? 'btn-active' : ''}`}
            onClick={_delete}>
            <TrashIcon className="w-6" />
          </button>
        </div>
      </div>
      <div className="flex gap-2 flex-0">
        <div className={`btn-group `}>
          <button
            aria-label={t.canvas.show_menu()}
            tabIndex={0}
            className={`btn btn-square ${showMenu ? 'btn-active' : ''}`}
            onClick={() => setShowMenu(!showMenu)}>
            <TemplateIcon className="w-6" />
          </button>
        </div>
        <div className="btn-group">
          <button
            aria-label={t.canvas.move()}
            tabIndex={0}
            className={`btn btn-square ${ui.current() == "idle" ? 'btn-active' : ''}`}
            onClick={() => ui.sendEvent('EXIT')}>
            <HandIcon className="w-6" />
          </button>
        </div>
      </div>
      <div ref={ref} className={`dropdown xsh:fixed xsh:bottom-[5rem] ${showMenu ? 'dropdown-open' : ''}`}>
        <div className="dropdown-content mt-2 border-primary border bg-base-100">
          <ul
            tabIndex={0}
            style={{ maxHeight: `calc(calc(var(--vh, 1vh)*100) - ${offset}px)` }}
            className={`p-2 menu xsh:bottom-[2rem] overflow-y-auto xsh:flex-row xsh:!max-h-full overflow-x-hidden scrollbar-thin !scrollbar-w-[1px] scrollbar-track-base-100 scrollbar-thumb-base-content
          flex-nowrap   ${showMenu ? '' : 'hidden'}`}
          >
            {[new PointTooltip(), new SegmentTooltip(), new LineTooltip(),
            new CircleTooltip(), new CircleRadiusTooltip(), new CircumcircleTooltip(),
            new SemicircleTooltip(), new ArcTooltip(), new ReCircleTooltip(),
            new ImCircleTooltip(), new ImCircleAdTooltip(), new ReCircleAdTooltip()].map((plugin, index) =>
              // figure out how to show clipped tooltip
              <li key={index} onClick={() => ui.setTooltip(plugin.name)} className="tooltip2 tooltip-right" data-tip={t.tools[plugin.tooltip].title}>
                <button
                  aria-label={plugin.tooltip}
                  className={`p-0 py-2 md:px-2 btn btn-ghost ${ui.context().tooltipSelected == plugin.name ? 'btn-active' : ''}`}
                >
                  <plugin.icon className="w-8 h-8 stroke-base-content fill-base-content" />
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Popup for data TODO: generalize this logic */}
      <div className={`modal ${ui.current(true) == "draw.drawCircle" ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">
            Circunferencia: centro y radio
          </h3>
          <input
            type="text"
            placeholder="Elija el Radio"
            className="input input-bordered w-full max-w-xs"
            onChange={(ev:any) => setRadius(ev.target.value)}
          />
          <div className="modal-action flex items-center">
            <a href="#" className="text-gray-500" onClick={onClickCircleCenterRadiusCancel}>Cancelar</a>
            <a href="#" className="btn" onClick={() => onClickCircleCenterRadiusValue(radius)} >
              {t.canvas.create()}
            </a>
          </div>
        </div>
      </div>

      {/* toas in the corner, info of tooltip selected */}
      {ui.tooltipSelected &&
        <div className={`toast toast-end items-end lg:toast-start z-50 transition-all ${!showHelp ? "invisible" : ''}`}>
          <div className="alert max-w-[70vw] shadow-lg">
            <div className="!block">
              <h2 className="font-bold">{t.tools[ui.tooltipSelected.name].title}</h2>
              <p>
                {t.tools[ui.tooltipSelected.name]?.desc}
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default PrimitivesMenu;
