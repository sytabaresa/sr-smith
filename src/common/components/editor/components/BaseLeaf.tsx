import { ReactNode } from "react";
import tw from "tailwind-styled-components";

const Component = tw.span`

`

const BaseLeaf: React.FC<{
    className?: string;
    as?: any;
    attributes: Record<string, any>
    children?: ReactNode;
}> = ({ className, as, children, attributes, ...rest }, ...props) => {
    return <Component className={className} $as={as} {...attributes}>
        {children}
    </Component>
}

export default BaseLeaf;