import { ReactNode } from "react";
import tw from "tailwind-styled-components";

const Component = tw.span`

`

const BaseLeaf: React.FC<{
    className?: string;
    as?: string | Element;
    children?: ReactNode;
}> = ({ className, as, children, ...rest }, ...props) => {
    return <Component className={className} $as={as} {...rest}>
        {children}
    </Component>
}

export default BaseLeaf;