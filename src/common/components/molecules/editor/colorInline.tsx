export const ColorInlineLeaf = (props) => {
    let { children, leaf } = props
    const { text, type = {}, content, ...rest } = leaf

    return <span className="inline-color-wrapper relative">
        <span
            contentEditable={false}
            className="relative top-[-.6rem] inline-block border border-neutral p-px mr-1 w-3 h-3 bg-clip-content select-none"
            style={{ fontSize: 0, backgroundColor: `${content}` }}
        >
            {String.fromCodePoint(160) /* Non-breaking space */}
        </span>
        <span className="">{children}</span>
        {/* <span contentEditable={false} className="inline-block">a</span> */}
    </span>

}

const InlineChromiumBugfix = () => (
    <span
        contentEditable={false}
        style={{ fontSize: 0 }}
    >
        ${String.fromCodePoint(160) /* Non-breaking space */}
    </span>
)
