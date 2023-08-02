import { boardAtom, boardConfigAtom } from "@core/atoms/smith";
import { BoardConfigOptions } from "@localtypes/smith";
import { useAtomValue, useSetAtom } from "jotai";


export function useBoardSnapshot() {
    const setBrd = useSetAtom(boardAtom)
    const boardConfig = useAtomValue(boardConfigAtom)

    return {
        getImageUrl: (code: string, options?: Partial<BoardConfigOptions>) => {
            const brd = setBrd({ ...options, screen: [-1.5, 1.7, 1.5, -1.7] })
            // console.log(code)
            // const _code = `point(1,1);`
            try {
                brd.jc.parse(code)
            } catch(err) {
                console
            }
            const txt = brd.renderer.dumpToDataURI();
            return txt
        },
        BoardComponent: () =>
            <div id={boardConfig.name} className="jxgbox hidden" style={{ width: '512px', height: '512px' }}>
                <img src="/images/smith-chart-dark.svg" alt="smith-board-img-dark" srcSet="" className="hidden" loading={'lazy'} />
                <img src="/images/smith-chart.svg" alt="smith-board-img" srcSet="" className="hidden" loading={'lazy'} />
            </div>
    }
}