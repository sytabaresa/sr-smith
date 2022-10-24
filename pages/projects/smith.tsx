import React, { useEffect, useState } from "react";
import AppLayout from "../../components/templates/AppLayout";
import SmithBoard from "../../components/molecules/smithBoard";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SmithContext } from "../../providers/smithContext";
import { useTranslation } from "react-i18next";
import CodeTools from "../../components/organisms/codeTools";
import DrawerSmithOptions from "../../components/organisms/drawerSmithOptions";
import { UserMenu } from "../../components/organisms/userMenu";
import { JXGDrawer } from "../../components/organisms/tooltipActions";
import { configure, HotKeys } from "react-hotkeys";
import { useRouter } from "next/router";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";
import { SmithProyect } from "../../interfaces";

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
  const [ui, setUi] = useState(new JXGDrawer());
  // const [ui, setUi] = useState(useDrawner())
  const [boardOptions, setBoardOptions] = useState<any>(null);
  const [projectData, setProjectData] = useState(
    (null as SmithProyect) || null
  );
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    setProjectData({ ...projectData, data: code });
    updateDocument();
  }, [code]);

  useEffect(() => {
    getProjectData();
  }, []);

  const getProjectData = async () => {
    const docRef = doc(db, `projects/${router.query.id}`);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() as SmithProyect;
    setProjectData(docData);
    setCode(docData.data);
  };

  const updateDocument = async () => {
    const docRef = doc(db, `projects/${router.query.id}`);
    await updateDoc(docRef, {
      data: code,
      updateAt: Timestamp.now()
    } as SmithProyect);
  };

  const context = {
    ui,
    code,
    setCode,
    boardOptions,
    setBoardOptions,
  };

  const keyMap = {
    EXIT: "esc",
  };
  const handlers = {
    EXIT: () => ui.sendEvent("EXIT"),
  };

  ui.useMachine();

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
