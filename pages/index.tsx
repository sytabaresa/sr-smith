import Link from 'next/link'
import Layout from '../components/templates'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainCard from '../components/Card';
import { useTranslation } from 'next-i18next';

const IndexPage = () => {
  const { t } = useTranslation("common")
  const { t: tapps } = useTranslation("apps")

  const apps = [
    {
      title: 'smith',
      link: '/smith',
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
      <p>
        <div className="w-full flex px-2 sm:px-10 mt-4 flex-wrap">
          {apps.map(({ link, title, bgImage }) =>
            <Link href={link}>
              <div className="w-full sm:w-1/2 lg:w-1/4 p-2">
                <MainCard title={tapps(title)} bgImage={bgImage} />
              </div>
            </Link>
          )}
        </div>
      </p>
    </Layout>
  )

}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'apps', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}

export default IndexPage
