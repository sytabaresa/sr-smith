import { useEffect, useState } from "react";
import { useTranslation } from "@modules/i18n";
import EditorPopup from "./editorPopup";
// import {DotsHorizontalIcon} from "@heroicons/react/outline";
import PrimitivesMenu from "./primitivesMenu";
import CodeEditor from "./codeEditor";
import { useAtom } from "jotai";
import { menuServiceAtom } from "@core/atoms/smith";

const CodeToolbar = () => {
  const { t } = useTranslation();
  const [current, send] = useAtom(menuServiceAtom)

  const [checked, setChecked] = useState(current.name == 'draw')
  useEffect(() => {
    setChecked(current.name == 'draw')
  }, [current.name])

  return (
    <div className="absolute top-0 left-0 pl-2 py-2 md:pl-4 md:pt-4 z-10 flex h-0">
      <CodeEditor className="hidden lg:flex h-[93vh] w-[30vw] max-w-[30rem]" />
      <div className="flex flex-col md:flex-row-reverse lg:mx-2 lg:mt-0 flex-1">
        <div className="flex md:flex-col items-center">
          <EditorPopup className="lg:hidden flex-0" />
          <div className="form-control mx-2">
            <label className="label py-1 cursor-pointer">
              <span className={`label-text uppercase text-right w-12 mr-2 font-bold ${current.context.smithMode ? '' : 'opacity-50'}`}>{t.canvas.smith_mode()}</span>
              <input
                type="checkbox"
                className="toggle"
                checked={current.context.smithMode}
                onChange={() => send({ type: 'SMITH_MODE', value: !current.context.smithMode })}
              />
            </label>
          </div>
        </div>
        <PrimitivesMenu />
      </div>
    </div>
  );
};

export default CodeToolbar;
