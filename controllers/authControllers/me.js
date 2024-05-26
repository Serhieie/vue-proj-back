export const me = async (req, res, next) => {
  const { email, theme, avatarURL, name, _id } = req.user;
  res.json({ _id, name, email, avatarURL, theme });
};
