/* eslint-disable no-nested-ternary */
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { AppDispatch, AppState } from 'types/store';
import {
  SubmissionAssessmentFilterData,
  SubmissionGroupFilterData,
  SubmissionUserFilterData,
} from 'types/course/assessment/submissions';

import LoadingIndicator from 'lib/components/LoadingIndicator';
import PageHeader from 'lib/components/pages/PageHeader';

import {
  getAllSubmissionMiniEntities,
  getFilter,
  getIsGamified,
  getSubmissionCount,
  getSubmissionPermissions,
  getTabs,
} from '../../selectors';

import {
  fetchSubmissions,
  filterPendingSubmissions,
  filterSubmissions,
} from '../../operations';
import SubmissionsTable from '../../components/tables/SubmissionsTable';
import SubmissionFilter from '../../components/misc/SubmissionFilter';
import SubmissionTabs from '../../components/misc/SubmissionTabs';
import SubmissionPagination from '../../components/misc/SubmissionPagination';

interface Props extends WrappedComponentProps {}

const translations = defineMessages({
  header: {
    id: 'course.assessments.submissions.header',
    defaultMessage: 'Submissions',
  },
  fetchSubmissionsFailure: {
    id: 'course.assessments.submissions.fetchSubmissionsFailure',
    defaultMessage: 'Failed to fetch submissions',
  },
  filterGetFailure: {
    id: 'course.assessments.submissions.filterGetFailure',
    defaultMessage: 'Failed to filter',
  },
});

const SubmissionsIndex: FC<Props> = (props) => {
  const { intl } = props;

  const dispatch = useDispatch<AppDispatch>();

  const ROWS_PER_PAGE = 25;
  const [pageNum, setPageNum] = useState(1);

  // Selectors
  const isGamified = useSelector((state: AppState) => getIsGamified(state));
  const submissionCount = useSelector((state: AppState) =>
    getSubmissionCount(state),
  );
  const submissions = useSelector((state: AppState) =>
    getAllSubmissionMiniEntities(state),
  );
  const tabs = useSelector((state: AppState) => getTabs(state));
  const filter = useSelector((state: AppState) => getFilter(state));
  const submissionPermissions = useSelector((state: AppState) =>
    getSubmissionPermissions(state),
  );

  // For tab logic and control
  const [tabValue, setTabValue] = useState(2);
  const [isTabChanging, setIsTabChanging] = useState(false);

  const [tableIsLoading, setTableIsLoading] = useState(false);

  // For filtering
  const [selectedAssessment, setselectedAssessment] =
    useState<SubmissionAssessmentFilterData | null>(null);

  const [selectedGroup, setselectedGroup] =
    useState<SubmissionGroupFilterData | null>(null);

  const [selectedUser, setselectedUser] =
    useState<SubmissionUserFilterData | null>(null);

  const handleFilter = (newPageNumber: number): void => {
    const assessmentId = selectedAssessment ? selectedAssessment.id : null;
    const groupId = selectedGroup ? selectedGroup.id : null;
    const userId = selectedUser ? selectedUser.id : null;

    const categoryId = tabValue > 1 ? tabs.categories[tabValue - 2].id : null;

    dispatch(
      filterSubmissions(
        categoryId,
        assessmentId,
        groupId,
        userId,
        newPageNumber,
      ),
    )
      .then(() => {
        setTableIsLoading(false);
      })
      .catch((error) => {
        toast.error(intl.formatMessage(translations.filterGetFailure));
        throw error;
      });
  };

  const handlePageChange = (newPageNumber): void => {
    setTableIsLoading(true);
    setPageNum(newPageNumber);
    if (tabValue < 2) {
      dispatch(filterPendingSubmissions(tabValue === 0, newPageNumber))
        .then(() => {
          setTableIsLoading(false);
        })
        .catch((error) => {
          toast.error(intl.formatMessage(translations.filterGetFailure));
          throw error;
        });
    } else {
      handleFilter(newPageNumber);
    }
  };

  const [pageIsLoading, setPageIsLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchSubmissions())
      .finally(() => {
        setPageIsLoading(false);
      })
      .catch(() =>
        toast.error(intl.formatMessage(translations.fetchSubmissionsFailure)),
      );
  }, [dispatch]);

  if (pageIsLoading) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <PageHeader title={intl.formatMessage(translations.header)} />
      <SubmissionTabs
        isTeachingStaff={submissionPermissions.isTeachingStaff}
        tabs={tabs}
        tabValue={tabValue}
        setTabValue={setTabValue}
        setIsTabChanging={setIsTabChanging}
        setTableIsLoading={setTableIsLoading}
        setPageNum={setPageNum}
      />

      <SubmissionFilter
        key={`submission-filter-${tabValue}`}
        showDetailFilter={submissionPermissions.canManage && tabValue > 1}
        tabCategories={tabs.categories}
        categoryNum={tabValue - 2}
        filter={filter}
        setPageNum={setPageNum}
        setTableIsLoading={setTableIsLoading}
        setSelectedAssessment={setselectedAssessment}
        setSelectedGroup={setselectedGroup}
        setSelectedUser={setselectedUser}
        handleFilterOnClick={handleFilter}
      />

      {!isTabChanging && (
        <SubmissionPagination
          submissionCount={submissionCount}
          rowsPerPage={ROWS_PER_PAGE}
          pageNum={pageNum}
          handlePageChange={handlePageChange}
        />
      )}

      <SubmissionsTable
        isGamified={isGamified}
        submissions={submissions}
        isPendingTab={submissionPermissions.isTeachingStaff && tabValue < 2}
        tableIsLoading={tableIsLoading}
        rowsPerPage={ROWS_PER_PAGE}
        pageNum={pageNum}
      />
    </>
  );
};

export default injectIntl(SubmissionsIndex);
