import SingUpForm from "@components/organisms/login/signupForm";
import LoginForm from "@components/organisms/login/loginForm";
import { cn } from "@utils/styles";
import { useTranslation } from "@modules/i18n";
import { HTMLAttributes, useState } from "react";

export interface EmailLoginProps extends HTMLAttributes<HTMLDivElement> {

}

export function EmailLogin({ className }: EmailLoginProps) {
    const [isLogin, setIsLogin] = useState(true);
    const { t } = useTranslation();


    return <div className={cn(className)}>
        <div className="tabs flex justify-center">
            <a
                className={cn('tab tab-lg tab-bordered uppercase font-bold', isLogin ? "tab-active" : "")}
                onClick={() => setIsLogin(true)}
            >
                {t.login.login()}
            </a>
            <a
                className={cn('tab tab-lg tab-bordered uppercase font-bold', !isLogin ? "tab-active" : "")}
                onClick={() => setIsLogin(false)}
            >
                {t.login.sign_up()}
            </a>
        </div>
        <div className="w-full z-10 my-4">
            {isLogin ? (
                <LoginForm />
            ) : (
                <SingUpForm />
            )}
        </div>
    </div>
}