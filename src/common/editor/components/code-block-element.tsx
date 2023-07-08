import { forwardRef } from 'react';
import {
  TCodeBlockElement,
  useCodeBlockElementState,
} from '@udecode/plate-code-block';
import { PlateElement, PlateElementProps, Value } from '@udecode/plate-common';

import { cn } from '@utils/styles';

const CodeBlockElement = forwardRef<
  HTMLDivElement,
  PlateElementProps<Value, TCodeBlockElement>
>(({ className, ...props }, ref) => {
  const { children, element } = props;

  const state = useCodeBlockElementState({ element });

  return (
    <PlateElement
      ref={ref}
      className={cn('relative border-base-300 border-t first:border-t-0',
        props.element.error ? 'border-r-error border-r-4' : '',
        state.className,
        className)}
      {...props}
    >
      <pre className="rounded-md py-1 font-mono leading-[normal] [tab-size:2] whitespace-pre-wrap break-words">
        <code>{children}</code>
      </pre>
    </PlateElement>
  );
});
CodeBlockElement.displayName = 'CodeBlockElement';

export { CodeBlockElement };
