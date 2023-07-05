import { TEditableProps } from '@udecode/plate-core';
import { MyValue } from '../types';
import { useTranslation } from '@modules/i18n';
import PreviewLeaf from '../components/PreviewLeaf';

export const useCutomEditableProps: () => TEditableProps<MyValue> = () => {
  const { t } = useTranslation()

  return {
    disableDefaultStyles: true,
    className: 'outline-none whitespace-pre-wrap break-words min-h-full font-mono',
    spellcheck: false,
    // spellcheck: "false",
    autoFocus: false,
    autoCorrect: "false",
    autocorrect: false,
    autoComplete: "false",
    autocapitalize: false,
    autoCapitalize: "false",
    placeholder: t.canvas.placeholder(),
    'aria-label': t.common.code(),
    renderLeaf: PreviewLeaf as any,
  }
}