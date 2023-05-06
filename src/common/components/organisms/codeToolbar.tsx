import { HTMLAttributes, useEffect, useState } from "react";
import { useTranslation } from "@modules/i18n";
import EditorPopup from "./editorPopup";
// import {DotsHorizontalIcon} from "@heroicons/react/outline";
import PrimitivesMenu from "./primitivesMenu";
import CodeEditor from "./codeEditor";
import { useAtom, useAtomValue } from "jotai";
import { drawServiceAtom, savingServiceAtom } from "@core/atoms/smith";
import { isMobile, useScreen } from "@hooks/useScreen";
import { BookOpenIcon, UploadIcon, XCircleIcon } from "@heroicons/react/outline";

interface CodeToolbarProps extends HTMLAttributes<HTMLDivElement> {

}

const CodeToolbar = (props: CodeToolbarProps) => {
  const { className, ...rest } = props
  const { t } = useTranslation();
  const screen = isMobile(useScreen(true))
  
  const [current, send] = useAtom(drawServiceAtom)
  const currentSave = useAtomValue(savingServiceAtom)

  // console.log(screen)
  return (
    <div className={`${className || ''}`} {...rest}>
      <div id="code-desktop" className="flex">
        {!screen && <CodeEditor
          className="flex h-[93vh] w-[30vw] max-w-[30rem]"
          toolbar={editor => <>
            {['saveWait', 'saving'].includes(currentSave.name) && <span className="badge badge-info animate-pulse"><UploadIcon className="w-4 mr-1" />{t.canvas.uploading()}...</span>}
            {['readOnly'].includes(currentSave.name) && <span className="badge"><BookOpenIcon className="w-4 mr-1" />{t.canvas.read_only()}</span>}
            {currentSave.name == 'failSave' && <span className="badge badge-error"><XCircleIcon className="w-4 mr-1" />{t.canvas.fail()}</span>}
          </>}
        />}
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
