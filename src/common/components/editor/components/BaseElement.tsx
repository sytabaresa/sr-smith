import { ReactNode } from "react";
import tw from "tailwind-styled-components";

const Component = tw.span`

`

const BaseElement: React.FC<{
    className?: string;
    as?: any;
    attributes: Record<string, any>
    children?: ReactNode;
}> = (props) => {
    // console.log(props)
    const { className, as, attributes, children, ...rest } = props
    // console.log(props)
    return <Component className={className} $as={as} {...attributes}>
        {children}
    </Component>
}

export default BaseElement;