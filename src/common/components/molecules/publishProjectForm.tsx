import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "@modules/i18n"
import { projectDataAtom, savingServiceAtom } from "@core/atoms/smith";
import { useAtom, } from "jotai";
// import { Timestamp } from "firebase/firestore";

type PublishProjectFormProps = {
  // onSubmit: (data: any) => void;
};

const PublishProjectForm = ({ }: PublishProjectFormProps) => {
  const { t } = useTranslation()
  const [projectData, setProjectData] = useAtom(projectDataAtom)
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")

  const updatePublicState = useCallback(async (e) => {
    const newPublicState = !projectData?.project.isPublic
    console.log(newPublicState, `making ${newPublicState ? 'public' : 'private'} project: ${projectData.id}`)
    setError("")
    setInfo("")

    try {
      const res = await setProjectData({ isPublic: newPublicState }, {})
      console.log('changed sucessfully')
      setInfo('ok!')
    } catch (err) {
      console.log("Error adding document: ", err);
      setError(err.code)
    }
  }, [projectData])

  return (
    <form className="flex flex-col justify-start md:px-20 min-h-16">
      <label className="label cursor-pointer">
        <span className="label-text uppercase font-bold">{t.settings.make_public()}?</span>
        <input type="checkbox" className="toggle" onChange={updatePublicState} checked={!!projectData?.project?.isPublic} disabled={projectData?.readOnly ?? true} />
      </label>
      {error != "" && <span className="text-red-500">{error?.toString()}</span>}
      {info != "" && <span className="text-green-600">{info?.toString()}</span>}
    </form>
  );
};

export default PublishProjectForm;
