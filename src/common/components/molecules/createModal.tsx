import { useTranslation } from "@modules/i18n";
import { HTMLAttributes, LabelHTMLAttributes, ReactNode, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalContainerProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children'> {
  withClose?: boolean;
  modalChild?: JSX.Element;
  modalName?: string;
  children: ReactNode | ((props: { modalState: boolean, showModal: (state: boolean) => void }) => ReactNode)
};

const createModal = (modalName: string) => {

  const finalModalName = !modalName || modalName == '' ? `modal-${Math.random().toString().slice(-5)}` : modalName

  const closeRef = useRef<HTMLLabelElement>()
  const triggerRef = useRef<HTMLLabelElement>()
  const modalRef = useRef<HTMLLabelElement>()
  const modalStateRef = useRef<HTMLInputElement>()

  const labelProps = {
    tabIndex: 0,
    onKeyPress: e => {
      e.stopPropagation()
      if (e.key == "Enter")
        e.target.click()
    }
  }

  function onKey(ev) {
    // console.log(ev)
    // if escape pressed
    if (ev.which == 27) {
      closeRef.current.click()
      return
    }

    // if tab or shift-tab pressed
    if (ev.which == 9) {

      // get list of all children elements in given object
      const focusableItems = [...modalRef.current.querySelectorAll('*')]
      // console.log(focusableItems)

      // get currently focused item
      const focusedItem = document.activeElement

      // get the index of the currently focused item
      const focusedItemIndex = focusableItems.indexOf(focusedItem);
      // console.log(focusedItemIndex)

      if (ev.shiftKey) {
        //back tab
        // if focused on first item and user preses back-tab, go to the last focusable item
        if (focusedItemIndex == 0) {
          (focusableItems[focusableItems.length - 1] as HTMLElement).focus();
          ev.preventDefault();
        }

      } else {
        //forward tab
        // if focused on the last item and user preses tab, go to the first focusable item
        if (focusedItemIndex >= focusableItems.length - 1) {
          (focusableItems[0] as HTMLElement).focus();
          ev.preventDefault();
        }
      }
      return
    }
  }

  function onClose(ev) {
    triggerRef.current?.focus()
  }

  const Label = (props: LabelHTMLAttributes<HTMLLabelElement> | any) => {

    return <label
      {...labelProps}
      ref={triggerRef}
      htmlFor={finalModalName}
      onClick={e => {
        setTimeout(() => closeRef.current.focus(), 500)
      }}
      {...props}>
    </label>
  }

  const modalState = modalStateRef.current?.checked
  // const showModal = (state: boolean) => {
  //   if (modalStateRef.current) {
  //     console.log(modalStateRef, state)
  //     modalStateRef.current.value = !!state
  //   }
  // }

  const Modal = ({
    modalChild,
    children,
    withClose = true,
    className,
    ...rest
  }: ModalContainerProps) => {
    const { t } = useTranslation()
    const [_defModal, showModal] = useState(false)

    const out = <>
      <input type="checkbox" id={finalModalName} ref={modalStateRef} defaultChecked={_defModal} className="modal-toggle hidden" />
      <label htmlFor={finalModalName} className={`modal cursor-pointer ${className}`} {...rest}>
        <label htmlFor="" ref={modalRef} tabIndex={0} onKeyDown={onKey} className="modal-box relative">
          {withClose &&
            <label
              {...labelProps}
              ref={closeRef}
              htmlFor={finalModalName}
              onClick={onClose}
              className="btn btn-sm btn-ghost absolute right-2 top-2"
              aria-label={t.common.close()}
            >
              ✕
            </label>
          }
          {typeof children == 'function' ? children({ modalState, showModal }) : children}
        </label>
      </label >
    </>

    if (typeof document == 'undefined') {
      return out
    }

    return createPortal(out, document?.body)
  };

  return { Modal, Label }
}

export default createModal;
