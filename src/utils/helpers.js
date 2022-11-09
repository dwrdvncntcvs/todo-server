const cleanData = (data) => {
  const doc = data._doc;
  const dataId = doc._id;
  delete doc._id;

  return { ...doc, id: dataId };
};

module.exports = {
  cleanData,
};
