import { doc, Timestamp, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { auth, db } from "../../firebase/clientApp";
import { SmithProject } from "../../interfaces";
import { SmithContext } from "../../providers/smithContext";
import { useTranslation } from "next-export-i18n"

type PublishProjectFormProps = {
  // onSubmit: (data: any) => void;
};

const PublishProjectForm = ({ }: PublishProjectFormProps) => {
  const { t } = useTranslation()
  const { projectData } = useContext(SmithContext)
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
      const docRef = doc(db, `projects/${projectData.updateAt}`);
      const res = await updateDoc(docRef, {
        isPublic: publicState,
        updateAt: Timestamp.now()
      } as SmithProject);
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
        <span className="label-text">{t("MakePublic")}?</span>
        <input type="checkbox" className="toggle" onChange={updatePublicState} checked={publicState} />
      </label>
      {error != "" && <span className="text-red-500">{error.toString()}</span>}
      {info != "" && <span className="text-green-600">{info.toString()}</span>}
    </form>
  );
};

export default PublishProjectForm;
