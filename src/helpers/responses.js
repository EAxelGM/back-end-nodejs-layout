export const response = (res, { code = 200, message = "Success", data = null }) => {
  return res.status(code).json({
    message,
    code,
    data,
  });
};
