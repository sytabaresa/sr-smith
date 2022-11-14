import React from "react";
import { useForm } from "react-hook-form";
import { useLanguageQuery, useTranslation } from "next-export-i18n"
import { useConfig } from "../../hooks/useConfig";

type ConfigsFormProps = {
    modalLabel?: string;
    // onSubmit: (data: any) => void;
};


const ConfigsForm = ({ modalLabel }: ConfigsFormProps) => {
    const { t } = useTranslation()
    const [query] = useLanguageQuery()
    const [config, setConfig] = useConfig()

    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        setError,
        formState: { errors, isSubmitted, isSubmitting },
    } = useForm({ defaultValues: config.smithOptions });

    const onSubmit = async (smithOptions) => {
        // console.log(smithOptions)
        setConfig(op => ({ ...op, smithOptions }))
    }

    return (
        <form className="flex flex-col justify-center form-control md:px-20" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="coordPrecision" className="label">
                <span className="label-text">{t('precision')}</span>
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
                    <span className="label-text-alt">{t(errors.coordPrecision.message)}</span>
                </label>
            )}
            <button className="btn btn-primary mt-10 w-1/2 self-center" type="submit">
                {isSubmitting ? t('loading') : t('Save')}
            </button>
        </form>
    );
};

export default ConfigsForm;
