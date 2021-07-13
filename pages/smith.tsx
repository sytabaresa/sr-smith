import React, { useState } from "react";
import AppLayout from "../components/smith/AppLayout";
import SmithBoard from "../components/smith/Board";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SmithContext } from "../components/smith/context";
import { useTranslation } from "react-i18next";
import EditorButton from "../components/smith/editorButton";
import { ViewGridIcon, MenuAlt3Icon, DotsHorizontalIcon } from '@heroicons/react/outline'
import Link from "next/link";

const Smith: React.FC = () => {
  const { t } = useTranslation('smith')
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
          <div className="absolute top-0 left-0 ml-4 mt-4 w-96">
            <div className="form-control">
              <div className="flex space-x-2">
                <input type="text" placeholder={t('search')} className="w-full input input-primary input-bordered" />
                <button className="btn btn-primary">{t('go')}</button>
              </div>
              <div className="form-control flex-row">

                <label className="cursor-pointer label mr-6">
                  <span className="label-text font-bold mr-2">{t('smith-mode')}</span>
                  <div>
                    <input type="checkbox" className="toggle toggle-primary" />
                    <span className="toggle-mark"></span>
                  </div>
                </label>
                <label className="cursor-pointer label mr-6">
                  <span className="label-text font-bold mr-2">{t('option-2')}</span>
                  <div>
                    <input type="checkbox" className="toggle toggle-primary" />
                    <span className="toggle-mark"></span>
                  </div>
                </label>
              </div>
            </div>
            <div className="btn-group">
              <EditorButton />
              <button className="btn"><DotsHorizontalIcon className="h-5 w-5" /></button>
            </div>
          </div>
          <div className="absolute top-0 right-0 mr-4 mt-4">
            <div className="flex items-center">
              <div className="avatar mr-4">
                <div className="rounded-full ring ring-primary w-14 h-14">
                  <img src="https://s.gravatar.com/avatar/718ba64442e4dc180aa0be6b0a9617b1?s=80 " />
                </div>
              </div>
              <div className="btn-group">

                <Link href="/">
                  <button className="btn btn-lg btn-active"><ViewGridIcon className="h-5 w-5" /></button>
                </Link>
                {/* <div className="dropdown dropdown"> */}
                <button className="btn btn-lg"><MenuAlt3Icon className="h-5 w-5" /></button>
                {/* <FileMenu />
            </div> */}
              </div>
            </div>
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