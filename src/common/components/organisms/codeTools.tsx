import { useContext, useEffect, useState } from "react";
import { useTranslation } from "@modules/i18n";
import EditorPopup from "./editorPopup";
// import {DotsHorizontalIcon} from "@heroicons/react/outline";
import PrimitivesMenu from "./primitivesMenu";
import { SmithContext } from "@providers/smithContext";
import CodeEditor from "./codeEditor";

const CodeTools = () => {
  const { t } = useTranslation();
  const { ui } = useContext(SmithContext)

  ui.useMachine()

  const [checked, setChecked] = useState(ui.whiteboardMachine.current == 'draw')
  useEffect(() => {
    setChecked(ui.whiteboardMachine.current == 'draw')
  }, [ui.whiteboardMachine.current])

  return (
    <div className="absolute top-0 left-0 pl-2 py-2 md:pl-4 md:pt-4 z-10 flex">
      <CodeEditor className="hidden lg:flex h-[93vh] w-[30vw] max-w-[30rem]" />
      <div className="flex flex-col md:flex-row-reverse lg:mx-2 lg:mt-0 flex-1">
        <div className="flex md:flex-col items-center">
          <EditorPopup className="lg:hidden flex-0" />
          <div className="form-control mx-2">
            <label className="label py-1 cursor-pointer">
              <span className="label-text uppercase w-10 mr-4 font-bold">{t.canvas.smith_mode()}</span>
              <input
                type="checkbox"
                className="toggle"
                checked={ui.context().smithMode}
                onChange={() => ui.sendEvent('SMITH_MODE', !ui.context().smithMode)}
              />
            </label>
          </div>
        </div>
        <PrimitivesMenu />
      </div>
    </div>
  );
};

export default CodeTools;
