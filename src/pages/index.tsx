import React, { useEffect, useState } from "react";
import Layout from "../common/components/templates/default";
import SmithBoard from "../common/components/molecules/smithBoard";
import { SmithContext } from "../common/providers/smithContext";
import CodeTools from "../common/components/organisms/codeTools";
import DrawerSmithOptions from "../common/components/organisms/drawerSmithOptions";
import { UserMenu } from "../common/components/organisms/userMenu";
import { JXGDrawer } from "../modules/core/fsm/tooltipActionsFSM";
import { configure, HotKeys } from "react-hotkeys";
import { useRouter } from "next/router";
import { SmithProject } from "../common/types/smith";
import { useUser } from "../common/components/organisms/userContext";
import { useMachine } from "react-robot";
import editorMachine from '../modules/core/fsm/codeEditorFSM'
import saveMachine from "../modules/core/fsm/savingFSM";
import { useConfig } from "../common/hooks/useConfig";
import { useTheme } from "../common/hooks/useTheme";
import Footer from "../common/components/organisms/footer";

import "../modules/core/elements/smithPoint"
import "../modules/core/elements/reCircle"
import "../modules/core/elements/imCircle"

configure({
  /**
   * The level of logging of its own behaviour React HotKeys should perform.
   */
  // logLevel: 'verbose',
  ignoreTags: [],
  // ignoreEventsCondition: (event) => { return false; }
  stopEventPropagationAfterIgnoring: false,
  stopEventPropagationAfterHandling: false,
});

const SmithProject: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useUser()
  const [ui, setUi] = useState(new JXGDrawer());
  const [theme] = useTheme()
  // const [ui, setUi] = useState(useDrawner())
  const [boardOptions, setBoardOptions] = useState<any>(null);
  const [projectData, setProjectData] = useState((null as SmithProject) || null);

  const keyMap = {
    EXIT: "esc",
    DELETE: "shift+d",
  };

  const handlers = {
    EXIT: () => ui.sendEvent("EXIT"),
    DELETE: () => ui.sendEvent("DELETE"),
  };

  // machines
  ui.useMachine();

  const editorService = useMachine(editorMachine, {
    code: '',
    ui,
    theme,
  });

  const saveService = useMachine(saveMachine, {
    id: router.query?.id as string,
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
      send({ type: 'LOAD', value: router.query?.id as string })
    }
  }, [isAuthenticated]);

  // configs
  const smithOptions = {
    coordPrecision: 3,
  }
  useConfig(smithOptions)

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

  return (
    <Layout 
    title="Smith Chart" 
    footerComponent={<Footer className="absolute bottom-0 left-0 ml-1 mb-1" />}
    navbar={false}
    >
      <SmithContext.Provider value={context}>
        <HotKeys keyMap={keyMap} handlers={handlers}>
          <div className="drawer drawer-end h-full relative">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex">
              <SmithBoard />
              <CodeTools />
              <div className="absolute top-0 right-0 mr-4 mt-4">
                <UserMenu />
              </div>
            </div>
            <DrawerSmithOptions />
          </div>
        </HotKeys>
      </SmithContext.Provider>
    </Layout>
  );
};

export default SmithProject;
