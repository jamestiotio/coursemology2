import { FC, memo } from 'react';
import { defineMessages } from 'react-intl';
import { Link } from 'react-router-dom';
import { Icon, Typography } from '@mui/material';
import equal from 'fast-deep-equal';
import { TableColumns, TableOptions } from 'types/components/DataTable';
import { ForumEntity, ForumTopicEntity } from 'types/course/forums';

import DataTable from 'lib/components/core/layouts/DataTable';
import Note from 'lib/components/core/Note';
import useTranslation from 'lib/hooks/useTranslation';
import { formatLongDateTime } from 'lib/moment';

import ForumTopicManagementButtons from '../buttons/ForumTopicManagementButtons';
import SubscribeButton from '../buttons/SubscribeButton';

interface Props {
  forum?: ForumEntity;
  forumTopics: ForumTopicEntity[];
}

const translations = defineMessages({
  noTopic: {
    id: 'course.forum.ForumTopicTable.noTopic',
    defaultMessage: 'No Topic',
  },
  hidden: {
    id: 'course.forum.ForumTopicTable.hidden',
    defaultMessage: 'This topic is hidden for students.',
  },
  locked: {
    id: 'course.forum.ForumTopicTable.locked',
    defaultMessage: 'This topic is closed; it no longer accepts new replies.',
  },
  question: {
    id: 'course.forum.ForumTopicTable.question',
    defaultMessage: 'Question',
  },
  resolved: {
    id: 'course.forum.ForumTopicTable.resolved',
    defaultMessage: 'Question (Resolved)',
  },
  unresolved: {
    id: 'course.forum.ForumTopicTable.unresolved',
    defaultMessage: 'Question (Unresolved)',
  },
  sticky: {
    id: 'course.forum.ForumTopicTable.sticky',
    defaultMessage: 'Sticky',
  },
  announcement: {
    id: 'course.forum.ForumTopicTable.announcement',
    defaultMessage: 'Announcement',
  },
  topics: {
    id: 'course.forum.ForumTopicTable.topics',
    defaultMessage: 'Topics',
  },
  votes: {
    id: 'course.forum.ForumTopicTable.votes',
    defaultMessage: 'Votes',
  },
  posts: {
    id: 'course.forum.ForumTopicTable.posts',
    defaultMessage: 'Posts',
  },
  views: {
    id: 'course.forum.ForumTopicTable.views',
    defaultMessage: 'Views',
  },
  lastPostedBy: {
    id: 'course.forum.ForumTopicTable.lastPostedBy',
    defaultMessage: 'Last Posted By',
  },
  startedBy: {
    id: 'course.forum.ForumTopicTable.startedBy',
    defaultMessage: 'Started By',
  },
  isSubscribed: {
    id: 'course.forum.ForumTopicTable.isSubscribed',
    defaultMessage: 'Subscribed?',
  },
});

const TopicTypeIcon: FC<{ topic: ForumTopicEntity }> = (props) => {
  const { topic } = props;
  const { t } = useTranslation();
  let className = '';
  let tooltip = '';
  switch (topic.topicType) {
    case 'question':
      if (topic.isResolved) {
        className =
          'fa fa-check-circle text-3xl overflow-visible  text-green-700 top-0';
        tooltip = t(translations.resolved);
      } else {
        className =
          'fa fa-question-circle overflow-visible  text-3xl text-yellow-700';
        tooltip = t(translations.unresolved);
      }
      break;
    case 'sticky':
      className = 'fa fa-thumb-tack overflow-visible  text-3xl';
      tooltip = t(translations.sticky);
      break;
    case 'announcement':
      className = 'fa fa-bullhorn overflow-visible  text-3xl';
      tooltip = t(translations.announcement);
      break;
    default:
      return null;
  }
  return <Icon className={className} title={tooltip} />;
};

