import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "@modules/i18n"
import { boardConfigAtom } from "@core/atoms/smith";
import { useAtom } from "jotai";
import { BoardConfigOptions } from "@localtypes/smith";

type ConfigsFormProps = {
    modalLabel?: string;
    // onSubmit: (data: any) => void;
};


const ConfigsForm = ({ modalLabel }: ConfigsFormProps) => {
    const { t } = useTranslation()
    const [config, setConfig] = useAtom(boardConfigAtom)

    // console.log(config)
    const {
        register,
        handleSubmit,
        reset,
        // clearErrors,
        // setError,
        formState: { errors, isSubmitted, isSubmitting },
    } = useForm<BoardConfigOptions>({ defaultValues: config });

    useEffect(() => {
        reset(config)
    }, [config])

    const onSubmit = async (smithOptions) => {
        // console.log(smithOptions)
        setConfig({ ...config, ...smithOptions })
    }

    return (
        <form className="flex flex-col justify-center form-control md:px-20" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="digits" className="label">
                <span className="label-text uppercase font-bold">{t.settings.precision()}</span>
            </label>
            <input
                type="number"
                className="input input-bordered"
                {...register("digits", { required: true })}
            />
            {errors.digits && (
                <label className="label">
                    <span className="label-text-alt uppercase">{errors.digits.message as unknown as string}</span>
                </label>
            )}
            <button className="btn btn-primary mt-10 w-1/2 self-center" type="submit">
                {isSubmitting ? t.common.loading() : t.common.save()}
            </button>
        </form>
    );
};

export default ConfigsForm;
