import React, { useEffect, useState } from "react";
import Layout from "@components/templates/default";
import SmithBoard from "@components/molecules/smithBoard";
import { SmithContext } from "@providers/smithContext";
import CodeTools from "@components/organisms/codeTools";
import DrawerSmithMenu from "@components/organisms/drawerSmithOptions";
import { UserMenu } from "@components/organisms/userMenu";
import { JXGDrawer } from "@core/fsm/tooltipActionsFSM";
import { configure, HotKeys } from "react-hotkeys";
import { SmithProject } from "@localtypes/smith";
import { useUser } from "@components/organisms/userContext";
import { useMachine } from "react-robot";
import editorMachine from '@core/fsm/codeEditorFSM'
import saveMachine from "@core/fsm/savingFSM";
import { useConfig } from "@hooks/useConfig";
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
import { useRouter } from "@modules/router";

import '@styles/jsxgraph.css';

export { SmithProjectPage as Page }

configure({
  /**
   * The level of logging of its own behaviour React HotKeys should perform.
   */
  logLevel: process.env.NODE_ENV == 'development' ? 'debug' : 'warn',
  ignoreTags: [],
  // ignoreEventsCondition: (event) => { return false; }
  stopEventPropagationAfterIgnoring: false,
  stopEventPropagationAfterHandling: false,
});

const SmithProjectPage: React.FC = () => {
  const { useParams } = useRouter()
  const params = useParams();

  const { isAuthenticated } = useUser()
  const [ui, setUi] = useState(new JXGDrawer());
  const [theme] = useConfig<string>('theme')
  // const [ui, setUi] = useState(useDrawner())
  const [boardOptions, setBoardOptions] = useState<any>(null);
  const [projectData, setProjectData] = useState((null as SmithProject) || null);

  // machines
  ui.useMachine();

  const editorService = useMachine(editorMachine, {
    code: '',
    ui,
    theme,
  });


  const keyMap = {
    EXIT: "esc",
    DELETE: "del",
    EXEC: "ctrl+enter",
  };

  const handlers = {
    EXIT: () => ui.sendEvent("EXIT"),
    DELETE: () => ui.sendEvent("DELETE"),
    EXEC: () => editorService[1]('PARSING')
  };

  const saveService = useMachine(saveMachine, {
    id: params.id,
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
      send({ type: 'LOAD', value: params.id as string })
    }
  }, [isAuthenticated]);

  // configs
  const smithOptions = {
    coordPrecision: 3,
  }
  useConfig('config', smithOptions)

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
      <HotKeys keyMap={keyMap} handlers={handlers}>
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
          className="w-10/12 md:w-3/12"
          modalChild={<NewProjectForm />}
          modalName={labels.NEW_PROJECT_LABEL}
          isModal
        >
        </ModalContainer>
        <ModalContainer
          className="w-10/12 md:w-3/12"
          modalChild={<PublishProjectForm />}
          modalName={labels.PUBLISH_PROJECT_LABEL}
          isModal
        >
        </ModalContainer>
        <ModalContainer
          className="w-10/12 md:w-3/12"
          modalChild={<ConfigsForm />}
          modalName={labels.CONFIGS_LABEL}
          isModal
        >
        </ModalContainer>
      </HotKeys>
    </SmithContext.Provider>
  );
};