/* eslint-disable no-param-reassign */
/**
 * Prepares and maps answer value in the react-hook-form into server side format.
 * 1) In VoiceResponse, attribute answer.file is generated by component SingleFileInput.
 *    The data is in a format of { url, file, name }, and we only need to assign the file
 *    attribute into answer.file
 */

import { produce } from 'immer';

import { questionTypes } from '../constants';

const formatAnswerBase = (answer, currentTime) => ({
  id: answer.id,
  client_version: currentTime,
});

const formatAnswerSpecific = (answer) => {
  const answerMap = {
    [questionTypes.MultipleChoice]: () => ({
      option_ids: answer.option_ids,
    }),
    [questionTypes.MultipleResponse]: () => ({
      option_ids: answer.option_ids,
    }),
    [questionTypes.Programming]: () => {
      const filesAttributes = answer.files_attributes;
      const formattedFilesAttributes = filesAttributes.map((file) => ({
        id: file.id,
        filename: file.filename,
        content: file.content,
      }));
      return {
        files_attributes: formattedFilesAttributes,
      };
    },
    [questionTypes.TextResponse]: () => ({
      answer_text: answer.answer_text,
    }),
    [questionTypes.FileUpload]: () => ({}),
    [questionTypes.VoiceResponse]: () => {
      const fileObj = answer.file;
      if (fileObj) {
        const { file } = fileObj;
        if (file) {
          return {
            file,
          };
        }
      }
      return {};
    },
    [questionTypes.ForumPostResponse]: () => {
      const selectedPostPacks = answer.selected_post_packs.map((postPack) =>
        produce({}, (draftState) => {
          const corePost = {
            id: postPack.corePost.id,
            text: postPack.corePost.text,
            creatorId: postPack.corePost.creatorId,
            updatedAt: postPack.corePost.updatedAt,
          };

          if (postPack.parentPost) {
            const parentPost = {
              id: postPack.parentPost.id,
              text: postPack.parentPost.text,
              creatorId: postPack.parentPost.creatorId,
              updatedAt: postPack.parentPost.updatedAt,
            };
            draftState.parent_post = parentPost;
          }
          const topic = {
            id: postPack.topic.id,
          };

          draftState.core_post = corePost;
          draftState.topic = topic;
        }),
      );
      return {
        answer_text: answer.answer_text,
        selected_post_packs: selectedPostPacks,
      };
    },
  };

  if (answerMap[answer.questionType] === undefined) {
    return answer;
  }

  return answerMap[answer.questionType]();
};

export const formatAnswer = (answer, currentTime) => {
  const baseAnswer = formatAnswerBase(answer, currentTime);
  const specificAnswer = formatAnswerSpecific(answer);

  return { ...baseAnswer, ...specificAnswer };
};
export const formatAnswers = (answers = {}, currentTime) => {
  const newAnswers = [];
  Object.values(answers).forEach((answer) => {
    const newAnswer = formatAnswer(answer, currentTime);
    newAnswers.push(newAnswer);
  });
  return newAnswers;
};

export function buildErrorMessage(error) {
  const errMessage = error?.response?.data;
  if (typeof errMessage?.error === 'string') {
    return error.response.data.error;
  }
  if (!errMessage?.errors) {
    return '';
  }

  return Object.values(error.response.data.errors)
    .reduce((flat, errors) => flat.concat(errors), [])
    .join(', ');
}
