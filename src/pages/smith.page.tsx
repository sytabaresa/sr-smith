import React from "react";
import Layout from "@components/templates/default";
import SmithBoard from "@components/molecules/smithBoard";
import CodeToolbar from "@components/organisms/codeToolbar";
import DrawerMenu from "@components/organisms/drawerMenu";
import { UserMenu } from "@components/organisms/userMenu";
import Footer from "@components/organisms/footer";

import "@core/elements/smithPoint"
import "@core/elements/reCircle"
import "@core/elements/imCircle"
import "@core/elements/imCircleAd"
import "@core/elements/reCircleAd"

import '@styles/jsxgraph.css';

export { SmithProjectPage as Page }

const SmithProjectPage: React.FC = () => {

  return (
    <>
      <Layout
        title="Smith Chart"
        footerComponent={<Footer className="absolute bottom-0 xsh:right-0 xsh:left-[inherit] left-0 ml-1 mb-1" />}
        navbar={false}
        className=""
        drawerMenu={<DrawerMenu />}
      >
        {/* <div className="h-full relative"> */}
        <SmithBoard />
        <CodeToolbar />
        <div className="absolute top-0 right-0 mr-2 mt-2 md:mr-4 md:mt-4">
          <UserMenu />
        </div>
        {/* </div> */}

      </Layout>
    </>
  );
};