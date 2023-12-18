
import { useTranslation } from "@modules/i18n"
import { EinvLogo } from "./icons"

export const About = () => {
    const { t } = useTranslation()

    return <>
        <img src="/images/cmyk2.svg" className="absolute -z-10 w-[50rem] right-[-50%] bottom-0 opacity-50 blur-sm" ></img>
        <div className="card">
            <div className="card-body">
                <article className="prose prose-headings:uppercase prose-headings:my-4">
                    <div className="flex flex-col md:flex-row items-center justify-center">
                        <img className="w-32 m-0 md:mr-4" src="/images/logo.png" alt="sr smith logo" />
                        <h1>Sr Smith</h1>
                    </div>
                    {/* <a rel="license" href="https://www.gnu.org/licenses/gpl-3.0.en.html">
                    <img
                        alt={t.license.image()}
                        className="w-32 h-16 my-1"
                        style={{ borderWidth: 0, paddingRight: 5 }}
                        src='/images/gplv3.png'
                        loading={"lazy"}
                    />
                </a>
                <span className="pr-1">{t.license.work()}</span>
                <a rel="license" className="link" href="https://www.gnu.org/licenses/gpl-3.0.en.html">
                    {" "}
                    {t.license.license()}.
                </a> */}
                    <h2>{t.license.authors()}:</h2>
                    <span>
                        Made with ❤️ by {' '}
                        <a
                            className="link"
                            href="https://www.linkedin.com/in/sytabaresa"
                        >
                            @syta
                        </a>
                        <br />
                        A product of <a href="https://einv.tech" className="" ><EinvLogo className="ml-1 inline fill-current w-6 h-6" /></a>
                    </span>
                    <h2>{t.about.tesis()}:</h2>
                    <p>
                        {t.about.desc()} <a className="link" href="/event">{t.about.here()}.</a>
                    </p>
                    {/* <h2></h2> */}
                </article>
            </div>
        </div>
    </>
}