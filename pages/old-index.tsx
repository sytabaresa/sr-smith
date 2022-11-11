import Link from 'next/link'
import Layout from '../components/templates'
import MainCard from '../components/Card';
import { useTranslation } from "next-export-i18n";

const IndexPage = () => {
  const { t } = useTranslation("common")
  const { t: tapps } = useTranslation("apps")

  const apps = [
    {
      title: 'smith',
      link: '/projects',
      bgImage: "/images/smith-app.png"
    },
    {
      title: 'circuit-automata',
      link: '/circuit',
      bgImage: "/images/on-construction.jpeg"
    },
    {
      title: 'antenna-patterns',
      link: '/antenna-patterns',
      bgImage: "/images/on-construction.jpeg"
    }
  ]

  return (
    <Layout title="Home | Sr Smith App">
      <h1 className="text-blue-500 text-xl">{t('main-title')}</h1>
      <div className="w-full flex px-2 sm:px-10 mt-4 flex-wrap">
        {apps.map(({ link, title, bgImage }, index) =>
          <Link href={link} key={index}>
            <div className="w-full sm:w-1/2 lg:w-1/4 p-2">
              <MainCard title={tapps(title)} bgImage={bgImage} />
            </div>
          </Link>
        )}
      </div>
    </Layout>
  )

}

export default IndexPage
