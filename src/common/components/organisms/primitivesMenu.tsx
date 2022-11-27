import React, { useContext, useEffect, useState } from "react";
import { HandIcon, ReplyIcon, TemplateIcon, TrashIcon } from "@heroicons/react/outline";
import { SmithContext } from "../../../common/providers/smithContext";
import PointTooltip from "../../../modules/core/tooltips/point";
import SegmentTooltip from "../../../modules/core/tooltips/segment";
import LineTooltip from "../../../modules/core/tooltips/line";
import CircleTooltip from "../../../modules/core/tooltips/circle";
import CircleRadiusTooltip from "../../../modules/core/tooltips/circleRadius";
import CircumcircleTooltip from "../../../modules/core/tooltips/circumcircle";
import SemicircleTooltip from "../../../modules/core/tooltips/semicircle";
import ArcTooltip from "../../../modules/core/tooltips/arc";
import ReCircleTooltip from "../../../modules/core/tooltips/reCircle";
import ImCircleTooltip from "../../../modules/core/tooltips/imCircle";
import { useTranslation } from "next-export-i18n"
import ImCircleAdTooltip from "../../../modules/core/tooltips/imCircleAd";
import ReCircleAdTooltip from "../../../modules/core/tooltips/reCircleAd";

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
    <div className={`dropdown ${showMenu ? ' dropdown-open' : ''} ${className}`} {...rest}>
      <div className="flex gap-2 mb-2">
        <div className="btn-group">
          <button
            aria-label={t("undo")}
            tabIndex={0}
            className={`btn btn-square`}
            onClick={() => ui.sendEvent('UNDO')}>
            <ReplyIcon className="w-6" />
          </button>
        </div>
        <div className="btn-group">
          <button
            aria-label={t("delete")}
            tabIndex={0}
            className={`btn btn-square`}
            onClick={() => ui.sendEvent('DELETE')}>
            <TrashIcon className="w-6" />
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="btn-group">
          <button
            aria-label={t("show menu")}
            tabIndex={0}
            className={`btn btn-square ${showMenu ? 'btn-active' : ''}`}
            onClick={() => setShowMenu(!showMenu)}>
            <TemplateIcon className="w-6" />
          </button>
        </div>
        <div className="btn-group">
          <button
            aria-label={t("move")}
            tabIndex={0}
            className={`btn btn-square ${ui.current() == "idle" ? 'btn-active' : ''}`}
            onClick={() => ui.sendEvent('EXIT')}>
            <HandIcon className="w-6" />
          </button>
        </div>
      </div>
      <ul tabIndex={0} className={`dropdown-content menu p-2 mt-2 border-primary border bg-base-100 rounded-box ${showMenu ? '' : 'hidden'}`}>
        {[new PointTooltip(), new SegmentTooltip(), new LineTooltip(),
        new CircleTooltip(), new CircleRadiusTooltip(), new CircumcircleTooltip(),
        new SemicircleTooltip(), new ArcTooltip(), new ReCircleTooltip(),
        new ImCircleTooltip(), new ImCircleAdTooltip(), new ReCircleAdTooltip()].map((plugin, index) =>
          <li key={index} onClick={() => ui.setTooltip(plugin.name)}>
            <a
              className={`tooltip tooltip-right p-0 py-2 md:px-2 ${ui.context().tooltipSelected == plugin.name ? 'bg-gray-200' : ''}`}
              data-tip={t(plugin.tooltip)}
            >
              <plugin.icon className="w-8 h-8 stroke-accent fill-accent" />
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
              <h2 className="font-bold">{t(ui.tooltipSelected.tooltip)}</h2>
              <p>
                {t(ui.tooltipSelected.description)}
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default PrimitivesMenu;
