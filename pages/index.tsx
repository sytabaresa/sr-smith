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
import { initializeWebWorker } from "../components/pwa";

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
  const { t } = useTranslation();
  const router = useRouter();
  const { loadingUser, isAuthenticated } = useUser()
  const [ui, setUi] = useState(new JXGDrawer());
  const [theme] = useTheme()
  // const [ui, setUi] = useState(useDrawner())
  const [boardOptions, setBoardOptions] = useState<any>(null);
  const [projectData, setProjectData] = useState(
    (null as SmithProject) || null
  );
  const [timer, setTimer] = useState(null)

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
    errorMsg: '',
    ui,
  });

  // data retrievers
  const sendCode = (ctx, ev) => {
    const [current, send] = editorService
    send({ type: 'CODE', value: ctx.projectData.data });
    send('PARSING')
  }

  const saveService = useMachine(saveMachine, {
    id: router.query?.id as string,
    projectData,
    loadHandler: sendCode,
  })

  useEffect(() => {
    const [current, send] = editorService
    setProjectData(projectData => ({ ...projectData, data: current.context.code }))
    const [c, send2] = saveService
    send2({ type: 'SAVE', value: current.context.code })
  }, [editorService[0].context.code]);

  useEffect(() => {
    if (isAuthenticated) {
      const [current, send] = saveService
      send({ type: 'LOAD', value: router.query?.id as string })
    }
  }, [isAuthenticated]);

  useEffect(() => {

    // web worker lifecycle
    initializeWebWorker()

    setTimeout(() => {

      const [current, send] = editorService
      send({ type: 'THEME', value: theme })
    }, 1000)

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
