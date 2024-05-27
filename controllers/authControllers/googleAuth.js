import 'dotenv/config';
import jwt from 'jsonwebtoken';
import queryString from 'query-string';
import helpers from '../../helpers/index.js';
import axios from 'axios';
import { createUser, updateUser } from '../../services/authServise.js';
import { User } from '../../models/user.js';

const {
  ACCESS_SECRET_KEY,
  REFRESH_EXPIRES_TIME,
  REFRESH_SECRET_KEY,
  ACCESS_EXPIRED_TIME,
} = process.env;

export const googleAuth = (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

export const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });

  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  //   {
  //   id: '117455998533450141821',
  //   email: 'theninjainme@gmail.com',
  //   verified_email: true,
  //   name: 'Bohdan S',
  //   given_name: 'Bohdan',
  //   family_name: 'S',
  //   picture: 'https://lh3.googleusercontent.com/a/ACg8ocIJPBXLVVTI5Gpv3eCJ8hNN6VcQ8oA1hyQRTYSlq6jKrz_rvRs=s96-c',
  //   locale: 'en-US'
  // }

  const { email, id, picture, name, verified_email } = userData.data;
  const user = await User.findOne({ email });

  if (!user) {
    const hashPwd = await helpers.createHash(id);

    const newUser = await createUser({
      name,
      email,
      theme: 'dark',
      googleId: hashPwd,
      password: hashPwd,
      avatarURL: picture ? picture : '',
    });

    const payload = { id: newUser._id };
    const token = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: ACCESS_EXPIRED_TIME,
    });

    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: REFRESH_EXPIRES_TIME,
    });

    await updateUser(newUser._id, { token });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None',
    });
    return res.redirect(
      `${process.env.FRONTEND_URL}auth/google/?token=${token}`
    );
  } else {
    if (!user.googleId) {
      const isValidGoogleId = await helpers.createHash(id);
      const payload = { id: user._id };
      const token = jwt.sign(payload, ACCESS_SECRET_KEY, {
        expiresIn: ACCESS_EXPIRED_TIME,
      });

      const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
        expiresIn: REFRESH_EXPIRES_TIME,
      });

      await updateUser(user._id, { token, googleId: isValidGoogleId });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'None',
      });
      return res.redirect(
        `${process.env.FRONTEND_URL}auth/google/?token=${token}`
      );
    } else {
      const isValidGoogleId = await helpers.compareHash(id, user.googleId);

      if (!isValidGoogleId) {
        throw helpers.httpError(401, 'GoogleId is wrong');
      }
      const payload = { id: user._id };
      const token = jwt.sign(payload, ACCESS_SECRET_KEY, {
        expiresIn: ACCESS_EXPIRED_TIME,
      });
      const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
        expiresIn: REFRESH_EXPIRES_TIME,
      });
      await updateUser(user._id, { token });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'None',
      });
      return res.redirect(
        `${process.env.FRONTEND_URL}auth/google/?token=${token}`
      );
    }
  }
};
