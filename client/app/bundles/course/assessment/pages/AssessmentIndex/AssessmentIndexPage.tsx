import { useMemo } from 'react';
import {
  AssessmentListData,
  AssessmentsListData,
} from 'types/course/assessment/assessments';

import Link from 'lib/components/core/Link';
import Table, { ColumnTemplate } from 'lib/components/core/table';
import PersonalStartEndTime from 'lib/components/extensions/PersonalStartEndTime';
import useTranslation from 'lib/hooks/useTranslation';

import Actions from './Actions';
import StackedBadges from './StackedBadges';
import StatusBadges from './StatusBadges';
import translations from './translations';

interface AssessmentIndexProps {
  assessments: AssessmentsListData;
  top: string;
}

const AssessmentIndexPage = (props: AssessmentIndexProps): JSX.Element => {
  const { display, assessments } = props.assessments;
  const { t } = useTranslation();

  const template: ColumnTemplate<AssessmentListData>[] = useMemo(
    () => [
      {
        header: t(translations.title),
        content: (assessment) => (
          <div className="flex flex-col items-start justify-between xl:flex-row xl:items-center">
            <label className="m-0 font-normal" title={assessment.title}>
              <Link
                className="line-clamp-1"
                href={assessment.url}
                opensInNewTab
                underlinesOnHover
              >
                {assessment.title}
              </Link>
            </label>

            {!display.student && <StatusBadges for={assessment} />}
          </div>
        ),
      },
      {
        header: t(translations.exp),
        content: (assessment) => assessment.baseExp ?? '-',
        align: 'right',
        hideColumnWhen: !display.gamified,
        className: 'max-md:!hidden',
      },
      {
        header: t(translations.bonusExp),
        content: (assessment) => assessment.timeBonusExp ?? '-',
        align: 'right',
        hideColumnWhen: !display.bonusAttributes,
        className: 'max-lg:!hidden',
      },
      {
        header: t(translations.neededFor),
        content: (assessment) => (
          <StackedBadges
            badges={assessment.topDependants}
            remainingCount={assessment.remainingDependantsCount}
          />
        ),
        hideColumnWhen: !display.achievements,
        className: 'max-xl:!hidden whitespace-nowrap',
      },
      {
        header: t(translations.startsAt),
        content: (assessment) => (
          <PersonalStartEndTime
            className={assessment.isStartTimeBegin ? 'text-neutral-400' : ''}
            timeInfo={assessment.startAt}
          />
        ),
        className: 'max-lg:!hidden whitespace-nowrap',
      },
      {
        header: t(translations.bonusEndsAt),
        content: (assessment) => (
          <PersonalStartEndTime
            className={assessment.isBonusEnded ? 'text-neutral-400' : ''}
            timeInfo={assessment.bonusEndAt}
          />
        ),
        hideColumnWhen: !display.bonusAttributes,
        className: 'max-lg:!hidden whitespace-nowrap',
      },
      {
        header: t(translations.endsAt),
        content: (assessment) => (
          <PersonalStartEndTime
            className={
              display.student &&
              assessment.status !== 'submitted' &&
              assessment.isEndTimePassed
                ? 'text-red-500'
                : ''
            }
            timeInfo={assessment.endAt}
          />
        ),
        hideColumnWhen: !display.endTimes,
        className: 'whitespace-nowrap no-hover:max-sm:!hidden',
      },
      {
        content: (assessment) => ({
          render: <Actions for={assessment} student={display.student} />,
          className: 'relative',
        }),
      },
    ],
    [display],
  );

  return (
    <Table
      className="-mx-6 w-screen sm:m-0 sm:mt-8 sm:w-full"
      data={assessments}
      headerClassName={`bg-neutral-50 z-10 ${props.top}`}
      rowClassName={(assessment): string =>
        `group w-full bg-slot-1 hover?:bg-slot-2 slot-1-white slot-2-neutral-100 ${
          !assessment.isStartTimeBegin ||
          !assessment.conditionSatisfied ||
          assessment.status === 'unavailable'
            ? '!slot-1-neutral-100'
            : ''
        } ${
          assessment.status === 'submitted'
            ? '!slot-1-lime-50 !slot-2-lime-100'
            : ''
        }`
      }
      rowKey={(assessment): string => assessment.id.toString()}
      stickyHeader
      variant="outlined"
    >
      {template}
    </Table>
  );
};

export default AssessmentIndexPage;
