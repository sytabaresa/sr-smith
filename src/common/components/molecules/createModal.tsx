import { DialogHTMLAttributes, HTMLAttributes, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@utils/styles";
import { ROOT_APP } from "@/renderer/constants";
import { useTranslation } from "@modules/i18n";

interface ModalContainerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  withClose?: boolean;
  modalName?: string;
  onCancel?: () => void;
  dialogProps?: DialogHTMLAttributes<HTMLDialogElement>
  children: ReactNode | ((props: { modalState: boolean, showModal: (state: boolean) => void }) => ReactNode)
};

const createModal = (modalName: string) => {
  const [modal, setModal] = useState(false)
  const [oldTarget, setOldTarget] = useState(null)
  // console.log(modal)
  const finalModalName = !modalName || modalName == '' ? `modal-${Math.random().toString().slice(-5)}` : modalName
  const modalRef = useRef<HTMLDialogElement>()
  const closeRef = useRef<HTMLButtonElement>()
  // const modal = modalRef.current.open
  const showModal = (state: boolean, target = null) => {
    if (state) {
      modalRef.current.show()
      setTimeout(() => {
        closeRef.current?.focus()
      }, 500)
      setOldTarget(target)
    } else {
      console.log('close')
      modalRef.current.close()
      oldTarget?.focus()
    }
  }

  function onKey(ev) {
    // console.log(ev, modal)

    if (!modal) return

    if (ev.which == 27) {
      showModal(false)
      return
    }

    // if tab or shift-tab pressed
    if (ev.which == 9) {

      // get list of all children elements in given object
      const focusableItems = [...modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
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
          (focusableItems[focusableItems.length - 2] as HTMLElement).focus();
          ev.preventDefault();
        }

      } else {
        //forward tab
        // if focused on the last item and user preses tab, go to the first focusable item
        if (focusedItemIndex >= focusableItems.length - 2) {
          (focusableItems[0] as HTMLElement).focus();
          ev.preventDefault();
        }
      }
      return
    }
  }

  const Modal = useCallback(({
    children,
    withClose = true,
    className,
    dialogProps,
    onCancel,
    ...rest
  }: ModalContainerProps) => {
    const { t } = useTranslation()

    useEffect(() => {

      const OpenEvent = new Event('dialog-open')
      const ObserverM = new MutationObserver(recs => {
        recs.forEach(({ attributeName: attr, target: dial }) => {
          if (attr === 'open' && (dial as HTMLDialogElement).open)
            dial.dispatchEvent(OpenEvent);
        })
      })

      ObserverM.observe(modalRef.current, { attributes: true });

      const onClose = () => { setModal(false) }
      const onOpen = () => { setModal(true) }
      modalRef.current.addEventListener('close', onClose)
      modalRef.current.addEventListener('dialog-open', onOpen)
      return () => {
        modalRef.current?.removeEventListener('cancel', onClose)
        modalRef.current?.removeEventListener('dialog-open', onOpen)
      }
    }, [])

    const out = <>
      <dialog id={finalModalName} ref={modalRef} className={cn("modal",modal ? '': 'hidden')} {...dialogProps} open={modal}>
        <div
          className={cn("modal-box", className)}
          onKeyDown={onKey}
          {...rest}>
          {withClose &&
            <button
              aria-label={t.common.close()}
              onClick={() => showModal(false)}
              ref={closeRef}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
            >
              ✕
            </button>}
          {typeof children == 'function' ? children({ modalState: modal, showModal }) : children}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => showModal(false)}>close</button>
        </form>
      </dialog>
    </>

    if (typeof document == 'undefined') {
      return out
    }

    return createPortal(out, document?.getElementById(ROOT_APP))
  }, [modal])

  return { Modal, showModal, modal }
}

export default createModal;
