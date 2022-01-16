import React, { useState } from "react";
import AppLayout from "../components/templates/AppLayout";
import SmithBoard from "../components/smith/Board";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SmithContext } from "../components/smith/context";
import { useTranslation } from "react-i18next";
import EditorButton from "../components/atoms/editorButton";
import {
  ViewGridIcon,
  MenuAlt3Icon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import CodeTools from "../components/organisms/codeTools";
import DrawerSmithOptions from "../components/organisms/drawerSmithOptions";

const Smith: React.FC = () => {
  const { t } = useTranslation("smith");
  const [board, setBoard] = useState<any>(null);
  const [boardOptions, setBoardOptions] = useState<any>(null);

  const [code, setCode] = useState<string>(`// test smith chart
Z1 = point(.5, .5) <<name: 'Z1', color: 'green', size: 5>>;
reflect = transform(PI, O) << type: 'rotate' >>;
Y1 = point(Z1, reflect) << name: 'Y1' >>;
L1 = segment(Z1, Y1);
circle(Y1, .3);`);

  const context = {
    board,
    boxName: "smith-box",
    setBoard,
    code,
    setCode,
    boardOptions,
    setBoardOptions,
  };

  return (
    <AppLayout title="Smith Chart">
      <SmithContext.Provider value={context}>
        <div className="drawer drawer-end h-screen  relative">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex">
            <SmithBoard />
            <CodeTools />
            <div className="absolute top-0 right-0 mr-4 mt-4 hidden md:block">
              <div className="flex items-center">
                <div className="avatar mr-4">
                  <div className="rounded-full ring ring-primary w-14 h-14">
                    <img src="https://s.gravatar.com/avatar/718ba64442e4dc180aa0be6b0a9617b1?s=80 " />
                  </div>
                </div>
                <div className="btn-group drawer-content">
                  <Link href="/">
                    <button className="btn btn-lg btn-active">
                      <ViewGridIcon className="h-5 w-5" />
                    </button>
                  </Link>
                  <label
                    htmlFor="my-drawer"
                    className="btn btn-lg drawer-button"
                  >
                    <MenuAlt3Icon className="h-5 w-5" />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DrawerSmithOptions />
        </div>
      </SmithContext.Provider>
    </AppLayout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "smith", "footer"])),
      // Will be passed to the page component as props
    },
  };
}

export default Smith;
