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
import machine from '../components/atoms/codeEditorFSM'


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
  const { loadingUser } = useUser()
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

  const editorMachine = useMachine(machine, {
    code: '',
    errorMsg: '',
    ui,
  });

  const updateDocument = async (data) => {
    console.log('updating data')
    const docRef = doc(db, `projects/${router.query.id}`);
    await updateDoc(docRef, {
      data,
      updateAt: Timestamp.now()
    } as SmithProject);
  };

  // data retrievers
  const getProjectData = async () => {
    const docRef = doc(db, `projects/${router.query.id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data() as SmithProject;
      // console.log(docData)
      setProjectData(docData);
      const [current, send] = editorMachine
      send({ type: 'CODE', value: docData.data });
      send('PARSING')
    }
  };

  useEffect(() => {
    if (projectData) {
      const [current, send] = editorMachine
      setProjectData({ ...projectData, data: current.context.code });
      clearTimeout(timer)
      setTimer(setTimeout(() => updateDocument(current.context.code), 3000))
    }
  }, [editorMachine[0].context.code]);

  useEffect(() => {
    if (!loadingUser) {
      getProjectData();
    }
  }, [loadingUser]);

  // all context
  const context = {
    ui,
    code: editorMachine[0].context.code,
    boardOptions,
    setBoardOptions,
    editorMachine,
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
