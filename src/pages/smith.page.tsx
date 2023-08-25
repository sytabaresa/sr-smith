import React from "react";
import Layout from "@components/templates/default";
import SmithBoard from "@components/molecules/smithBoard";
import CodeToolbar from "@components/organisms/codeToolbar";
import DrawerMenu from "@components/organisms/drawerMenu";
import { UserMenu } from "@components/organisms/userMenu";
import Footer from "@components/organisms/footer";

// custom elements
import  "@core/elements"
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
        <CodeToolbar className="absolute top-0 left-0 pl-2 py-2 md:pl-4 md:pt-4 z-10 flex h-0" />
        <div className="absolute top-0 right-0 mr-2 mt-2 md:mr-4 md:mt-4">
          <UserMenu />
        </div>
        {/* </div> */}

      </Layout>
    </>
  );
};