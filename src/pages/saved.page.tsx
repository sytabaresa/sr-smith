import WithAuth from "@hoc/withAuth";
import { useTranslation } from "@modules/i18n"
import Layout from "@components/templates/default";
import { PlusIcon, RefreshIcon } from "@heroicons/react/outline"
import NewProjectForm from "@components/molecules/newProjectForm";
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
    header={<div className="absolute w-full h-full blur-[6px] lg:blur-[2px] opacity-30">
    <img src="/images/cmyk2.svg" className="absolute w-[50rem] lg:w-[70rem] right-[-10rem] lg:right-[-20rem] bottom-[-4rem] opacity-70 hover:opacity-100" ></img>
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
        <div role="button" className="btn btn-primary lg:grap-2 btn-lg shadow-lg tooltip flex" data-tip={t.saved.create_project()}>
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
    // db.data?.refresh()
    console.error('not implemented with new db')
  }

  return <RefreshIcon className="mx-4 w-10 active:animate-spin" onClick={refresh} />

}

const Saved = WithAuth(SavedProjects);
