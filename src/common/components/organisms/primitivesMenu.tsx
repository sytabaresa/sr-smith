import React, { useEffect, useRef, useState } from "react";
import { HandIcon, ReplyIcon, TemplateIcon } from "@heroicons/react/outline"
import TrashIcon from "@heroicons/react/outline/TrashIcon"
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
import { useAtom, useAtomValue } from "jotai";
import { drawServiceAtom } from "@core/atoms/smith";
import createModal from "@components/molecules/createModal";
import CircleRadiusForm from "@components/molecules/circleRadiusForm";
import { editorAtom } from "@components/editor/common/atoms";

interface PrimitivesMenuProps extends React.HTMLAttributes<HTMLDivElement> {
};

const PrimitivesMenu = (props: PrimitivesMenuProps) => {
  const { className, ...rest } = props
  const { t } = useTranslation()
  const [current, send] = useAtom(drawServiceAtom)
  const editor = useAtomValue(editorAtom)

  const [offset, setOffset] = useState(0)

  const ref = useRef()
  const [showHelp, setShowHelp] = useState(false)
  const [showMenu, setShowMenu] = useState(true)

  // console.log('render', ui.current(true))

  useEffect(() => {
    if (current.name == "tooltipSelected") {
      // console.log('toast')
      setShowHelp(true)
      setTimeout(() => setShowHelp(false), 3000)
    }
  }, [current.name])

  const offsetCalc = (e) => {
    // console.log(e?.offsetTop)
    if (e?.offsetTop)
      setOffset(e.offsetTop + 50)
  }

  const _delete = (e) => {
    send('EXIT')
    send('DELETE_MODE')
  }

  useEffect(() => {
    if (typeof window != 'undefined')
      window.addEventListener('resize', () => offsetCalc(ref.current));
    offsetCalc(ref.current)
  }, [])

  const circleRadius = createModal('circle-radius')

  return (
    <div className={`flex flex-col ${className || ''}`} {...rest}>
      <div className=" flex gap-2 lg:mt-0 mt-2 mb-2 flex-0">

        <div className="">
          <button
            aria-label={t.canvas.undo()}
            tabIndex={0}
            className={`btn btn-outline btn-primary bg-base-100 btn-square`}
            onClick={() => {
              send('UNDO')
              editor.undo()
            }}>
            <ReplyIcon className="w-6" />

          </button>
        </div>
        <div className="">
          <button
            aria-label={t.canvas.delete()}
            tabIndex={0}
            className={`btn btn-outline btn-secondary btn-outline-accent bg-base-100 btn-square ${current.name == "delete" ? 'btn-active' : ''}`}
            onClick={_delete}>
            <TrashIcon className="w-6" />
          </button>
        </div>
      </div>
      <div className="flex gap-2 flex-0">
        <div className={``}>
          <button
            aria-label={t.canvas.elements_menu()}
            tabIndex={0}
            className={`btn btn-outline btn-square ${showMenu ? 'btn-active' : ''}`}
            onClick={() => setShowMenu(!showMenu)}>
            <TemplateIcon className="w-6" />
          </button>
        </div>
        <div className="">
          <button
            aria-label={t.canvas.move()}
            tabIndex={0}
            className={`btn btn-outline btn-primary btn-outline-accent btn-square ${current.name == "idle" ? ' btn-active' : ''}`}
            onClick={() => send('EXIT')}>
            <HandIcon className="w-6" />
          </button>
        </div>
      </div>
      <div ref={ref} className={`dropdown xsh:fixed xsh:bottom-[5rem] z-0 ${showMenu ? 'dropdown-open' : ''}`}>
        <div className="dropdown-content mt-2 border-neutral border bg-base-100">
          <ul
            tabIndex={0}
            style={{ maxHeight: `calc(calc(var(--vh, 1vh)*100) - ${offset}px)` }}
            className={`p-2 menu xsh:bottom-[2rem] overflow-y-auto xsh:flex-row xsh:!max-h-full overflow-x-hidden scrollbar !scrollbar-w-[1px] scrollbar-track-base-100 scrollbar-thumb-base-content
          flex-nowrap   ${showMenu ? '' : 'hidden'}`}
          >
            {[new PointTooltip(), new SegmentTooltip(), new LineTooltip(),
            new CircleTooltip(), new CircleRadiusTooltip(), new CircumcircleTooltip(),
            new SemicircleTooltip(), new ArcTooltip(), new ReCircleTooltip(),
            new ImCircleTooltip(), new ReCircleAdTooltip(), new ImCircleAdTooltip()].map((plugin, index) =>
              // figure out how to show clipped tooltip
              <li key={index} onClick={() => send({ type: 'CHANGE_DRAW', value: plugin.name })} className="tooltip2 tooltip-right" data-tip={t.tools[plugin.tooltip].title}>
                <button
                  aria-label={t.tools[plugin.tooltip]?.title() || plugin.tooltip}
                  className={`p-0 py-2 md:px-2 btn btn-ghost ${current.context.tooltipSelected == plugin.name ? 'btn-active' : ''}`}
                >
                  <plugin.icon className="w-8 h-8 stroke-base-content fill-base-content" />
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      <circleRadius.Modal>
        {props => <CircleRadiusForm  {...props} />}
      </circleRadius.Modal>
      {/* toas in the corner, info of tooltip selected */}
      {current.context.tooltipSelected &&
        <div className={`toast toast-end items-end lg:toast-start z-50 transition-all ${!showHelp ? "invisible" : ''}`}>
          <div className="alert max-w-[70vw] shadow-lg">
            <div className="!block">
              <h2 className="font-bold">{t.tools[current.context.tooltipSelected.name]?.title()}</h2>
              <p>
                {t.tools[current.context.tooltipSelected.description]?.desc()}
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default PrimitivesMenu;
