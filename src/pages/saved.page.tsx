import WithAuth from "@hoc/withAuth";
import SavedProjectCard from "@components/molecules/savedProjectCard";
import { SmithProject } from "@localtypes/smith";
import { useTranslation } from "@modules/i18n"
import Layout from "@components/templates/default";
import { SmithImage } from "@components/atoms/smithImage";
import { PlusIcon, RefreshIcon } from "@heroicons/react/outline"
import ModalContainer from "@components/molecules/modalContainer";
import NewProjectForm from "@components/organisms/newProjectForm";
import { useDataProvider, useList } from "@hooks/useDataProvider";
import createModal from "@components/molecules/createModal";

export { Saved as Page }

const SavedProjects = () => {
  const { t } = useTranslation()
  const db = useDataProvider()
  const userProjects = useList({ resource: 'projects' }) as SmithProject[]

  const refresh = async (e) => {
    db.refresh()
  }

  const renderSavedProjects = (projects: SmithProject[]) => {
    return <>
      {!projects ? <div className="flex items-center justify-center">
        <RefreshIcon className="animate-spin w-8 h-8 mr-2 my-4" />
        <h3 className="text-xl uppercase">{t.common.loading()}...</h3>
      </div> :
        (projects.length == 0 ?
          <div className="my-4">
            <h3 className="text-center text-xl uppercase">{t.saved.no_projects()}</h3>
          </div>
          : <div className="flex flex-wrap justify-center lg:justify-start lg:mx-8">
            {projects.map((item, i) =>
              <SavedProjectCard
                key={i}
                className="m-4"
                project={item}
              />
            )}
          </div>
        )
      }
    </>
  }

  const newProject = createModal('new-project')

  return <Layout
    title="Projects | Sr Smith App"
    className="h-screen relative overflow-hidden"
    header={<div className="absolute w-full h-full blur-[3px] lg:blur-sm -z-10">
      <SmithImage className="absolute w-96 lg:w-[50rem] left-[-10rem] top-[-15rem] opacity-40 hover:opacity-100 stroke-error trasnform -scale-x-100 scale-y-100 motion-safe:animate-pulse hover:animate-none" />
      <SmithImage className="absolute w-60 lg:w-[30rem] right-0 lg:right-[1rem] bottom-[2rem] opacity-40 hover:opacity-100 stroke-warning motion-safe:animate-pulse hover:animate-none" />
    </div>}
  >
    <div className="w-full">
      <div className="flex items-center justify-center mb-4 lg:mt-4 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-center uppercase">
          {t.saved.prev_projects()}
        </h1>
        <RefreshIcon className="mx-4 w-10 active:animate-spin" onClick={refresh} />
      </div>
      {renderSavedProjects(userProjects)}
    </div>
    <newProject.Label>
      <div className="fixed right-0 bottom-0 mb-4 mr-4">
        <div role="button" className="btn lg:grap-2 btn-lg shadow-lg tooltip flex" data-tip={t.saved.create_project()}>
          <span className="mr-4 hidden lg:inline-block">{t.saved.create_project()}</span>
          <PlusIcon className="h-8 w-8" />
        </div>
      </div>
    </newProject.Label>
    <newProject.Modal>
      <NewProjectForm />
    </newProject.Modal>
  </Layout>
};

const Saved = WithAuth(SavedProjects);
