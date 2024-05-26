export const refresh = async (req, res, next) => {
  const { email, theme, avatarURL, name } = req.user;

  res.json({ email, theme, avatarURL, name });
};
