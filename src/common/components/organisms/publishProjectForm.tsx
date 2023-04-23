import { useState } from "react";
import { SmithProject } from "@localtypes/smith";
import { useTranslation } from "@modules/i18n"
import { useDataProvider } from "@hooks/useDataProvider";
import { savingServiceAtom } from "@fsm/atoms";
import { useAtomValue } from "jotai";
// import { Timestamp } from "firebase/firestore";

type PublishProjectFormProps = {
  // onSubmit: (data: any) => void;
};

const PublishProjectForm = ({ }: PublishProjectFormProps) => {
  const { t } = useTranslation()
  const current = useAtomValue(savingServiceAtom)
  const projectData = current.context.projectData
  const { update } = useDataProvider()
  const [publicState, setPublicState] = useState(projectData?.isPublic || false)
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")

  const updatePublicState = async (e) => {
    const newPublicState = !publicState
    console.log(`making ${newPublicState ? 'public' : 'private'} project: ${projectData.id}`)
    setPublicState(newPublicState)
    setError("")
    setInfo('')
    try {
      const res = await update({
        resource: 'projects',
        id: projectData.id,
        variables: {
          isPublic: publicState,
          // updatedAt: new Date()
        } as SmithProject
      })
      console.log('changed sucessfully')
      setInfo('ok!')
    } catch (err) {
      console.log("Error adding document: ", err);
      setError(err.code)
      setPublicState(!newPublicState)
    }
  };

  return (
    <form className="flex flex-col justify-start md:px-20 min-h-16">
      <label htmlFor="projectName" className="label cursor-pointer">
        <span className="label-text uppercase font-bold">{t.settings.make_public()}?</span>
        <input type="checkbox" className="toggle" onChange={updatePublicState} checked={publicState} />
      </label>
      {error != "" && <span className="text-red-500">{error.toString()}</span>}
      {info != "" && <span className="text-green-600">{info.toString()}</span>}
    </form>
  );
};

export default PublishProjectForm;
