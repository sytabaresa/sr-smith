import React from "react";
import { useForm } from "react-hook-form";
import { SmithProject } from "@localtypes/smith";
import { useTranslation, useLanguageQuery } from "@modules/i18n"
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
    try {
      // const user = await getUserIdentity(null)

      const doc = await create({
        resource: "projects",
        variables: {
          // createdAt: new Date(),
          data: "",
          description: projectDescription,
          hashReference: "",
          isPublic: false,
          name: projectName,
          // updatedAt: new Date(),
          // userId: user.uid,
        } as SmithProject
      }) as SmithProject
      push('/', { id: doc.id, lang: query.lang })
    } catch (e) {
      console.error("Error adding document: ", e);
      setError('projectName', { type: 'custom', message: e })
      reset({ keepValues: true })
    }
  };

  return (
    <form className="flex flex-col justify-center md:px-20" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="projectName" className="label">
        <span className="label-text uppercase font-bold">{t.project.name()}*</span>
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
          <span className="label-text-alt uppercase">{t.common.required_field()}</span>
        </label>
      )}
      <label htmlFor="projectDescription" className="label">
        <span className="label-text uppercase font-bold">{t.project.description()}</span>
      </label>
      <textarea
        id="projectDescription"
        name="projectDescription"
        className="input input-bordered"
        {...register("projectDescription", { required: false })}
      />
      <button className="btn btn-primary mt-10 w-1/2 self-center" type="submit">
        {isSubmitting ? t.project.creating() + "..." : isSubmitted ? t.project.done() : t.project.create()}
      </button>
    </form>
  );
};

export default NewProjectForm;
