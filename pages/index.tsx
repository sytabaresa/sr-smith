import React, { useEffect, useState } from "react";
import AppLayout from "../components/templates/AppLayout";
import SmithBoard from "../components/molecules/smithBoard";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SmithContext } from "../providers/smithContext";
import { useTranslation } from "react-i18next";
import CodeTools from "../components/organisms/codeTools";
import DrawerSmithOptions from "../components/organisms/drawerSmithOptions";
import { UserMenu } from "../components/organisms/userMenu";
import { JXGDrawer } from "../components/organisms/tooltipActions";
import { configure, HotKeys } from "react-hotkeys";
import { useRouter } from "next/router";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase/clientApp";
import { SmithProject } from "../interfaces";
import { useUser } from "../providers/userContext";
import { useMachine } from "react-robot";
import editorMachine from '../components/atoms/codeEditorFSM'
import saveMachine from "../components/atoms/savingFSM";



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
  const { t } = useTranslation("smith");
  const router = useRouter();
  const { loadingUser, isAuthenticated } = useUser()
  const [ui, setUi] = useState(new JXGDrawer());
  // const [ui, setUi] = useState(useDrawner())
  const [boardOptions, setBoardOptions] = useState<any>(null);
  const [projectData, setProjectData] = useState(
    (null as SmithProject) || null
  );
  const [timer, setTimer] = useState(null)

  const keyMap = {
    EXIT: "esc",
  };
  const handlers = {
    EXIT: () => ui.sendEvent("EXIT"),
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
      send({ type: 'LOAD', value: router.query?.id as string})
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "smith", "footer"])),
      // Will be passed to the page component as props
    },
  };
}

export default SmithProject;
