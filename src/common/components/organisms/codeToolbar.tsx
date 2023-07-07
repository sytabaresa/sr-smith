import { HTMLAttributes, useEffect, useState } from "react";
import PrimitivesMenu from "./primitivesMenu";
import { isMobile, useScreen } from "@hooks/useScreen";
import SmithButton from "@components/atoms/smithButton";
import EditorMobile from "./editorMobile";
import EditorDesktop from "./editorDesktop";

interface CodeToolbarProps extends HTMLAttributes<HTMLDivElement> {

}

const CodeToolbar = (props: CodeToolbarProps) => {
  const { className, ...rest } = props
  const [mobile, setMobile] = useState(true)
  const screen = useScreen(true)

  useEffect(() => {
    setMobile(isMobile(screen))
  }, [screen])

  // console.log(screen)
  return (
    <div className={`${className || ''}`} {...rest}>
      <div id="code-desktop" className="flex">
        <EditorDesktop className={`transition-all duration-300 ${mobile ? 'w-0 p-0 opacity-0' : ''}`} />
      </div>
      {/* {!mobile ? <div className="flex h-[93vh] w-[30vw] bg-red-400" ></div>: null} */}
      <div className="flex flex-col md:flex-row-reverse lg:mx-2 lg:mt-0 flex-1">
        <div className="flex md:flex-col items-center">
          <div className="flex">
            <EditorMobile className={`flex-0  ${mobile ? '' : 'hidden'}`} />
          </div>
          <div className="form-control mx-2">
            <SmithButton />
          </div>
        </div>
        <PrimitivesMenu />
      </div>
    </div>
  );
};

export default CodeToolbar;
