import React, { useState } from "react";
import Editor from "../smith/Editor";
import { useLayer, Arrow } from "react-laag";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

const EditorButton: React.FC = () => {
    const [isOpen, setOpen] = useState(true);
    const { t } = useTranslation('common')

    const {
        renderLayer,
        triggerProps,
        layerProps,
        arrowProps
    } = useLayer({
        isOpen,
        // onOutsideClick: close, // close the menu when the user clicks outside
        // onDisappear: close, // close the menu when the menu gets scrolled out of sight
        // overflowContainer: false, // keep the menu positioned inside the container
        auto: true, // automatically find the best placement
        placement: "bottom-start",
        triggerOffset: 9,
        arrowOffset: 4,
    });

    return (
        <>
            <button
                // preset="filled"
                {...triggerProps}
                className={`btn ${isOpen && 'btn-active'}`}
                onClick={() => setOpen(!isOpen)}
            >
                {t('code')}
            </button>
            {renderLayer(
                <>
                    {isOpen && (
                        <motion.div
                            className="w-64 md:w-96 max-w-screen z-10"
                            {...layerProps}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Editor style={{ maxHeight: '80vh' }} />
                            <Arrow
                                {...arrowProps}
                                size={10}
                                roundness={1}
                                borderWidth={1}
                                // borderColor={}
                                style={{ ...arrowProps.style, bottom: '99.5%' }}
                                className="border-primary"
                            />
                        </motion.div>
                    )}
                </>
            )}
        </>
    );
}

export default EditorButton;