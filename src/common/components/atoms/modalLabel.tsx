import { HTMLAttributes } from "react"


export const ModalLabel = (props: HTMLAttributes<HTMLLabelElement> | any) => {

    return <label tabIndex={0} onKeyPress={e => {
        e.stopPropagation()
        if (e.key == "Enter")
            e.target.click()
    }}
        onClick={e => {
            const target = document.getElementById(props.htmlFor)
            target.focus()
        }}
        {...props}>
    </label>
}