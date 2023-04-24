
import { useTranslation } from "@modules/i18n"

export const About = () => {
    const { t } = useTranslation()

    return <div className="card">
        <div className="card-body">
            <article class="prose prose-headings:uppercase prose-headings:my-4">
                <h1>Sr Smith</h1>
                <a rel="license" href="https://www.gnu.org/licenses/gpl-3.0.en.html">
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
                </a>
                <h2>{t.license.authors()}:</h2>
                <span>
                    <a
                        className="link"
                        href="https://www.linkedin.com/in/sytabaresa"
                    >
                        @sytabares
                    </a>
                    {" - "}
                    <a className="link" href="https://github.com/kellar1896">
                        @cbarreto
                    </a>
                </span>
                <h2>{t.about.tesis()}:</h2>
                {t.about.desc()} <a className="link" href="/event">{t.about.here()}.</a>
            </article>
        </div>
    </div>
}