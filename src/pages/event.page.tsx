// import Component1 from "components/Component1";

import { useEffect, useState } from "react";

interface EventProps {
    style?: Object;
}

export { Event as Page }

const Event = (props: EventProps) => {
    const nextDate = new Date(2022, 10, 21, 11, 0, 0, 0)
    // const nextDate = new Date(2022, 10, 18, 17, 0, 0, 0)

    const [diff, setDiff] = useState(getDiff(nextDate))
    useEffect(() => {
        let inter = setInterval(() => setDiff(getDiff(nextDate)), 1000)
        return () => {
            clearTimeout(inter)
        }
    }, [])

    return (
        <div
            className="relative w-full min-h-screen overflow-hidden overflox-x-hidden flex flex-col items-center"
        // style={props.style}
        >
            <div className="absolute -z-10 left-0 h-full w-full bg-[rgba(18,18,18,1)]">
                <img className="relative opacity-30 w-[200vw] left-1/2 -translate-x-1/2 max-w-none lg:w-full top-[130px]" src="/images/smith-chart-dark.svg" alt="smith-chart-background" />
            </div>
            <div className="relative flex flex-col self-start md:ml-32">
                <div className="text-white text-left font-bold font-['Inter'] pt-6 xl:py-8 pl-6">
                    <p
                        className="leading-none text-5xl lg:text-[5rem] xl:text-[6rem]"
                    >
                        Sustentación
                        <br />
                        Trabajo de Grado
                    </p>
                </div>
                <div className="text-white text-left font-['Source_Code_Pro'] ml-20 max-w-[50rem] align-top">
                    <p
                        className="leading-tight inline-block font-normal tracking-tighter m-0 text-xl lg:text-3xl xl:text-4xl"
                    >
                        {"Implementación "}
                        <span
                            className="font-bold tracking-tighter inline m-0 leading-tight"
                        >
                            Open Source
                        </span>
                        {" para simulación en la carta de Smith de uso académico."}
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap px-4 w-full lg:w-2/3 lg:ml-40">
                <div className="text-white text-left font-['Inter'] w-full lg:w-1/2 mt-4 text-xl lg:text-3xl xl:text-4xl">
                    <div className="leading-none inline-block">
                        <p className="font-medium leading-none">
                            Por:
                            <br />
                        </p>
                        <p className="font-extralight leading-tight">
                            Sebastián Tabares
                            <br />
                            Cristian Barreto
                        </p>
                        <p className="font-medium leading-none">
                            Director: <span className="font-extralight">Elvis Eduardo Gaona PhD</span>
                        </p>
                    </div>
                </div>
                <div className="text-white text-right font-['Inter'] w-full lg:w-1/2 mt-4 text-xl lg:text-2xl xl:text-3xl">
                    <p className="font-medium inline m-0">
                        {"Fecha: "}
                    </p>
                    <p className="font-bold inline m-0">
                        21
                    </p>
                    <p className="font-medium inline m-0">
                        {" de Nov - "}
                    </p>
                    <p className="font-bold inline m-0">
                        11:00
                        <br />
                        {"salón 402 | sala IEEE UD"}
                    </p>
                    <p className="font-bold inline m-0">
                        11:00
                        <br />
                        {"Universidad Distrital - sede ingeniería (Cr 8 # 40 - 78)"}
                    </p>
                </div>
            </div>
            <div className="flex flex-grow flex-wrap mt-4 items-center w-full md:w-2/3  justify-center">
                <div className="flex items-center justify-center md:flex-grow my-2 lg:my-6 gap-5 text-center auto-cols-max text-white">
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-4xl lg:text-7xl xl:text-8xl">
                            <span style={{ "--value": diff.days } as any}></span>
                        </span>
                        days
                    </div>
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-4xl lg:text-7xl xl:text-8xl">
                            <span style={{ "--value": diff.hours } as any}></span>
                        </span>
                        hours
                    </div>
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-4xl lg:text-7xl xl:text-8xl">
                            <span style={{ "--value": diff.minutes } as any}></span>
                        </span>
                        min
                    </div>
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-4xl lg:text-7xl xl:text-8xl">
                            <span style={{ "--value": diff.seconds } as any}></span>
                        </span>
                        sec
                    </div>
                </div>
                <button
                    className="btn btn-outline btn-lg border-white text-white rounded-full hover:bg-white hover:text-[rgba(18,18,18,1)]"
                >
                    <a target="_blank" href="https://www.youtube.com/watch?v=nWUvzj8HGC4">
                        Transmisión en vivo
                    </a>
                </button>
            </div>
            <div className="flex flex-wrap items-start justify-start lg:justify-center text-white font-bold font-['Inter'] w-full gap-[60px] mb-4 px-4">
                <div className="flex flex-col flex-wrap">
                    <p className="my-4 text-xl">
                        Organizan:
                    </p>
                    <div className="flex items-end gap-[60px] flex-wrap">
                        <img className="h-28" src="https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/ae7b4742cd84c3adfc63e5446bab9dd898d3a8ef.webp" alt="gitud" />
                    </div>
                </div>
                <div className="flex flex-col flex-wrap">
                    <p className="my-4 text-xl">
                        Apoyan:
                    </p>
                    <div className="flex items-end gap-[60px] flex-wrap">
                        <img className="h-28 m-auto" src="https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/d0c63684018771995c52ac5c13efa5a0bda8d446:0.webp" alt="gitud" />
                        <img className="h-28 m-auto" src="https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/a4891cb95f32da6c52056490dc775497e417b8a0.webp" alt="gitud" />
                        <img className="h-28 m-auto" src="https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/3be9486b4b8febcce719d4610b4e54cff5806496:0.webp" alt="gitud" />
                        <img className="h-28 m-auto" src="https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/c260dad9fdad9bf1fc733c8ba4443fc9259662a8.webp" alt="gitud" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function getDiff(day: Date) {
    const now = new Date()
    let diff = Math.round((day.getTime() - now.getTime()) / 1000)
    if (diff < 0) return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        done: true,
    }
    let days = Math.floor(diff / (24 * 60 * 60));
    diff = diff - (days * 24 * 60 * 60);
    let hours = Math.floor(diff / (60 * 60));
    diff = diff - (hours * 60 * 60);
    let minutes = Math.floor(diff / (60));
    diff = diff - (minutes * 60);
    let seconds = diff;

    return {
        days,
        hours,
        minutes,
        seconds,
        done: false,
    }
}

