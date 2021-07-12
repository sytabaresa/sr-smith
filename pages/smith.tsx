import React, { useState } from "react";
import AppLayout from "../components/smith/AppLayout";
import SmithBoard from "../components/smith/Board";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SmithContext } from "../components/smith/context";
import JCText from "../components/smith/Editor";

const Smith: React.FC = () => {
  const [board, setBoard] = useState<any>(null);

  const context = {
    board,
    boxName: 'smith-box',
    setBoard
  }

  return (
    <AppLayout title="Smith Chart" >
      <SmithContext.Provider value={context}>
        <div className="h-screen flex relative">
          <SmithBoard />
          <JCText className="absolute top-0 left-0 ml-4 mt-4 w-96" />
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