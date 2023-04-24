import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "@modules/i18n"
import { boardDataAtom } from "@fsm/atoms";
import { useAtom } from "jotai";

type ConfigsFormProps = {
    modalLabel?: string;
    // onSubmit: (data: any) => void;
};


const ConfigsForm = ({ modalLabel }: ConfigsFormProps) => {
    const { t } = useTranslation()
    const [config, setConfig] = useAtom(boardDataAtom)

    const {
        register,
        handleSubmit,
        reset,
        // clearErrors,
        // setError,
        formState: { errors, isSubmitted, isSubmitting },
    } = useForm<any>({ defaultValues: config });

    useEffect(() => {
        reset(config)
    }, [config])

    const onSubmit = async (smithOptions) => {
        // console.log(smithOptions)
        setConfig({ ...config, ...smithOptions })
    }

    return (
        <form className="flex flex-col justify-center form-control md:px-20" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="coordPrecision" className="label">
                <span className="label-text uppercase font-bold">{t.settings.precision()}</span>
            </label>
            <input
                id="coordPrecision"
                name="coordPrecision"
                type="number"
                className="input input-bordered"
                {...register("coordPrecision", { required: true })}
            />
            {errors.coordPrecision && (
                <label className="label">
                    <span className="label-text-alt uppercase">{errors.coordPrecision.message as unknown as string}</span>
                </label>
            )}
            <button className="btn btn-primary mt-10 w-1/2 self-center" type="submit">
                {isSubmitting ? t.common.loading() : t.common.save()}
            </button>
        </form>
    );
};

export default ConfigsForm;
