

export type DialogPosition = "top" | "bottom";

export function getDialogPosition(
  containerRect: DOMRect,
  triggerRect: DOMRect,
  minSpaceBelow = 200
): DialogPosition {
  const spaceBelow = containerRect.bottom - triggerRect.bottom;
  const spaceAbove = triggerRect.top - containerRect.top;

  if (spaceBelow < minSpaceBelow && spaceAbove > minSpaceBelow) {
    return "top";
  }
  return "bottom";
}
