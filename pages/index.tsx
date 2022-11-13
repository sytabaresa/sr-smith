import React, { useEffect, useState } from "react";
import AppLayout from "../components/templates/AppLayout";
import SmithBoard from "../components/molecules/smithBoard";
import { SmithContext } from "../providers/smithContext";
import CodeTools from "../components/organisms/codeTools";
import DrawerSmithOptions from "../components/organisms/drawerSmithOptions";
import { UserMenu } from "../components/organisms/userMenu";
import { JXGDrawer } from "../components/organisms/tooltipActions";
import { configure, HotKeys } from "react-hotkeys";
import { useRouter } from "next/router";
import { SmithProject } from "../interfaces";
import { useUser } from "../providers/userContext";
import { useMachine } from "react-robot";
import editorMachine from '../components/atoms/codeEditorFSM'
import saveMachine from "../components/atoms/savingFSM";
import { useTranslation } from "next-export-i18n";

import "../components/atoms/smithPoint"
import "../components/atoms/reCircle"
import "../components/atoms/imCircle"
import { useConfig } from "../components/atoms/useConfig";
import { useTheme } from "../components/atoms/useTheme";
import { initializeServiceWorker } from "../components/pwa";

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
    setProjectData(projectData => ({ ...projectData, data: editorService[0].context.code}))
    const [c, send] = saveService
    send({ type: 'SAVE', value: editorService[0].context.code})
  }, [editorService[0].context.code]);

  useEffect(() => {
    if (isAuthenticated) {
      const [current, send] = saveService
      send({ type: 'LOAD', value: router.query?.id as string })
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // service worker lifecycle handlers
    initializeServiceWorker()
  }, [])

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
    <AppLayout title="Smith Chart">
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
    </AppLayout>
  );
};

export default SmithProject;
