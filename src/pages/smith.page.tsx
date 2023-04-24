import React from "react";
import Layout from "@components/templates/default";
import SmithBoard from "@components/molecules/smithBoard";
import CodeTools from "@components/organisms/codeTools";
import DrawerSmithMenu from "@components/organisms/drawerSmithOptions";
import { UserMenu } from "@components/organisms/userMenu";
import Footer from "@components/organisms/footer";

import "@core/elements/smithPoint"
import "@core/elements/reCircle"
import "@core/elements/imCircle"
import "@core/elements/imCircleAd"
import "@core/elements/reCircleAd"

import ModalContainer from "@components/molecules/modalContainer";
import NewProjectForm from "@components/organisms/newProjectForm";
import PublishProjectForm from "@components/organisms/publishProjectForm";
import ConfigsForm from "@components/organisms/configForm";

import '@styles/jsxgraph.css';

export { SmithProjectPage as Page }

const SmithProjectPage: React.FC = () => {

  const labels = {
    NEW_PROJECT_LABEL: 'new-project-modal',
    PUBLISH_PROJECT_LABEL: 'publish-project-modal',
    CONFIGS_LABEL: 'configs-label'
  }

  return (
    <>
      {/* <HotkeysProvider initiallyActiveScopes={['smith-canvas']}> */}
      <Layout
        title="Smith Chart"
        footerComponent={<Footer className="absolute bottom-0 xsh:right-0 xsh:left-[inherit] left-0 ml-1 mb-1" />}
        navbar={false}
        className=""
        drawerMenu={<DrawerSmithMenu labels={labels} />}
      >
        {/* <div className="h-full relative"> */}
        <SmithBoard />
        <CodeTools />
        <div className="absolute top-0 right-0 mr-2 mt-2 md:mr-4 md:mt-4">
          <UserMenu />
        </div>
        {/* </div> */}

      </Layout>
      <ModalContainer
        modalChild={<NewProjectForm />}
        modalName={labels.NEW_PROJECT_LABEL}
        isModal
      >
      </ModalContainer>
      <ModalContainer
        modalChild={<PublishProjectForm />}
        modalName={labels.PUBLISH_PROJECT_LABEL}
        isModal
      >
      </ModalContainer>
      <ModalContainer
        modalChild={<ConfigsForm />}
        modalName={labels.CONFIGS_LABEL}
        isModal
      >
      </ModalContainer>
      {/* </HotkeysProvider> */}
    </>
  );
};