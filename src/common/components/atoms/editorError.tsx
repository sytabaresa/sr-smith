import { editorServiceAtom } from "@core/atoms/smith"
import { cn } from "@utils/styles"
import { useAtomValue } from "jotai"

const ErrorMsg = () => {
    const current = useAtomValue(editorServiceAtom)
    const { errorMsg } = current.context

    return <div className={cn('alert bg-accent text-black transition-opacity duration-200 relative',
        current.name == 'error' ? "opacity-100" : "opacity-0 py-0")}>
        <div className="absolute flex bottom-0 right-0 h-4 -skew-x-12 mr-4 gap-0">
            <div className="bg-black h-full w-4 ml-4"></div>
            <div className="bg-black h-full w-4 ml-4"></div>
            <div className="bg-black h-full w-4 ml-4"></div>
            <div className="bg-black h-full w-4 ml-4"></div>
            <div className="bg-black h-full w-4 ml-4"></div>
        </div>
        <p className="text-sm md:text-md !mt-0">
            {errorMsg.toString()}
        </p>
    </div>
}

export default ErrorMsg