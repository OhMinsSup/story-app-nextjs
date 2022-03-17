import React from 'react';

// components
import { Tooltip, UnstyledButton, Text, Group, ThemeIcon } from '@mantine/core';

// hooks
import { useNavLinkStyles } from '@components/ui/Sidebar/styles';

// types
import type { Icon } from 'tabler-icons-react';

interface NavbarLinkProps {
  icon: Icon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useNavLinkStyles();
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon />
      </UnstyledButton>
    </Tooltip>
  );
}

export default NavbarLink;

interface MainLinkForDesktopProps {
  icon: Icon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

NavbarLink.Desktop = function NavbarLinkDesktop({
  icon: Icon,
  label,
  active,
  onClick,
}: MainLinkForDesktopProps) {
  const { classes, cx } = useNavLinkStyles();
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
      onClick={onClick}
      className={cx(classes.link, { [classes.active]: active })}
    >
      <Group>
        <Icon />
        <Text weight={600} size="sm">
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  );
};
