import { useRouter } from "@modules/router";
import { useLanguageQuery, useTranslation } from "@modules/i18n";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthProvider } from "@hooks/useAuthProvider";
import { cn } from "@utils/styles";

type SignUpFormProps = {
  // onSubmit?: (data: any) => void;
  // errorsRepeatPassword?: string;
};

const SingUpForm = ({ }: SignUpFormProps) => {
  const { t } = useTranslation();
  const [query] = useLanguageQuery()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const { register: signUp } = useAuthProvider()
  const { useHistory } = useRouter()
  const { push } = useHistory();

  const onSubmitSignUp = async (data) => {
    const { email, password } = data;

    try {
      const user = await signUp(data)
      console.log('succefull created', user);
      push('/saved', query);
    } catch (err) {
      setError("root.login", { message: err })
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitSignUp)} className="form-control">
      <label htmlFor="user" className="label">
        <span className="label-text uppercase font-bold">{t.login.username()}</span>
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
          <span className="label-text-alt uppercase" role="alert">{t.login.email_required()}</span>
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
        {...register("password", { required: true, deps: ['repeatPassword'] })}
      />
      {errors.password && (
        <label className="label">
          <span className="label-text-alt uppercase" role="alert">{t.login.password_required()}</span>
        </label>
      )}
      <label htmlFor="repeatPassword" className="label">
        <span className="label-text uppercase font-bold" role="alert">{t.login.repeat_password()}</span>
      </label>
      <input
        id="repeatPassword"
        name="repeatPassword"
        type="password"
        className="input input-bordered"
        aria-invalid={errors.repeatPassword ? "true" : "false"}
        {...register("repeatPassword", { required: true, validate: (v, values) => v == values.password })}
      />
      {errors.repeatPassword && (
        <label className="label">
          <span className="label-text-alt uppercase" role="alert">{t.login.password_match()}</span>
        </label>
      )}
      <button className="btn btn-primary mt-6 w-full lg:btn-wide self-center" type="submit">
        {t.login.sign_up()}
      </button>
      <div className={cn('alert alert-warning my-2 transition-opacity', errors?.root?.login ? 'opacity-100' : 'opacity-0')}>
        <span className="">
          {errors?.root?.login?.message}
        </span>
      </div>
    </form>
  );
};

export default SingUpForm;
