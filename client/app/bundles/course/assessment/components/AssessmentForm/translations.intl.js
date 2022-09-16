import { defineMessages } from 'react-intl';

const translations = defineMessages({
  title: {
    id: 'course.assessment.form.title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'course.assessment.form.description',
    defaultMessage: 'Description',
  },
  startAt: {
    id: 'course.assessment.form.startAt',
    defaultMessage: 'Starts at *',
  },
  endAt: {
    id: 'course.assessment.form.endAt',
    defaultMessage: 'Ends at',
  },
  bonusEndAt: {
    id: 'course.assessment.form.bonusEndAt',
    defaultMessage: 'Bonus ends at',
  },
  baseExp: {
    id: 'course.assessment.form.baseExp',
    defaultMessage: 'Base EXP',
  },
  timeBonusExp: {
    id: 'course.assessment.form.timeBonusExp',
    defaultMessage: 'Time Bonus EXP',
  },
  blockStudentViewingAfterSubmitted: {
    id: 'course.assessment.form.blockStudentViewingAfterSubmitted',
    defaultMessage: 'Block students from viewing finalized submissions',
  },
  usePublic: {
    id: 'course.assessment.form.usePublic',
    defaultMessage: 'Public test cases',
  },
  usePrivate: {
    id: 'course.assessment.form.usePrivate',
    defaultMessage: 'Private test cases',
  },
  useEvaluation: {
    id: 'course.assessment.form.useEvaluation',
    defaultMessage: 'Evaluation test cases',
  },
  allowPartialSubmission: {
    id: 'course.assessment.form.allowPartialSubmission',
    defaultMessage: 'Allow submission with incorrect answers',
  },
  showMcqAnswer: {
    id: 'course.assessment.form.showMcqAnswer',
    defaultMessage: 'Show MCQ submit result',
  },
  showMcqAnswerHint: {
    id: 'course.assessment.form.showMcqAnswerHint',
    defaultMessage:
      'When enabled, students can try to submit MCQ answers and get feedback until they get it right.',
  },
  showPrivate: {
    id: 'course.assessment.form.showPrivate',
    defaultMessage: 'Show private test cases',
  },
  showEvaluation: {
    id: 'course.assessment.form.showEvaluation',
    defaultMessage: 'Show evaluation test cases',
  },
  forProgrammingQuestions: {
    id: 'course.assessment.form.forProgrammingQuestions',
    defaultMessage: 'for programming questions',
  },
  hasPersonalTimes: {
    id: 'course.assessment.form.hasPersonalTimes',
    defaultMessage: 'Has personal times',
  },
  hasPersonalTimesHint: {
    id: 'course.assessment.form.hasPersonalTimesHint',
    defaultMessage:
      'Timings for this item will be automatically adjusted for users based on learning rate',
  },
  affectsPersonalTimes: {
    id: 'course.assessment.form.affectsPersonalTimes',
    defaultMessage: 'Affects personal times',
  },
  affectsPersonalTimesHint: {
    id: 'course.assessment.form.affectsPersonalTimesHint',
    defaultMessage:
      "Student's submission time for this item will be taken into account \
      when updating personal times for other items",
  },
  visibility: {
    id: 'course.assessment.form.visibility',
    defaultMessage: 'Visibility',
  },
  published: {
    id: 'course.assessment.form.published',
    defaultMessage: 'Published',
  },
  draft: {
    id: 'course.assessment.form.draft',
    defaultMessage: 'Draft',
  },
  publishedHint: {
    id: 'course.assessment.form.publishedHint',
    defaultMessage: 'Everyone can see this assessment.',
  },
  draftHint: {
    id: 'course.assessment.form.draftHint',
    defaultMessage: 'Only you and staff can see this assessment.',
  },
  gradingMode: {
    id: 'course.assessment.form.gradingMode',
    defaultMessage: 'Grading mode',
  },
  autogradedHint: {
    id: 'course.assessment.form.autogradedHint',
    defaultMessage:
      'Automatically assign grade and EXP upon submission. \
      Non-autogradeable questions will always receive the maximum grade.',
  },
  modeSwitchingDisabled: {
    id: 'course.assessment.form.modeSwitchingHint',
    defaultMessage:
      'You can no longer change the grading mode because there are already submissions \
      for this assessment.',
  },
  containsCodaveriQuestion: {
    id: 'course.assessment.form.containsCodaveriQuestion',
    defaultMessage:
      "Switch to autograded mode is not allowed as there's \
      codaveri programming question type in this assessment. \
      This question type is only supported \
      in manually-graded assessment.",
  },
  calculateGradeWith: {
    id: 'course.assessment.form.calculateGradeWith',
    defaultMessage: 'Calculate grade and EXP with',
  },
  skippable: {
    id: 'course.assessment.form.skippable',
    defaultMessage: 'Allow to skip steps',
  },
  skippableManualHint: {
    id: 'course.assessment.form.skippableManualHint',
    defaultMessage:
      'Students can already move between questions in manually graded assessments.',
  },
  unlockConditions: {
    id: 'course.assessment.form.unlockConditions',
    defaultMessage: 'Unlock conditions',
  },
  unlockConditionsHint: {
    id: 'course.assessment.form.unlockConditionsHint',
    defaultMessage:
      'This assessment will be unlocked if a student meets the following conditions.',
  },
  displayAssessmentAs: {
    id: 'course.assessment.form.displayAssessmentAs',
    defaultMessage: 'Display assessment as',
  },
  tabbedView: {
    id: 'course.assessment.form.tabbedView',
    defaultMessage: 'Tabbed View',
  },
  singlePage: {
    id: 'course.assessment.form.singlePage',
    defaultMessage: 'Single Page',
  },
  delayedGradePublication: {
    id: 'course.assessment.form.delayedGradePublication',
    defaultMessage: 'Enable delayed grade publication',
  },
  delayedGradePublicationHint: {
    id: 'course.assessment.form.delayedGradePublicationHint',
    defaultMessage:
      'When delayed grade publication is on, gradings will not be immediately shown to students. \
      To publish all gradings, you may click Publish Grades in the Submissions page.',
  },
  showMcqMrqSolution: {
    id: 'course.assessment.form.showMcqMrqSolution',
    defaultMessage: 'Show MCQ/MRQ solution(s)',
  },
  passwordRequired: {
    id: 'course.assessment.form.passwordRequired',
    defaultMessage: 'At least one password is required',
  },
  passwordProtection: {
    id: 'course.assessment.form.passwordProtection',
    defaultMessage: 'Enable password protection',
  },
  sessionProtection: {
    id: 'course.assessment.form.sessionProtection',
    defaultMessage: 'Enable session protection',
  },
  sessionProtectionHint: {
    id: 'course.assessment.form.sessionProtection',
    defaultMessage:
      'When session protection is on, students can only access their attempt once. \
      Further access will require the session unlock password.',
  },
  viewPasswordHint: {
    id: 'course.assessment.form.viewPasswordHint',
    defaultMessage:
      'Students need to input this password to View and Attempt this assessment.',
  },
  viewPassword: {
    id: 'course.assessment.form.viewPassword',
    defaultMessage: 'Assessment password',
  },
  sessionPasswordHint: {
    id: 'course.assessment.form.sessionPasswordHint',
    defaultMessage: 'Ideally, do NOT give this password to students.',
  },
  sessionPassword: {
    id: 'course.assessment.form.sessionPassword',
    defaultMessage: 'Session unlock password',
  },
  startEndValidationError: {
    id: 'course.assessment.form.startEndValidationError',
    defaultMessage: 'Must be after starting time',
  },
  noTestCaseChosenError: {
    id: 'course.assessment.form.noTestCaseChosenError',
    defaultMessage: 'Select at least one type of test case',
  },
  fetchTabFailure: {
    id: 'course.assessment.form.fetchCategoryFailure',
    defaultMessage:
      'Loading of Tabs failed. Please refresh the page, or try again.',
  },
  tab: {
    id: 'course.assessment.form.tab',
    defaultMessage: 'Tab',
  },
  enableRandomization: {
    id: 'course.assessment.form.enable_randomization',
    defaultMessage: 'Enable Randomization',
  },
  enableRandomizationHint: {
    id: 'course.assessment.form.enable_randomization_hint',
    defaultMessage:
      'Enables randomized assignment of question bundles to students (per question group)',
  },
  assessmentDetails: {
    id: 'course.assessment.form.assessmentDetails',
    defaultMessage: 'Assessment details',
  },
  gamification: {
    id: 'course.assessment.form.gamification',
    defaultMessage: 'Gamification',
  },
  grading: {
    id: 'course.assessment.form.grading',
    defaultMessage: 'Grading',
  },
  answersAndTestCases: {
    id: 'course.assessment.form.answersAndTestCases',
    defaultMessage: 'Answers and test cases',
  },
  organization: {
    id: 'course.assessment.form.organization',
    defaultMessage: 'Organization',
  },
  examsAndAccessControl: {
    id: 'course.assessment.form.examsAndAccessControl',
    defaultMessage: 'Exams and access control',
  },
  personalisedTimelines: {
    id: 'course.assessment.form.personalisedTimelines',
    defaultMessage: 'Personalised timelines',
  },
  unavailableInAutograded: {
    id: 'course.assessment.form.unavailableInAutograded',
    defaultMessage: 'Unavailable in autograded assessments.',
  },
  unavailableInManuallyGraded: {
    id: 'course.assessment.form.unavailableInManuallyGraded',
    defaultMessage: 'Unavailable in manually graded assessments.',
  },
  afterSubmissionGraded: {
    id: 'course.assessment.form.afterSubmissionGraded',
    defaultMessage: 'After submission is graded and published',
  },
  files: {
    id: 'course.assessment.form.files',
    defaultMessage: 'Files',
  },
});

export default translations;
