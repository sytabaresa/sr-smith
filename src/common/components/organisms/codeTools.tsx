import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "next-export-i18n";
import EditorPopup from "./editorPopup";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import PrimitivesMenu from "./primitivesMenu";
import { SmithContext } from "../../../common/providers/smithContext";
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
      <div className="flex flex-col lg:mx-2 lg:mt-0 flex-1">
        <EditorPopup className="lg:hidden btn-group flex-0" />
        <PrimitivesMenu />
      </div>
    </div>
  );
};

export default CodeTools;
