import { useEffect, useState } from "react";
import Layout from "@components/templates/default";
import { useAuthProvider, useUser } from "@hooks/useAuthProvider";
import { useLanguageQuery, useTranslation } from "@modules/i18n";
import { useRouter } from "@modules/router";
import { GoogleIcon, MicrosoftIcon, RMICIcon } from "@components/atoms/icons";
import { AtSymbolIcon } from "@heroicons/react/outline";
import { EmailLogin } from "@components/organisms/login/emailLogin";
import { cn } from "@utils/styles";

export { Login as Page }

interface LoginProps {
  homePage?: string;
}

const Login = ({ homePage = "/saved" }: LoginProps) => {
  const { t } = useTranslation();
  const [query] = useLanguageQuery()

  const { useHistory, useParams } = useRouter()
  const { push } = useHistory();
  const params = useParams()

  const { isAuthenticated } = useUser();
  // console.log(isAuthenticated)
  const { login } = useAuthProvider()

  const [emailOpen, setEmailOpen] = useState(false)

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

  const onGoogleLogin = async (data) => {
    try {
      const user = await login({ provider: 'google' })
    } catch (err) {
      // setError("root.login", { message: err })
    }
  }

  const onMicrosoftLogin = async (data) => {
    try {
      const user = await login({ provider: 'microsoft' })
    } catch (err) {
      // setError("root.login", { message: err })
    }
  }

  return <Layout
    showComplement
    title="Saved | Sr Smith App"
    drawer={false}
    className="relative h-screen overflow-hidden"
    header={<div className="absolute w-full h-full blur-[6px] lg:blur-[2px] opacity-30">
      <img src="/images/cmyk2.svg" className="absolute w-[50rem] lg:w-[70rem] right-[-10rem] lg:right-[-20rem] bottom-[-4rem] opacity-70 hover:opacity-100" ></img>
    </div>}
  >
    <div className="flex-grow flex flex-col sm:flex-row items-center justify-center mt-2 sm:mt-0">
      <div className="flex flex-col items-center mt-4 sm:mt-0 sm:mr-16">
        <img className="w-40 hover:scale-110 transition ease-in-out delay-150 mb-2" src="/images/logo.png" alt="sr smith logo" />
        <h1 className="uppercase font-bold text-3xl md:text-5xl mt-2 md:mt-4">SR Smith</h1>
      </div>
      {/* <div className="hidden sm:block w-[3px] h-60 bg-base-content"></div> */}
      <RMICIcon className="-my-28 -rotate-90 sm:rotate-0 sm:static w-16 sm:w-auto h-80 fill-base-content object-cover" />
      <div className="px-8 w-full max-w-md flex sm:w-1/2 flex-col items-center mb-8 sm:my-0 sm:ml-8">
        <h2 className="self-start uppercase font-bold text-xl mb-2">{t.login.login()}:</h2>
        <button className="group btn border-2 btn-outline bg-base-100
       hover:bg-[#EA4335] hover:border-[#EA4335] hover:text-base-100 w-full mt-2 justify-start pl-[25%] sm:pl-[30%]" onClick={onGoogleLogin}>
          <GoogleIcon className="w-6 h-6 group-hover:fill-base-100 mr-4" />
          {t.login.google_login()}
        </button>
        <button className="group btn border-2 btn-outline bg-base-100
       hover:bg-[#81bc06] hover:border-[#81bc06] hover:text-base-100 w-full mt-2 justify-start pl-[25%] sm:pl-[30%]" onClick={onMicrosoftLogin}>
          <MicrosoftIcon className="w-6 h-6 group-hover:fill-base-100 mr-4" />
          {t.login.microsoft_login()}
        </button>
        <button className={cn("group btn border-2 btn-outline bg-base-100",
          "hover:bg-primary hover:border-primary hover:text-base-100 w-full mt-2 justify-start pl-[25%] sm:pl-[30%]", emailOpen ? "bg-primary border-primary text-base-100" : "")}
          onClick={() => setEmailOpen(e => !e)}>
          <AtSymbolIcon className={cn("w-6 h-6 stroke-primary stroke-[2.5px] group-hover:stroke-base-100 mr-4", emailOpen ? "stroke-base-100" : "")} />
          {t.login.email_login()}
        </button>
        <div className={cn("collapse", emailOpen ? 'collapse-open' : 'collapse-close')} >
          {/* <div className="collapse-title p-0">
          </div> */}
          <div className="collapse-content px-0">
            <EmailLogin className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  </Layout >
};