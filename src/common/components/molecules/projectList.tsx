import { RefreshIcon } from "@heroicons/react/outline"
import { useDataProvider, useList } from "@hooks/useDataProvider"
import { SmithProject } from "@localtypes/smith"
import { useTranslation } from "@modules/i18n"
import ProjectCard from "@components/atoms/projectCard"


interface ProjectListProps {

}

export const ProjectList = (props: ProjectListProps) => {
    const { t } = useTranslation()
    // const db = useDataProvider()
    const projects = useList({ resource: 'projects' }) as SmithProject[]

    // console.log(db)
    // console.log(projects)
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
                        <ProjectCard
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