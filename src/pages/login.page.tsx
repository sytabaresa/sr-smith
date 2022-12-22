import { useEffect, useState } from "react";
import Layout from "@components/templates/default";
import { useUser } from "@components/organisms/userContext";
import SingUpForm from "@components/organisms/login/signupForm";
import LoginForm from "@components/organisms/login/loginForm";
import { useLanguageQuery, useTranslation } from "@hooks/i18n";
import { SmithImage } from "@components/atoms/smithImage";
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
  console.log(isAuthenticated)

  useEffect(() => {
    console.log(params.redirect)
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
    className="relative h-screen overflow-hidden"
    header={<div className="absolute w-full h-full blur-[6px] lg:blur-[6px]">
      <SmithImage className="absolute w-96 lg:w-[50rem] left-[-10rem] bottom-[-4rem] opacity-40 hover:opacity-100 stroke-success transform -scale-x-100 scale-y-100 animate-i motion-reduce:animation-none hover:animate-none transition delay-[3000ms]" />
      <SmithImage className="absolute w-60 lg:w-[30rem] right-[-1rem] lg:right-[-4rem] top-[2rem] opacity-40 hover:opacity-100 stroke-error animate-i motion-reduce:animation-none hover:animate-none" />
      <div className="opacity-50">
        <SmithImage className="absolute hiddsen lg:block w-[40rem] lg:w-[60rem] right-[-10rem] bottom-[-20rem] lg:bottom-[-30rem] opacity-40 hover:opacity-100 stroke-orange-400 animate-i motion-reduce:animation-none hover:animate-none transition delay-[7000ms]" />
      </div>
    </div>}
  >

    <div className="flex-grow flex flex-col items-center justify-start mt-20 lg:mt-40">
      <div className="tabs">
        <a
          className={`tab tab-lg tab-bordered ${isLogin ? "tab-active" : ""}`}
          onClick={() => setIsLogin(true)}
        >
          {t("Login")}
        </a>
        <a
          className={`tab tab-lg tab-bordered ${!isLogin ? "tab-active" : ""
            }`}
          onClick={() => setIsLogin(false)}
        >
          {t("Sign Up")}
        </a>
      </div>
      <div className="w-full px-4 sm:w-2/3 md:w-1/2 lg:w-1/3 z-10">
        {isLogin ? (
          <LoginForm />
        ) : (
          <SingUpForm />
        )}
      </div>
    </div>
  </Layout>
};