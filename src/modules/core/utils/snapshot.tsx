import { boardAtom, boardConfigAtom } from "@core/atoms/smith";
import { BoardConfigOptions } from "@localtypes/smith";
import { useAtomValue, useSetAtom } from "jotai";
import { createResource, Resource } from "./resource"
import { wait } from "@utils/time";

const cache = new Map<string, any>();

export function loadImg(source: string) {
    return new Promise((resolve, reject) => {
        // then create a new image element
        const img = new window.Image();
        // set the src to our source
        img.src = source;
        // and start listening for the load event to resolve the promise
        img.addEventListener("load", () => resolve(source));
        // and also the error event to reject the promise
        img.addEventListener("error", () =>
            reject(new Error(`Failed to load image ${source}`))
        );
    })
}

export function useBoardSnapshot() {
    const setBrd = useSetAtom(boardAtom)
    const boardConfig = useAtomValue(boardConfigAtom)

    return {
        getImageUrl(code: string, options?: Partial<BoardConfigOptions>): Resource<string> {
            const key = `${code}_${options?.theme}`

            // here we start getting the resource from the cache
            let resource = cache.get(key);
            // and if it's there we return it immediately
            if (resource) return resource;

            resource = createResource<string>(async () => { throw 'loading' })

            return resource;
        },
        _getImageUrl(code: string, options?: Partial<BoardConfigOptions>): Resource<string> {
            const key = `${code}_${options.theme}`

            // here we start getting the resource from the cache
            let resource = cache.get(key);
            // and if it's there we return it immediately
            if (resource) return resource;
            // but if it's not we create a new resource
            resource = createResource<string>(
                // in our async function we create a promise
                async () => {
                    // console.log(code)
                    // const _code = `point(1,1);`
                    try {
                        const brd = setBrd({
                            ...options,
                            screen: [-1.5, 1.7, 1.5, -1.7],
                            axis: false,
                            renderer: 'canvas' // for PNG 
                        })
                        while (true) {
                            if ((brd.elementsByName['smith-chart-image'] as any).imgIsLoaded) break
                            await wait(20)
                        }
                        // await wait(500)
                        // console.log(brd)
                        brd.jc.parse(code)
                        // const txt = brd.renderer.dumpToDataURI();
                        const txt = (brd.renderer as any).canvasRoot.toDataURL();
                        return txt
                    } catch (err) {
                        console.log('snapshot error', err)
                        return cache.get(`_${options.theme}`).read()
                        // throw err
                    }
                }
            );
            // before finishing we save the new resource in the cache
            cache.set(key, resource);
            // and return return it
            return resource;
        },
        BoardComponent: () =>
            <div id={boardConfig.name} className="jxgbox hidden" style={{ width: '512px', height: '512px' }}>
            </div>
    }
}