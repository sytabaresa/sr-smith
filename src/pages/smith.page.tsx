import React, { useEffect, useState } from "react";
import Layout from "@components/templates/default";
import SmithBoard from "@components/molecules/smithBoard";
import { SmithContext } from "@providers/smithContext";
import CodeTools from "@components/organisms/codeTools";
import DrawerSmithMenu from "@components/organisms/drawerSmithOptions";
import { UserMenu } from "@components/organisms/userMenu";
import { JXGDrawer } from "@core/fsm/tooltipActionsFSM";
import { SmithProject } from "@localtypes/smith";
import { useUser } from "@components/organisms/userContext";
import { useMachine } from "react-robot";
import editorMachine from '@core/fsm/codeEditorFSM'
import saveMachine from "@core/fsm/savingFSM";
import { setInitial, useConfig } from "@hooks/useConfig";
import Footer from "@components/organisms/footer";
import { useHotkeys } from "react-hotkeys-hook";

import "@core/elements/smithPoint"
import "@core/elements/reCircle"
import "@core/elements/imCircle"
import "@core/elements/imCircleAd"
import "@core/elements/reCircleAd"

import ModalContainer from "@components/molecules/modalContainer";
import NewProjectForm from "@components/organisms/newProjectForm";
import PublishProjectForm from "@components/organisms/publishProjectForm";
import ConfigsForm from "@components/organisms/configForm";
import { useRouter } from "@modules/router";

import '@styles/jsxgraph.css';

// configs
const smithOptions = {
  coordPrecision: 3,
}
setInitial('config', smithOptions)

export { SmithProjectPage as Page }

const SmithProjectPage: React.FC = () => {
  const { useParams } = useRouter()
  const params = useParams();

  const { isAuthenticated } = useUser()
  const [ui, setUi] = useState(new JXGDrawer());
  // const [ui, setUi] = useState(useDrawner())
  const [boardOptions, setBoardOptions] = useState<any>(null);
  const [projectData, setProjectData] = useState((null as SmithProject) || null);

  // machines
  ui.useMachine();

  const editorService = useMachine(editorMachine, {
    code: '',
    ui,
  });

  // hotkeys and keystrokes
  useHotkeys('esc', () => ui.sendEvent("EXIT"))
  useHotkeys('delete', () => ui.sendEvent("DELETE"))
  useHotkeys('ctrl+enter', () => editorService[1]('PARSING'))

  // console.log(params.id[0])
  const saveService = useMachine(saveMachine, {
    id: params?.id?.[0],
    projectData,
    editorService,
  })

  useEffect(() => {
    setProjectData(projectData => ({ ...projectData, data: editorService[0].context.code }))
    const [c, send] = saveService
    send({ type: 'SAVE', value: editorService[0].context.code })
  }, [editorService[0].context.code]);

  useEffect(() => {
    if (isAuthenticated) {
      const [current, send] = saveService
      send({ type: 'LOAD', value: params?.id?.[0] as string })
    }
  }, [isAuthenticated]);

  // all context
  const context = {
    ui,
    code: editorService[0].context.code,
    boardOptions,
    setBoardOptions,
    editorService,
    saveService,
    projectData,
  };

  const labels = {
    NEW_PROJECT_LABEL: 'new-project-modal',
    PUBLISH_PROJECT_LABEL: 'publish-project-modal',
    CONFIGS_LABEL: 'configs-label'
  }

  return (
    <SmithContext.Provider value={context}>
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
    </SmithContext.Provider>
  );
};