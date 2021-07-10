import React from "react";
import AppLayout from "../components/smith/AppLayout";
import SmithBoard from "../components/smith/board";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Smith: React.FC = () => {
    return (
        <AppLayout title="Smith Chart" >
          <div className="h-screen flex">
            <SmithBoard />
          </div>
        </AppLayout>
    );
}


export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'footer'])),
        // Will be passed to the page component as props
      },
    };
  }

export default Smith;