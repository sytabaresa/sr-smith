import { ROOT_APP } from "@/renderer/constants";
import { useTranslation } from "@modules/i18n";
import { cn } from "@utils/styles";
import { HTMLAttributes, LabelHTMLAttributes, ReactNode, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalContainerProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children'> {
  withClose?: boolean;
  modalChild?: JSX.Element;
  modalName?: string;
  onCancel?: () => void;
  children: ReactNode | ((props: { modalState: boolean, showModal: (state: boolean) => void }) => ReactNode)
};

const createModal = (modalName: string) => {

  const finalModalName = !modalName || modalName == '' ? `modal-${Math.random().toString().slice(-5)}` : modalName
  const [modalOpened, showModal] = useState(false)

  const closeRef = useRef<HTMLLabelElement>()
  const modalRef = useRef<HTMLLabelElement>()

  const labelProps = {
    // tabIndex: 0,
    onKeyPress: e => {
      e.stopPropagation()
      if (e.key == "Enter")
        e.target.click()
    }
  }

  function onKey(ev) {

    if (!modalOpened) return

    // console.log(ev)
    // if escape pressed
    if (ev.which == 27) {
      showModal(false)
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

  const Label = (props: LabelHTMLAttributes<HTMLLabelElement> | any) => {
    const triggerRef = useRef<HTMLLabelElement>()

    return <label
      {...labelProps}
      ref={triggerRef}
      onClick={e => {
        showModal(old => {
          setTimeout(() => old ?
            (triggerRef.current
              .querySelector('button,a,input,textarea,*[tabindex="0"]') as HTMLElement).focus()
            : closeRef.current.focus(), 500)
          return !old
        })
      }}
      {...props}>
    </label>
  }

  const Modal = ({
    modalChild,
    children,
    withClose = true,
    className,
    onCancel,
    ...rest
  }: ModalContainerProps) => {
    const { t } = useTranslation()
    const [focus, setFocus] = useState(false)

    const closeModal = () => {
      onCancel && onCancel()
      showModal(false)
    }

    const out = <>
      <input type="checkbox" id={finalModalName} checked={modalOpened} className="modal-toggle hidden" readOnly />
      <label
        aria-hidden={!modalOpened}
        className={cn('modal cursor-pointer', className)}
        onClick={() => { !focus && closeModal() }}
        {...rest}
      >
        <label
          ref={modalRef}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onKeyDown={onKey}
          aria-hidden={!modalOpened}
          className="modal-box relative"
        >
          {withClose &&
            <label
              {...labelProps}
              ref={closeRef}
              tabIndex={0}
              // onClick={onClose}
              onClick={closeModal}
              className="btn btn-sm btn-ghost absolute right-2 top-2"
              aria-label={t.common.close()}
            >
              ✕
            </label>
          }
          {typeof children == 'function' ? children({ modalState: modalOpened, showModal }) : children}
        </label>
      </label >
    </>

    if (typeof document == 'undefined') {
      return out
    }

    return createPortal(out, document?.getElementById(ROOT_APP))
  };

  return { Modal, Label }
}

export default createModal;
