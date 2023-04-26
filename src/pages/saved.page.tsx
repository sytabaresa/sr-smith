import WithAuth from "@hoc/withAuth";
import { useTranslation } from "@modules/i18n"
import Layout from "@components/templates/default";
import { SmithImage } from "@components/atoms/smithImage";
import { PlusIcon, RefreshIcon } from "@heroicons/react/outline"
import NewProjectForm from "@components/organisms/newProjectForm";
import { useDataProvider, useList } from "@hooks/useDataProvider";
import createModal from "@components/molecules/createModal";
import { ProjectList } from "@components/molecules/projectList";

export { Saved as Page }

const SavedProjects = () => {
  const { t } = useTranslation()

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
        {/* <Suspense fallback={<></>}> */}
        <Refresh />
        {/* </Suspense> */}
      </div>
        <ProjectList />
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

const Refresh = () => {
  const db = useDataProvider()
  // console.log(db)

  const refresh = async (e) => {
    db.data?.refresh()
  }

  return <RefreshIcon className="mx-4 w-10 active:animate-spin" onClick={refresh} />

}

const Saved = WithAuth(SavedProjects);
