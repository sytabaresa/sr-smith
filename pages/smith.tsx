import React, { useState } from "react";
import AppLayout from "../components/smith/AppLayout";
import SmithBoard from "../components/smith/Board";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SmithContext } from "../components/smith/context";
import { useTranslation } from "react-i18next";
import EditorButton from "../components/smith/editorButton";

const Smith: React.FC = () => {
  const { t } = useTranslation('common')
  const [board, setBoard] = useState<any>(null);
  const [code, setCode] = useState<string>(`// test smith chart
point(0, 0) << name: 'O', fixed: true >>;
Z1 = point(.5, .5) <<name: 'Z1', color: 'green', size: 5>>;
L = line(Z1, O);
reflect = transform(PI, O) << type: 'rotate' >>;
Y1 = point(Z1, reflect) << name: 'Y1' >>;
circle(Y1, .3);`
  );

  const context = {
    board,
    boxName: 'smith-box',
    setBoard,
    code,
    setCode,
  }

  return (
    <AppLayout title="Smith Chart" >
      <SmithContext.Provider value={context}>
        <div className="h-screen flex relative">
          <SmithBoard />
          <div className="absolute top-0 left-0 ml-4 mt-4">
            <EditorButton />
          </div>
        </div>
      </SmithContext.Provider>
    </AppLayout>
  );
}


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'smith', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}

export default Smith;