import { Component } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Button, Card, CardContent } from '@mui/material';
import withRouter from 'lib/components/withRouter';
import { postShape, annotationShape } from '../propTypes';
import CodaveriCommentCard from '../components/comment/CodaveriCommentCard';
import CommentCard from '../components/comment/CommentCard';
import CommentField from '../components/comment/CommentField';
import * as annotationActions from '../actions/annotations';
import { workflowStates } from '../constants';

const translations = defineMessages({
  comment: {
    id: 'course.assessment.submission.commentField.comment',
    defaultMessage: 'Add Comment',
  },
});

const styles = {
  card: {
    minWidth: 250,
    border: '0.2px solid #e3e3e3',
  },
};

class VisibleAnnotations extends Component {
  constructor(props) {
    super(props);
    this.state = { fieldVisible: false };
  }

  render() {
    const { fieldVisible } = this.state;
    const {
      fileId,
      lineNumber,
      commentForms,
      posts,
      createComment,
      updateComment,
      deleteComment,
      handleCreateChange,
      handleUpdateChange,
      graderView,
      renderDelayedCommentButton,
      updateCodaveriFeedback,
    } = this.props;

    return (
      <Card style={styles.card}>
        <CardContent style={{ textAlign: 'left' }}>
          {posts.map((post) => {
            if (
              post.codaveriFeedback &&
              post.codaveriFeedback.status === 'pending_review'
            ) {
              return (
                <CodaveriCommentCard
                  key={post.id}
                  post={post}
                  editValue={commentForms.posts[post.id]}
                  updateComment={updateCodaveriFeedback}
                  deleteComment={() => deleteComment(post.id)}
                  handleChange={(value) => handleUpdateChange(post.id, value)}
                />
              );
            }
            if (graderView || !post.isDelayed) {
              return (
                <CommentCard
                  key={post.id}
                  post={post}
                  editValue={commentForms.posts[post.id]}
                  updateComment={(value) => updateComment(post.id, value)}
                  deleteComment={() => deleteComment(post.id)}
                  handleChange={(value) => handleUpdateChange(post.id, value)}
                />
              );
            }
            return <></>;
          })}
          {posts.length === 0 || fieldVisible ? (
            <CommentField
              value={commentForms.annotations[fileId][lineNumber]}
              isSubmittingNormalComment={commentForms.isSubmittingNormalComment}
              isSubmittingDelayedComment={
                commentForms.isSubmittingDelayedComment
              }
              isUpdatingComment={commentForms.isUpdatingComment}
              createComment={createComment}
              handleChange={handleCreateChange}
              renderDelayedCommentButton={renderDelayedCommentButton}
            />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.setState({ fieldVisible: true })}
            >
              <FormattedMessage {...translations.comment} />
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }
}

VisibleAnnotations.propTypes = {
  commentForms: PropTypes.shape({
    topics: PropTypes.objectOf(PropTypes.string),
    posts: PropTypes.objectOf(PropTypes.string),
    isSubmittingNormalComment: PropTypes.bool,
    isSubmittingDelayedComment: PropTypes.bool,
    isUpdatingComment: PropTypes.bool,
    annotations: PropTypes.object,
  }),
  fileId: PropTypes.number.isRequired,
  lineNumber: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(postShape),
  /* eslint-disable react/no-unused-prop-types */
  match: PropTypes.shape({
    params: PropTypes.shape({
      courseId: PropTypes.string,
      assessmentId: PropTypes.string,
      submissionId: PropTypes.string,
    }),
  }),
  annotation: annotationShape,
  answerId: PropTypes.number.isRequired,
  graderView: PropTypes.bool.isRequired,
  renderDelayedCommentButton: PropTypes.bool,
  /* eslint-enable react/no-unused-prop-types */

  handleCreateChange: PropTypes.func.isRequired,
  handleUpdateChange: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  updateCodaveriFeedback: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { annotation } = ownProps;
  const renderDelayedCommentButton =
    state.submission.graderView &&
    !state.assessment.autograded &&
    (state.submission.workflowState === workflowStates.Submitted ||
      state.submission.workflowState === workflowStates.Graded);
  if (!annotation) {
    return {
      commentForms: state.commentForms,
      posts: [],
      graderView: state.submission.graderView,
      renderDelayedCommentButton,
    };
  }
  return {
    commentForms: state.commentForms,
    posts: annotation.postIds.map((postId) => state.posts[postId]),
    graderView: state.submission.graderView,
    renderDelayedCommentButton,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const {
    match: {
      params: { submissionId },
    },
    answerId,
    fileId,
    lineNumber,
    annotation,
  } = ownProps;

  if (!annotation) {
    return {
      handleCreateChange: (comment) =>
        dispatch(annotationActions.onCreateChange(fileId, lineNumber, comment)),
      handleUpdateChange: (postId, comment) =>
        dispatch(annotationActions.onUpdateChange(postId, comment)),
      createComment: (comment, isDelayedComment = false) =>
        dispatch(
          annotationActions.create(
            submissionId,
            answerId,
            fileId,
            lineNumber,
            comment,
            isDelayedComment,
          ),
        )
          .then(() => toast.success('Successfully created comment.'))
          .catch(() => toast.error('Failed to create comment.')),
      updateComment: () => {},
      deleteComment: () => {},
    };
  }
  return {
    handleCreateChange: (comment) =>
      dispatch(annotationActions.onCreateChange(fileId, lineNumber, comment)),
    handleUpdateChange: (postId, comment) =>
      dispatch(annotationActions.onUpdateChange(postId, comment)),
    createComment: (comment, isDelayedComment = false) =>
      dispatch(
        annotationActions.create(
          submissionId,
          answerId,
          fileId,
          lineNumber,
          comment,
          isDelayedComment,
        ),
      )
        .then(() => toast.success('Successfully created comment.'))
        .catch(() => toast.error('Failed to create comment.')),
    updateComment: (postId, comment) =>
      dispatch(annotationActions.update(annotation.id, postId, comment)),
    deleteComment: (postId) =>
      dispatch(annotationActions.destroy(fileId, annotation.id, postId)),
    updateCodaveriFeedback: (postId, codaveriId, comment, rating, status) =>
      dispatch(
        annotationActions.updateCodaveri(
          fileId,
          annotation.id,
          postId,
          codaveriId,
          comment,
          rating,
          status,
        ),
      ),
  };
}

const Annotations = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VisibleAnnotations),
);
export default Annotations;
