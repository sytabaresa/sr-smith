import { useAtomValue } from "jotai"
import { HTMLAttributes, ReactNode, useEffect } from "react";
import { Plate, PlateEditor, usePlateEditorRef } from '@udecode/plate-common';
import { editorServiceAtom, projectDataAtom } from "@core/atoms/smith";
import { cn } from "@utils/styles";
// import { SearcherPopup } from "@components/molecules/editor/searcher";
import { useCutomEditableProps } from './common/useCustomEditableProps';
import { MyValue } from './types';

export interface CodeEditor extends HTMLAttributes<HTMLDivElement> {
    toolbar?: (editor: PlateEditor<MyValue>) => ReactNode
    footer?: (editor: PlateEditor<MyValue>) => ReactNode
    id?: string;
};

const CodeEditor = ({ className, toolbar, footer, id = '', ...rest }: CodeEditor) => {
    const editor = usePlateEditorRef<MyValue>()
    const projectData = useAtomValue(projectDataAtom)
    const editorService = useAtomValue(editorServiceAtom)

    const editableProps = useCutomEditableProps()

    return <>
        <div className={cn('border border-neutral bg-base-100 p-2 flex flex-col relative', className)} {...rest}>
            <div className="absolute top-0 right-0 mt-2 mr-6 flex z-10 opacity-50">
                {toolbar?.(editor)}
            </div>
            {/* <SearcherPopup editor={editor} /> */}
            <div className="overflow-y-auto scrollbar-thin !scrollbar-w-[4px] scrollbar-track-base-100 scrollbar-thumb-base-content flex-1 mb-1 h-full">
                <Plate<MyValue>
                    editableProps={editableProps}
                />
            </div>
            {footer?.(editor)}
        </div >
        <div id="code-end"></div>
    </>
}

export default CodeEditor;
