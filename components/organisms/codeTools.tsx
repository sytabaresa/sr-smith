import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import EditorPopup from "../organisms/editorPopup";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import PrimitivesMenu from "./primitivesMenu";
import { SmithContext } from "../../providers/smithContext";

const CodeTools = () => {
  const { t } = useTranslation("smith");
  const { ui } = useContext(SmithContext)

  // ui && ui.setTooltip('point')
  return (
    <div className="absolute top-0 left-0 pl-4 pt-4 w-full md:w-96 z-10">
      <div className="form-control">
        <div className="space-x-2 hidden md:flex">
          <input
            type="text"
            placeholder={t("search")}
            className="w-full input input-primary input-bordered"
          />
          <button className="btn btn-primary" >{t("go")}</button>
          <PrimitivesMenu onClickPoint={() => ui.setTooltip('point')} />
        </div>
        <div className="form-control flex-row">
          <label className="cursor-pointer label mr-6">
            <span className="label-text font-bold mr-2">{t("smith-mode")}</span>
            <div>
              <input type="checkbox" className="toggle toggle-primary" />
              <span className="toggle-mark"></span>
            </div>
          </label>
          <label className="cursor-pointer label mr-6">
            <span className="label-text font-bold mr-2">{t("option-2")}</span>
            <div>
              <input type="checkbox" className="toggle toggle-primary" />
              <span className="toggle-mark"></span>
            </div>
          </label>
        </div>
      </div>
      <div className="btn-group">
        <EditorPopup />
        <button className="btn">
          <DotsHorizontalIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CodeTools;
