const cleanData = (data) => {
  const doc = data._doc;
  const dataId = doc._id;
  delete doc._id;

  return { ...doc, id: dataId };
};

const generateErrorMessage = (err) => {
  let errorData = {
    status: 0,
    message: "",
  };

  console.log(err);

  const errorMessage = err.message;

  console.log(err.code);

  if (!err.code) {
    const C_I = errorMessage.indexOf("{");
    if (C_I < 0) {
      errorData.status = 500;
      errorData.message = "Something went wrong";
    }
    const extracted = errorMessage.slice(C_I);
    errorData = JSON.parse(extracted);
  } else {
    if (err.code === 11000) {
      for (let key in err.keyValue)
        errorData.message = `${
          key.split("")[0].toUpperCase() + key.slice(1)
        } already exists`;
      errorData.status = 403;
    }
  }

  return errorData;
};

module.exports = {
  cleanData,
  generateErrorMessage,
};
