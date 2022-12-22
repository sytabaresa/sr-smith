
import { useTranslation } from "@hooks/i18n"

export const About = () => {
    const { t } = useTranslation()

    return <div className="card">
        <div className="card-body">
            <a rel="license" href="https://www.gnu.org/licenses/gpl-3.0.en.html">
                <img
                    alt="Licencia GPLv3"
                    className="w-32"
                    style={{ borderWidth: 0, paddingRight: 5 }}
                    src={new URL('/images/gplv3.png', import.meta.url) as unknown as string}
                />
            </a>
            <span className="pr-1">{t("this work is under")}</span>
            <a rel="license" className="link" href="https://www.gnu.org/licenses/gpl-3.0.en.html">
                {" "}
                {t("License GPLv3")}.
            </a>
            <h2 className="font-bold">{t("Authors")}:</h2>
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