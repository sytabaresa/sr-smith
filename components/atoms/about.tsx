
import { useTranslation } from "next-export-i18n"

export const About = () => {
    const { t } = useTranslation()

    return <div className="card">
        <div className="card-body">
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
                <img
                    alt="Licencia Creative Commons"
                    style={{ borderWidth: 0, paddingRight: 5 }}
                    src="https://i.creativecommons.org/l/by/4.0/88x31.png"
                />
            </a>
            <span className="pr-1">{t("this work is under")}</span>
            <a rel="license" className="link" href="http://creativecommons.org/licenses/by/4.0/">
                {" "}
                {t("License CC 4_0")}.
            </a>
            <h2 className="font-bold">{t("Authors")}:</h2>
            <span>
                <a
                    className="link-primary link link-hover"
                    href="https://www.linkedin.com/in/sytabaresa"
                >
                    @sytabares
                </a>
                {" - "}
                <a className="link-primary link link-hover" href="https://github.com/kellar1896">
                    @cbarreto
                </a>
            </span>
        </div>
    </div>
}