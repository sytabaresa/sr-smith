

export const ColorInline = (props) => {
    let { attributes, children, leaf, classes } = props
    const { text, type = {}, content, ...rest } = leaf

    return <span className="inline-color-wrapper">
        <span className="inline-block border border-primary p-px mr-1 w-3 h-3 bg-clip-content"
            style={{ backgroundColor: `${content}` }}></span>{children}</span>

}