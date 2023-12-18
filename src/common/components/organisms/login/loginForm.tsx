import { useTranslation } from "@modules/i18n";
import { useForm } from "react-hook-form";
import { useAuthProvider } from "@hooks/useAuthProvider";
import { GoogleIcon, MicrosoftIcon } from "@components/atoms/icons";
import { cn } from "@utils/styles";

type LoginFormProps = {
  // onSubmit: (data: any) => void;
}

const LoginForm = ({ }: LoginFormProps) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();
  const { login } = useAuthProvider()

  const onSubmitLogin = async (data) => {

    try {
      const user = await login(data)
      // Signed in
      // console.log(user);
    } catch (err) {
      setError("root.login", { message: err })
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitLogin)} className="form-control" method="post">
      <label htmlFor="user" className="label">
        <span className="label-text uppercase font-bold">
          {t.login.username()}
        </span>
      </label>
      <input
        id="user"
        name="user"
        type="email"
        placeholder={"test@example.com".toUpperCase()}
        className="input input-bordered"
        aria-invalid={errors.email ? "true" : "false"}
        {...register("email", { required: true })}
      />
      {errors.email && (
        <label className="label">
          <span className="label-text-alt uppercase" role="alert">
            {t.login.email_required()}
          </span>
        </label>
      )}

      <label htmlFor="password" className="label">
        <span className="label-text uppercase font-bold">{t.login.password()}</span>
      </label>
      <input
        id="password"
        name="password"
        type="password"
        className="input input-bordered"
        aria-invalid={errors.password ? "true" : "false"}
        {...register("password", { required: true })}
      />
      {errors.password && (
        <label className="label">
          <span className="label-text-alt uppercase" role="alert">
            {t.login.password_required()}
          </span>
        </label>
      )}
      <button
        className="btn btn-primary mt-6 w-full lg:btn-wide self-center"
        type="submit"
      >
        {isSubmitting ? t.login.logging_in() + "..." : isSubmitSuccessful ? t.login.done() : t.login.login()}
      </button>
      <div className={cn('alert alert-warning my-2 transition-opacity', errors?.root?.login ? 'opacity-100' : 'opacity-0')}>
        <span className="">
          {errors?.root?.login?.message}
        </span>
      </div>
    </form>
  )
}

export default LoginForm;