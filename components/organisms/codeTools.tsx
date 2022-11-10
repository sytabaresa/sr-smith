import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import EditorPopup from "../organisms/editorPopup";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import PrimitivesMenu from "./primitivesMenu";
import { SmithContext } from "../../providers/smithContext";
import Editor from "./codeEditor";

const CodeTools = () => {
  const { t } = useTranslation("smith");
  const { ui } = useContext(SmithContext)

  ui.useMachine()

  const [checked, setChecked] = useState(ui.whiteboardMachine.current == 'draw')
  useEffect(() => {
    setChecked(ui.whiteboardMachine.current == 'draw')
  }, [ui.whiteboardMachine.current])
  // ui && ui.setTooltip('point')

  // console.log(checked, ui.whiteboardMachine.current)
  return (
    <div className="absolute top-0 left-0 pl-2 pt-2 md:pl-4 md:pt-4 z-10">
      <div className="form-control">
        {/* <div className="space-x-2 hidden md:flex">
          <input
            type="text"
            placeholder={t("search")}
            className="w-full input input-primary input-bordered"
          />
          <button className="btn btn-primary" >{t("go")}</button>
        </div> */}
        <div className="form-control flex-row">
          {/* <label className="cursor-pointer label pt-0">
            <span className="label-text font-bold mr-2">smith <br /> mode</span>
            <div>
              <input type="checkbox" className="toggle toggle-primary" />
              <span className="toggle-mark"></span>
            </div>
          </label> */}
          {/* <label className="cursor-pointer label mr-6">
            <span className="label-text font-bold mr-2">{t("draw")}</span>
            <div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={checked}
                onChange={(e) => ui.sendEvent(e.target.checked ? 'CHANGE_DRAW' : 'CHANGE_IDLE')}
              />
              <span className="toggle-mark"></span>
            </div>
          </label> */}
        </div>
      </div>
      <div className="flex space-x-2">
        <Editor className="hidden lg:flex h-[93vh] w-[30vw] max-w-[30rem]" />
        <div className="lg:hidden btn-group">
          <EditorPopup />
          <button className="btn">
            <DotsHorizontalIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="mx-2 hidden lg:block">
          <PrimitivesMenu />
        </div>
      </div>
      <div className="m-2 lg:hidden">
        <PrimitivesMenu />
      </div>
    </div>
  );
};

export default CodeTools;