const ForumTopicTable: FC<Props> = (props) => {
  const { forum, forumTopics } = props;
  const { t } = useTranslation();

  if (!forum || forumTopics.length === 0) {
    return <Note message={t(translations.noTopic)} />;
  }

  const options: TableOptions = {
    download: false,
    filter: false,
    pagination: false,
    print: false,
    search: false,
    selectableRows: 'none',
    viewColumns: false,
    rowHover: false,
    setRowProps: (_row, dataIndex, _rowIndex) => {
      const topic = forumTopics[dataIndex];
      return {
        className: `topic_${topic.id} relative hover:bg-neutral-100`,
      };
    },
    sortOrder: {
      name: 'latestPost',
      direction: 'desc',
    },
  };

  const columns: TableColumns[] = [
    {
      name: 'title',
      label: t(translations.topics),
      options: {
        filter: false,
        sort: true,
        alignCenter: false,
        customBodyRenderLite: (dataIndex): JSX.Element => {
          const topic = forumTopics[dataIndex];
          return (
            <>
              <div>
                <Link key={topic.id} to={topic.topicUrl}>
                  <Typography
                    className={
                      topic.isUnread
                        ? 'space-x-2 font-bold text-black'
                        : 'space-x-2 text-gray-600'
                    }
                    variant="h6"
                  >
                    {topic.isHidden && (
                      <Icon
                        className="fa fa-eye-slash overflow-visible text-3xl"
                        title={t(translations.hidden)}
                      />
                    )}
                    {topic.isLocked && (
                      <Icon
                        className="fa fa-lock overflow-visible text-3xl"
                        title={t(translations.locked)}
                      />
                    )}
                    <TopicTypeIcon topic={topic} />
                    {topic.title}
                  </Typography>
                </Link>
              </div>
              <div>
                {t(translations.startedBy)}{' '}
                <a href={topic.creator.userUrl}>{topic.creator.name}</a>
              </div>
            </>
          );
        },
      },
    },
    {
      name: 'latestPost',
      label: t(translations.lastPostedBy),
      options: {
        filter: false,
        sort: true,
        setCellHeaderProps: () => ({
          className: '!hidden sm:!table-cell whitespace-nowrap',
        }),
        setCellProps: () => ({
          className: '!hidden sm:!table-cell',
        }),
        sortCompare: (order: string) => {
          return (value1, value2) => {
            const latestPost1 = value1.data as ForumTopicEntity['latestPost'];
            const latestPost2 = value2.data as ForumTopicEntity['latestPost'];
            const date1 = new Date(latestPost1.createdAt);
            const date2 = new Date(latestPost2.createdAt);
            return (
              (date1.getTime() - date2.getTime()) * (order === 'asc' ? 1 : -1)
            );
          };
        },
        customBodyRenderLite: (dataIndex): JSX.Element | null => {
          const latestPost = forumTopics[dataIndex].latestPost;
          if (!latestPost) return null;
          return (
            <>
              <a href={latestPost.creator.userUrl}>{latestPost.creator.name}</a>
              <div className="whitespace-nowrap">
                {formatLongDateTime(latestPost.createdAt)}
              </div>
            </>
          );
        },
      },
    },
    {
      name: 'voteCount',
      label: t(translations.votes),
      options: {
        filter: false,
        sort: true,
        hideInSmallScreen: true,
      },
    },
    {
      name: 'postCount',
      label: t(translations.posts),
      options: {
        filter: false,
        sort: true,
        hideInSmallScreen: true,
      },
    },
    {
      name: 'viewCount',
      label: t(translations.views),
      options: {
        filter: false,
        sort: true,
        hideInSmallScreen: true,
      },
    },
    {
      name: 'subscribed',
      label: t(translations.isSubscribed),
      options: {
        filter: false,
        sort: false,
        alignCenter: true,
        customBodyRenderLite: (dataIndex): JSX.Element => {
          const forumTopic = forumTopics[dataIndex];
          return (
            <SubscribeButton
              emailSubscription={forumTopic.emailSubscription}
              entityId={forumTopic.id}
              entityTitle={forumTopic.title}
              entityType="topic"
              entityUrl={forumTopic.topicUrl}
              type="checkbox"
            />
          );
        },
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: false,
        sort: false,
        alignCenter: true,
        customBodyRenderLite: (dataIndex): JSX.Element => {
          const topic = forumTopics[dataIndex];
          return (
            <ForumTopicManagementButtons
              showOnHover={
                topic.permissions.canSetHiddenTopic ||
                topic.permissions.canSetLockedTopic
              }
              topic={topic}
            />
          );
        },
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={forumTopics}
      options={options}
      withMargin
    />
  );
};

export default memo(ForumTopicTable, (prevProps, nextProps) => {
  return equal(prevProps, nextProps);
});
