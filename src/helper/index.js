/* 
    @type: 0 - full path 
           1 - interact path
*/
const getInteractCount = (data = [], type = 0) => {
  var reactors = 0;
  var commenters = 0;
  if (type === 0) {
    reactors =
      data.interactCount && data.interactCount.reactors
        ? data.interactCount.reactors
        : 0;
    commenters =
      data.interactCount && data.interactCount.commenters
        ? data.interactCount.commenters
        : 0;
  } else {
    reactors = data.reactors ? data.reactors : 0;
    commenters = data.commenters ? data.commenters : 0;
  }
  return {
    reactors,
    commenters,
  };
};

export { getInteractCount };
