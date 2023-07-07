import { TEditableProps } from '@udecode/plate-core';
import { MyValue } from '../types';
import { useTranslation } from '@modules/i18n';
import PreviewLeaf from '../components/preview-leaf';

export const useCutomEditableProps: () => TEditableProps<MyValue> = () => {
  const { t } = useTranslation()

  return {
    disableDefaultStyles: true,
    className: 'outline-none min-h-full',
    spellCheck: false,
    autoFocus: false,
    autoCorrect: "false",
    autoComplete: "false",
    autoCapitalize: "false",
    placeholder: t.canvas.placeholder(),
    'aria-label': t.common.code(),
    renderLeaf: PreviewLeaf as any,
  }
}