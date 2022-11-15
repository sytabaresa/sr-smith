import { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../common/components/templates/default";
import { useUser } from "../common/components/organisms/userContext";
import { useRouter } from "next/router";
import { UrlObject } from "url";
import SingUpForm from "../common/components/organisms/login/signupForm";
import LoginForm from "../common/components/organisms/login/loginForm";
import { useLanguageQuery, useTranslation } from "next-export-i18n";
import { SmithImage } from "../common/components/atoms/smithImage";

interface LoginProps {
  homePage: UrlObject | string;
}

const Login = ({ homePage = "/saved" }: LoginProps) => {
  const { t } = useTranslation();
  const [query] = useLanguageQuery()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  const { isAuthenticated } = useUser();

  if (isAuthenticated) {
    if (router.query?.redirect) {
      router.push({ pathname: router.query?.redirect as string, query });
    } else {
      router.push({ pathname: homePage as string, query });
    }
  }

  return <Layout
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

export default Login;
