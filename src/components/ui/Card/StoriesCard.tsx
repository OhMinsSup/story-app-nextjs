import React from 'react';
import take from 'lodash-es/take';

// icons
import { Heart, Bookmark, Share } from 'tabler-icons-react';

// hooks
import { useRouter } from 'next/router';

// constants
import { PAGE_ENDPOINTS } from '@constants/constant';

// utils
import { getUserThumbnail } from '@utils/utils';
import { isEmpty } from '@utils/assertion';
import { createStyles } from '@mantine/core';

// components
import { BlurImage } from '@components/ui/Image';
import { Card, ActionIcon, Group, Text, Avatar, Badge } from '@mantine/core';

// types
import type { StorySchema } from '@api/schema/story-api';

const useStyles = createStyles((theme) => ({
  card: {
    cursor: 'pointer',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    minHeight: '380px',
  },

  title: {
    fontFamily: `${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

interface StoriesCardProps {
  item: StorySchema;
}

const StoriesCard: React.FC<StoriesCardProps> = ({ item }) => {
  const { classes, theme } = useStyles();
  const router = useRouter();

  const tags = take(item.tags, 3);

  const onMoveToNftDetail = () => {
    router.push(PAGE_ENDPOINTS.NFT.ID(item.id));
  };

  return (
    <Card
      withBorder
      p="lg"
      radius="sm"
      className={classes.card}
      onClick={onMoveToNftDetail}
    >
      <Card.Section mb="sm">
        <BlurImage
          layout="responsive"
          src={item.media.contentUrl}
          alt={`${item.name} title`}
          width={200}
          height={200}
          objectFit="cover"
        />
      </Card.Section>
      <Text weight={600} size="sm" className={classes.title} mt="xs">
        {item.name}
      </Text>
      <Text color="gray" size="sm" mt="sm">
        {item.description}
      </Text>

      {isEmpty(tags) ? null : (
        <div className="space-x-2 mt-3">
          {tags.map((tag) => (
            <Badge key={`tags-${tag.id}`} size="sm">
              #{tag.name}
            </Badge>
          ))}
        </div>
      )}

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Group spacing={5}>
            <Avatar
              size={18}
              src={getUserThumbnail(item.user.profile)}
              radius="sm"
            />
            <Text color="gray" size="xs">
              @{item.user.profile.nickname}
            </Text>
          </Group>
          <Group spacing={0}>
            <ActionIcon>
              <Heart size={18} color={theme.colors.red[6]} />
            </ActionIcon>
            <ActionIcon>
              <Bookmark size={18} color={theme.colors.yellow[6]} />
            </ActionIcon>
            <ActionIcon>
              <Share size={16} color={theme.colors.blue[6]} />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default StoriesCard;
