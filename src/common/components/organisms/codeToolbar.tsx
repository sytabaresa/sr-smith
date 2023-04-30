import { HTMLAttributes, useEffect, useState } from "react";
import { useTranslation } from "@modules/i18n";
import EditorPopup from "./editorPopup";
// import {DotsHorizontalIcon} from "@heroicons/react/outline";
import PrimitivesMenu from "./primitivesMenu";
import CodeEditor from "./codeEditor";
import { useAtom } from "jotai";
import { menuServiceAtom } from "@core/atoms/smith";
import { isMobile, useScreen } from "@utils/screen";

interface CodeToolbarProps extends HTMLAttributes<HTMLDivElement> {

}

const CodeToolbar = (props: CodeToolbarProps) => {
  const { className, ...rest } = props
  const { t } = useTranslation();
  const [current, send] = useAtom(menuServiceAtom)
  const screen = isMobile(useScreen(true))

  // console.log(screen)
  return (
    <div className={`${className || ''}`} {...rest}>
      <div id="code-desktop" className="flex">
        {!screen && <CodeEditor className="flex h-[93vh] w-[30vw] max-w-[30rem]" />}
      </div>
      {/* {!screen ? <div className="flex h-[93vh] w-[30vw] bg-red-400" ></div>: null} */}
      <div className="flex flex-col md:flex-row-reverse lg:mx-2 lg:mt-0 flex-1">
        <div className="flex md:flex-col items-center">
          <div className="flex">
            {screen && <EditorPopup className="flex-0" />}
          </div>
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
