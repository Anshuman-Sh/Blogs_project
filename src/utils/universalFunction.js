const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.log(err);
    next(err);
  });
};

// object && Object.prototype.hasOwnProperty.call(object, key)

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object?.[key] != null) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

const paginationOptions = (page, limit) => {
  return { sort: { _id: -1 }, skip: page * limit, limit: limit, lean: true };
};

module.exports = { catchAsync, pick, paginationOptions };
