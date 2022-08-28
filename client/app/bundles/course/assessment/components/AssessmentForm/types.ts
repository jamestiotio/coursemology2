import { connect, ConnectedProps } from 'react-redux';
import { WrappedComponentProps } from 'react-intl';

import { Material } from '../FileManager';
import { FieldValues, UseFormSetError } from 'react-hook-form';

interface Tab {
  tab_id?: number;
  title?: string;
}

interface FolderAttributes {
  folder_id: number;
  materials?: Material[];

  /**
   * If `true`, Materials component in Course Settings is enabled
   */
  enable_materials_action?: boolean;
}

interface AchievementTypesConditionAttributes {
  new_condition_urls?: {
    name?: string;
    url?: string;
  }[];

  conditions?: {
    name?: string;
    description?: string;
    edit_url?: string;
    delete_url?: string;
  }[];
}

// @ts-ignore until Assessment store is fully typed
export const connector = connect((state) => ({ tabs: state.editPage.tabs }));

export interface AssessmentFormProps
  extends WrappedComponentProps,
    ConnectedProps<typeof connector> {
  tabs: Tab[];
  onSubmit: (data: FieldValues, setError: UseFormSetError<FieldValues>) => void;

  initialValues?;
  disabled?: boolean;
  showPersonalizedTimelineFeatures?: boolean;
  randomizationAllowed?: boolean;
  folderAttributes?: FolderAttributes;
  conditionAttributes?: AchievementTypesConditionAttributes;

  /**
   * If `true`, this component is displayed on Edit Assessment page
   */
  editing?: boolean;

  /**
   * If `true`, this course is gamified
   */
  gamified?: boolean;

  /**
   * If `true`, Autograded and Manual grading modes can be changed
   */
  modeSwitching?: boolean;

  containsCodaveri?: boolean;
}
