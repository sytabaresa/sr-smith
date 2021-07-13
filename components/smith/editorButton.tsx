import React, { useState } from "react";
import Editor from "./Editor";
import { useLayer, Arrow } from "react-laag";
import Button from "../button";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

const EditorButton: React.FC = () => {
    const [isOpen, setOpen] = useState(true);
    const { t } = useTranslation('common')

    function close() {
        setOpen(false);
    }

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
        // placement: "top-end", // we prefer to place the menu "top-end"
        // arrowOffset: 16 // let the arrow have some room to breath also
        placement: "bottom-start",
        triggerOffset: 9,
        arrowOffset: 4,
    });

    return (
        <>
            <Button
                preset="filled"
                {...triggerProps}
                className="px-4 py-2"
                onClick={() => setOpen(!isOpen)}
            >
                {t('code')}
            </Button>
            {renderLayer(
                <>
                    {isOpen && (
                        <motion.div
                            className="w-96"
                            {...layerProps}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Editor style={{ maxHeight: '90vh' }} />
                            <Arrow
                                {...arrowProps}
                                size={10}
                                roundness={1}
                                // className="border-principal"
                                borderWidth={1}
                                style={{ ...arrowProps.style, bottom: '99.5%' }}
                            />
                        </motion.div>
                    )}
                </>
            )}
        </>
    );
}

export default EditorButton;