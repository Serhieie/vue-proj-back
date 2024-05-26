export const refresh = async (req, res, next) => {
  const { token } = req.user;
  res.json({ accessToken: token });
};
