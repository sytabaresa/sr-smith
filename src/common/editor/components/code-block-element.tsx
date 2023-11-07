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
      className={cn('relative border-base-300 border-t first:border-t-0 flex',
        state.className,
        className)}
      {...props}
    >
      <pre className="rounded-md py-1 font-mono leading-[normal] [tab-size:2] whitespace-pre-wrap break-words flex-1">
        <code>{children}</code>
      </pre>
      {props.element.error && <div data-tip={props.element.errorMsg} className={"w-2 items-stretch bg-error tooltip tooltip-left"}></div>}
    </PlateElement>);
});
CodeBlockElement.displayName = 'CodeBlockElement';

export { CodeBlockElement };
