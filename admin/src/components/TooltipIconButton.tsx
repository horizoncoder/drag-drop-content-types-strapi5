import * as Tooltip from '@radix-ui/react-tooltip';
import { Typography, Box, IconButton } from "@strapi/design-system";

/**
 * @typedef {object} TooltipIconButtonProps
 * @property {React.ReactNode} children - The content of the button.
 * @property {string} [label] - The tooltip label.
 * @property {string} [variant] - The variant of the button.
 * @property {() => void} [onClick] - The onClick handler.
 * @property {boolean} [disabled] - Whether the button is disabled.
 * @property {boolean} [showBorder] - Whether to show the border.
 */

/**
 * Tooltip icon button component.
 * @param {TooltipIconButtonProps} props - The component props.
 * @returns {JSX.Element} - The tooltip icon button component.
 */
const TooltipIconButton = ({ children, label, variant, onClick, disabled, showBorder = false }: {
children: React.ReactNode;
label: string | undefined;
variant?: string;
onClick?: () => void;
disabled?: boolean;
showBorder?: boolean;
}) => {
if (!label)
return (
<IconButton variant={variant} onClick={onClick} disabled={disabled} withTooltip={false}>
{children}
</IconButton>
);

const tooltipContent = (showBorder) ?
<Box padding={4} margin={2} background="neutral0"
hasRadius
shadow="filterShadow">
<Typography>
{label}
</Typography>
<Tooltip.Arrow />
</Box> :
<>
<Typography>
{label}
</Typography>
<Tooltip.Arrow />
</>;

return (
<Tooltip.Provider>
<Tooltip.Root>
<Tooltip.Trigger asChild>
<IconButton variant={variant} onClick={onClick} disabled={disabled} withTooltip={false}>
{children}
</IconButton>
</Tooltip.Trigger>
<Tooltip.Portal>
<Tooltip.Content sideOffset={5}>
{tooltipContent}
</Tooltip.Content>
</Tooltip.Portal>
</Tooltip.Root>
</Tooltip.Provider>
);
}

export default TooltipIconButton;
