import { useUser } from "../../providers/userContext"
import gravatar from "gravatar"
import { Avatar } from "../atoms/avatar"
import { HTMLAttributes } from "react"


interface UserImageProps extends HTMLAttributes<HTMLDivElement> {
    imageClasses?: string;
}

export function UserImage(props: UserImageProps) {

    const { user } = useUser()
    // console.log(user)

    let profileUrl = user?.photoURL
    if (!profileUrl) {
        profileUrl = gravatar.url('sdadasdsas@gmail.com', { d: 'identicon' })
    }

    return <div {...props}>
       <Avatar src={profileUrl} text={getInitials(user?.displayName)} className={props.imageClasses}/>
    </div>
}

function getInitials(str) {
    if (!str || str == '') return 'SR'
    const tmp = str.split('')
    return tmp[0][0] + tmp[1][0]
}