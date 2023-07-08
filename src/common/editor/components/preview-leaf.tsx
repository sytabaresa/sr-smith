import { PlateLeaf, RenderLeaf } from "@udecode/plate-common";

const PreviewLeaf: RenderLeaf = (props) => {
    const { children, attributes, leaf } = props;

    const { text, type = {}, content, ...rest } = leaf

    // console.log(leaf)
    // const comp = useMemo(() => createPlateUI(), [])
    const classes = Object.keys(type)
    const className = 'token ' + classes.join(' ')
    let C = PlateLeaf

    // console.log(leaf)
    return <C className={className} leaf={leaf} {...props} {...attributes}>{children}</C>
}

export default PreviewLeaf