


export const About = () => {

    return <div className="card">
        <div className="card-body">
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
                <img
                    alt="Licencia Creative Commons"
                    style={{ borderWidth: 0, paddingRight: 5 }}
                    src="https://i.creativecommons.org/l/by/4.0/88x31.png"
                />
            </a>
            <span className="pr-1">Esta obra está bajo una</span>
            <a rel="license" className="link" href="http://creativecommons.org/licenses/by/4.0/">
                {" "}
                Licencia Creative Commons Atribución 4.0 Internacional.
            </a>
            <h2 className="font-bold">Autores:</h2>
            <span>
                <a
                    className="link-primary link link-hover"
                    href="https://www.linkedin.com/in/sytabaresa"
                >
                    @sytabares
                </a>{" "}
                -
                <a className="link-primary link link-hover" href="https://github.com/kellar1896">
                    @cbarreto
                </a>
            </span>
        </div>
    </div>
}