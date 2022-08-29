import { useTranslation } from "next-i18next";
import React from "react"
import { useForm } from "react-hook-form";


type SignUpFormProps = {
    onSubmit: (data: any) => void;
    errorsRepeatPassword?: string;
}

const SingUpForm = ({onSubmit, errorsRepeatPassword}: SignUpFormProps) => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-control">
                <label htmlFor="user" className="label">
                  <span className="label-text">{t("username")}</span>
                </label>
                <input
                  id="user"
                  name="user"
                  type="email"
                  placeholder="test@example.com"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt">
                      {t("email-required")}
                    </span>
                  </label>
                )}

                <label htmlFor="password" className="label">
                  <span className="label-text">{t("password")}</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="input input-bordered"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt">
                      {t("password-required")}
                    </span>
                  </label>
                )}
                <label htmlFor="repeatPassword" className="label">
                  <span className="label-text">{t("repeat password")}</span>
                </label>
                <input
                  id="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  className="input input-bordered"
                  {...register("repeatPassword", { required: true })}
                />
                  <label className="label">
                    <span className="label-text-alt">
                      {errorsRepeatPassword}
                    </span>
                  </label>
                <button
                  className="btn btn-primary mt-10 w-1/2 self-center"
                  type="submit"
                >
                  {t("Sign up")}
                </button>
              </form>
    )
}

export default SingUpForm