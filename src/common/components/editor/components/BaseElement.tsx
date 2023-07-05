import { ReactNode } from "react";
import tw from "tailwind-styled-components";

const Component = tw.span`

`

const BaseElement: React.FC<{
    className?: string;
    as?: string | Element;
    children?: ReactNode;
}> = ({ className, as, children }, leaf, ...props) => {
    // console.log('props')
    return <Component className={className} $as={as} {...props}>
        {children}
    </Component>
}

export default BaseElement;