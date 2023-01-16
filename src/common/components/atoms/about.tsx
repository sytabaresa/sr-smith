
import { useTranslation } from "@modules/i18n"

export const About = () => {
    const { t } = useTranslation()

    return <div className="card">
        <div className="card-body">
            <a rel="license" href="https://www.gnu.org/licenses/gpl-3.0.en.html">
                <img
                    alt="Licencia GPLv3"
                    className="w-32"
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
            <h2 className="font-bold">{t.license.authors()}:</h2>
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
        </div>
    </div>
}