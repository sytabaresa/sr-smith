import React, { useState } from "react";
import AppLayout from "../components/templates/AppLayout";
import SmithBoard from "../components/molecules/smithBoard";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SmithContext } from "../providers/smithContext";
import { useTranslation } from "react-i18next";
import CodeTools from "../components/organisms/codeTools";
import DrawerSmithOptions from "../components/organisms/drawerSmithOptions";
import { UserMenu } from "../components/organisms/userMenu";
import { JXGDrawer } from "../components/atoms/tooltipActions";

const Smith: React.FC = () => {
  const { t } = useTranslation("smith");
  const [ui, setUi] = useState(new JXGDrawer)
  const [boardOptions, setBoardOptions] = useState<any>(null);

  const [code, setCode] = useState<string>(`// test smith chart
Z1 = point(.5, .5) <<name: 'Z1', color: 'green', size: 5>>;
reflect = transform(PI, O) << type: 'rotate' >>;
Y1 = point(Z1, reflect) << name: 'Y1' >>;
L1 = segment(Z1, Y1);
circle(Y1, .3);`
  );


  const context = {
    ui,
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
              <UserMenu />
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
