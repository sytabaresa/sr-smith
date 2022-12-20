import React from "react";
import { useForm } from "react-hook-form";
import { SmithProject } from "@localtypessmith";
import { useTranslation, useLanguageQuery } from "@utils/i18n"
import { useDataProvider } from "@hooks/useDataProvider";
// import { Timestamp } from "firebase/firestore";
import { useAuthProvider } from "@hooks/useAuthProvider";
import { qStr } from "@utils/common";
import { useRouter } from "@modules/router";

type NewProjectFormProps = {
  // onSubmit: (data: any) => void;
};


const NewProjectForm = ({ }: NewProjectFormProps) => {
  const { t } = useTranslation()
  const [query] = useLanguageQuery()
  const { useHistory } = useRouter()
  const { push } = useHistory();
  const { getUserIdentity } = useAuthProvider()
  const { create } = useDataProvider()

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if (isSubmitting) return
    // clearErrors()
    const { projectName, projectDescription } = data;
    const user = await getUserIdentity(null)

    try {
      const docRef = await create({
        resource: "projects",
        variables: {
          createAt: new Date(),
          data: "",
          description: projectDescription,
          hashReference: "",
          isPublic: false,
          name: projectName,
          updateAt: new Date(),
          userId: user.uid,
        } as SmithProject
      })
      push('/', { lang: query.lang })
    } catch (e) {
      console.error("Error adding document: ", e);
      setError('projectName', { type: 'custom', message: e })
      reset({ keepValues: true })
    }
  };

  return (
    <form className="flex flex-col justify-center md:px-20" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="projectName" className="label">
        <span className="label-text">{t('Project Name')}*</span>
      </label>
      <input
        id="projectName"
        name="projectName"
        type="text"
        className="input input-bordered"
        {...register("projectName", { required: true })}
      />
      {errors.projectName && (
        <label className="label">
          <span className="label-text-alt">{t('Required Field')}</span>
        </label>
      )}
      <label htmlFor="projectDescription" className="label">
        <span className="label-text">{t('Project Description')}</span>
      </label>
      <textarea
        id="projectDescription"
        name="projectDescription"
        className="input input-bordered"
        {...register("projectDescription", { required: false })}
      />
      <button className="btn btn-primary mt-10 w-1/2 self-center" type="submit">
        {isSubmitting ? t('Creating') + "..." : isSubmitted ? t('Done') : t('Create')}
      </button>
    </form>
  );
};

export default NewProjectForm;
