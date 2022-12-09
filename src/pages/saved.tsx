import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import WithAuth from "../common/hoc/withAuth";
import SavedProjectCard from "../common/components/molecules/savedProjectCard";
import { SmithProject } from "../common/types/smith";
import { useUser } from "../common/components/organisms/userContext";
import { useLanguageQuery, useTranslation } from "next-export-i18n"
import Layout from "../common/components/templates/default";
import { SmithImage } from "../common/components/atoms/smithImage";
import { PlusIcon, RefreshIcon } from "@heroicons/react/outline";
import ModalContainer from "../common/components/molecules/modalContainer";
import NewProjectForm from "../common/components/organisms/newProjectForm";
import { useDataProvider } from "../common/hooks/useDataProvider";

const SavedProjects = () => {
  const NEW_PROJECT_LABEL = 'new-project'
  const { t } = useTranslation()
  const [query2] = useLanguageQuery()
  const router = useRouter();
  const [userProjects, setUserProjects] = useState(null as SmithProject[]);
  const { user } = useUser()
  const { getList } = useDataProvider()

  useEffect(() => {
    if (user) {
      getSavedProjects(user.uid)
    }
  }, [user])

  const getSavedProjects = async (userUid: string) => {
    const projectsList: SmithProject[] = await getList({ resource: 'projects', filters: [{ v1: 'userId', op: '==', v2: userUid }] })
    setUserProjects(projectsList);
  };

  const goToSavedProject = (projectId: string) => {
    router.push({ pathname: '/', query: { ...query2, id: projectId } });
  }

  const newProject = async (e) => {

  }

  const renderSavedProjects = (projects: SmithProject[]) => {
    return <>
      {!projects ? <div className="flex items-center justify-center">
        <RefreshIcon className="animate-spin w-8 h-8 mr-2 my-4" />
        <h3 className="text-xl">{t("loading")}...</h3>
      </div> :
        (projects.length == 0 ?
          <div className="my-4">
            <h3 className="text-center text-xl">{t("no projects")}</h3>
          </div>
          : <div className="flex flex-wrap justify-center lg:justify-start lg:mx-8">
            {projects.map((item, i) =>
              <div
                key={i}
                className="m-4"
                onClick={() => { goToSavedProject(item.id) }}
              >
                <SavedProjectCard
                  title={item.name}
                  description={item.description}
                  image="/images/smith-app.png"
                  id={""}
                />
              </div>
            )}
          </div>
        )
      }
    </>
  }

  return <Layout
    title="Projects | Sr Smith App"
    className="h-screen relative overflow-hidden"
    header={<div className="absolute w-full h-full blur-[3px] lg:blur-sm -z-10">
      <SmithImage className="absolute w-96 lg:w-[50rem] left-[-10rem] top-[-15rem] opacity-40 hover:opacity-100 stroke-error trasnform -scale-x-100 scale-y-100 motion-safe:animate-pulse hover:animate-none" />
      <SmithImage className="absolute w-60 lg:w-[30rem] right-0 lg:right-[1rem] bottom-[2rem] opacity-40 hover:opacity-100 stroke-warning motion-safe:animate-pulse hover:animate-none" />
    </div>}
  >
    <div className="overflow-y-auto h-full scrollbar-thin scrollbar-track-base-100 scrollbar-thumb-base-content flex-grow">
      <h1 className="text-2xl lg:text-3xl font-bold text-center mb-4 lg:mt-4 lg:mb-8">
        {t('Previous Projects')}
      </h1>
      {renderSavedProjects(userProjects)}
    </div>
    <label htmlFor={NEW_PROJECT_LABEL} className="fixed right-0 bottom-0 mb-4 mr-4 flex items-center tooltip" data-tip={t('create project')} onClick={newProject}>
      <div role="button" className="btn lg:grap-2 btn-lg shadow-lg">
        <span className="mr-4 hidden lg:block">{t('create project')}</span>
        <PlusIcon className="h-8 w-8" />
      </div>
    </label>
    <ModalContainer
      className="w-10/12 md:w-3/12"
      modalChild={<NewProjectForm />}
      modalName={NEW_PROJECT_LABEL}
      isModal
    />
  </Layout>
};

export default WithAuth(SavedProjects);
