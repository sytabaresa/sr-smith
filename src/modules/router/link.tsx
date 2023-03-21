import { qStr } from "@utils/common"
import { useRouter } from '@modules/router';
import { HTMLAttributes } from "react";

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string
    query: Record<string, string>
}

export function Link(props: LinkProps) {
    const { href, children, query = {} } = props

    const { useHistory } = useRouter()
    // const [q] = useLanguageQuery()
    const { push } = useHistory()
    // console.log(href, query)

    return <a href={href + qStr(query)} onClick={() => push(href, query)}>
        {children}
    </a>
}