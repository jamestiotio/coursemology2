import { FC, ReactElement, ReactNode, useEffect, useState } from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import PageHeader from 'lib/components/pages/PageHeader';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, AppDispatch } from 'types/store';
import LoadingIndicator from 'lib/components/LoadingIndicator';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import AddButton from 'lib/components/buttons/AddButton';
import { indexInstances } from '../../operations';
import InstancesTable from '../../components/tables/InstancesTable';
import InstancesButtons from '../../components/buttons/InstancesButtons';
import { getAdminCounts, getPermissions } from '../../selectors';
import InstanceNew from '../InstanceNew';

type Props = WrappedComponentProps;

const styles = {
  newButton: {
    color: 'white',
  },
};

const translations = defineMessages({
  header: {
    id: 'system.admin.instances.header',
    defaultMessage: 'Instances',
  },
  totalInstances: {
    id: 'system.admin.instances.totalInstances',
    defaultMessage: 'Total Instances: <strong>{count}</strong>',
  },
  fetchInstancesFailure: {
    id: 'system.admin.admin.fetchInstances.failure',
    defaultMessage: 'Failed to get instances',
  },
  newInstance: {
    id: 'system.admin.instance.new',
    defaultMessage: 'New Instance',
  },
});

const InstancesIndex: FC<Props> = (props) => {
  const { intl } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const counts = useSelector((state: AppState) => getAdminCounts(state));
  const permissions = useSelector((state: AppState) => getPermissions(state));
  const dispatch = useDispatch<AppDispatch>();
  const headerToolbars: ReactElement[] = [];

  useEffect(() => {
    dispatch(indexInstances({ 'filter[length]': 30 }))
      .finally(() => setIsLoading(false))
      .catch(() =>
        toast.error(intl.formatMessage(translations.fetchInstancesFailure)),
      );
  }, [dispatch]);

  if (permissions.canCreateInstances) {
    headerToolbars.push(
      <AddButton
        id="new-instance-button"
        key="new-instance-button"
        onClick={(): void => {
          setIsOpen(true);
        }}
        tooltip={intl.formatMessage(translations.newInstance)}
        sx={styles.newButton}
      />,
    );
  }

  const renderBody: JSX.Element = (
    <>
      <Typography variant="body1" style={{ marginTop: '8px' }}>
        {intl.formatMessage(translations.totalInstances, {
          strong: (str: ReactNode[]): JSX.Element => <strong>{str}</strong>,
          count: counts.instancesCount,
        })}
      </Typography>
      <InstancesTable
        renderRowActionComponent={(instance): JSX.Element => (
          <InstancesButtons instance={instance} />
        )}
      />
      <InstanceNew open={isOpen} handleClose={(): void => setIsOpen(false)} />
    </>
  );

  return (
    <>
      <PageHeader
        title={intl.formatMessage(translations.header)}
        toolbars={headerToolbars}
      />
      {isLoading ? <LoadingIndicator /> : <>{renderBody}</>}
    </>
  );
};

export default injectIntl(InstancesIndex);
