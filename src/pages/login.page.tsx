import { useEffect, useState } from "react";
import Layout from "@components/templates/default";
import { useUser } from "@hooks/useAuthProvider";
import SingUpForm from "@components/organisms/login/signupForm";
import LoginForm from "@components/organisms/login/loginForm";
import { useLanguageQuery, useTranslation } from "@modules/i18n";
import { useRouter } from "@modules/router";

export { Login as Page }

interface LoginProps {
  homePage?: string;
}

const Login = ({ homePage = "/saved" }: LoginProps) => {
  const { t } = useTranslation();
  const [query] = useLanguageQuery()
  const [isLogin, setIsLogin] = useState(true);

  const { useHistory, useParams } = useRouter()
  const { push } = useHistory();
  const params = useParams()

  const { isAuthenticated } = useUser();
  // console.log(isAuthenticated)

  useEffect(() => {
    // console.log(params.redirect)
    if (isAuthenticated) {
      if (params.redirect) {
        push(params.redirect, query)
      } else {
        push(homePage, query)
      }
    }
  }, [isAuthenticated])

  return <Layout
    showComplement
    title="Saved | Sr Smith App"
    drawer={false}
    className="relative h-screen overflow-hidden"
    header={<div className="absolute w-full h-full blur-[6px] lg:blur-[2px] opacity-30">
      <img src="/images/cmyk2.svg" className="absolute w-[50rem] lg:w-[70rem] right-[-10rem] lg:right-[-20rem] bottom-[-4rem] opacity-70 hover:opacity-100" ></img>
    </div>}
  >

    <div className="flex-grow flex flex-col items-center justify-start mt-2 lg:mt-20">
      <div className="flex flex-col items-center mb-6 hover:scale-110 transition ease-in-out delay-150">
        <img className="w-40" src="/images/logo.png" alt="sr smith logo" />
        <h1 className="uppercase font-bold text-3xl md:text-5xl my-4 md:my-8">SR Smith</h1>
      </div>
      <div className="tabs">
        <a
          className={`tab tab-lg tab-bordered uppercase font-bold ${isLogin ? "tab-active" : ""}`}
          onClick={() => setIsLogin(true)}
        >
          {t.login.login()}
        </a>
        <a
          className={`tab tab-lg tab-bordered uppercase font-bold ${!isLogin ? "tab-active" : ""
            }`}
          onClick={() => setIsLogin(false)}
        >
          {t.login.sign_up()}
        </a>
      </div>
      <div className="w-full px-4 sm:w-2/3 md:w-1/2 lg:w-1/3 z-10 mb-10">
        {isLogin ? (
          <LoginForm />
        ) : (
          <SingUpForm />
        )}
      </div>
    </div>
  </Layout>
};