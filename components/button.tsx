import { ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonPresetsTypes = 'default' | 'outline' | 'filled'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    preset?: ButtonPresetsTypes;
};

const defaultStyle = 'mt-1 px-2 py-1 rounded-md'
export const ButtonPresetStyles: { [key: string]: any } = {
    default: `${defaultStyle} hover:bg-principal-300 active:bg-principal active:text-contrast`,
    outline: `${defaultStyle} border border-principal hover:bg-principal-300 active:bg-principal active:text-contrast active:border-contrast`,
    filled: `${defaultStyle} bg-principal text-contrast hover:bg-principal-600 active:bg-principal-400`
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
    const { preset = 'default', className } = props
    const styleClasses = ButtonPresetStyles[preset]

    return (
        <button
            {...props}
            ref={ref}
            className={styleClasses + ' ' + className}
        >
        </button>
    );
})

export default Button;