import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';
import {
  BCRYPT_SALT,
  EXPIRES_IN_ACCESS_TOKEN,
  EXPIRES_IN_JWT,
  EXPIRES_IN_REFRESH_TOKEN,
} from '../configs';
import { IUser } from '../types';
import { messages } from './messages';
import { RefreshTokenModel } from '../models';

export const hashKey = async (key: string): Promise<string> => {
  const hashedKey = await bcrypt.hash(key, BCRYPT_SALT);
  return hashedKey;
};

export const compareHashKey = async (key: string, hashedKey: string): Promise<boolean> => {
  const comparedKey = await bcrypt.compare(key, hashedKey);
  return comparedKey;
};

export const createJwt = <T extends string | object | Buffer>(
  payload: T,
  expiresIn = EXPIRES_IN_JWT,
  secret = process.env.JWT_SECRET_KEY as string,
): string => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

export const verifyJwt = (
  token: string,
  secret = process.env.JWT_SECRET_KEY as string,
): string | JwtPayload => {
  const isTokenVerified = jwt.verify(token, secret);
  return isTokenVerified;
};

export const decodeJwt = (token: string): Jwt | null => {
  const decodedToken = jwt.decode(token, { complete: true });
  return decodedToken;
};

export const createAccessTokenJwt = <T extends string | object | Buffer>(
  payload: T,
  secret = process.env.ACCESS_TOKEN_SECRET_KEY as string,
  expiresIn = EXPIRES_IN_ACCESS_TOKEN,
) => {
  return createJwt(payload, expiresIn, secret);
};

export const createRefreshTokenJwt = <T extends string | object | Buffer>(
  payload: T,
  secret = process.env.REFRESH_TOKEN_SECRET_KEY as string,
  expiresIn = EXPIRES_IN_REFRESH_TOKEN,
) => {
  return createJwt(payload, expiresIn, secret);
};

export const getJwtPayload = (user: Partial<IUser>) => ({ userId: user._id, email: user.email });

export const generateTokens = async (user: IUser) => {
  try {
    const payload = getJwtPayload(user);
    const accessToken = createAccessTokenJwt(payload);
    const refreshToken = createRefreshTokenJwt(payload);

    const refreshTokenExists = await RefreshTokenModel.findOne({ userId: user._id });
    if (refreshTokenExists) {
      await refreshTokenExists.deleteOne();
    }

    await new RefreshTokenModel({ userId: user._id, token: refreshToken }).save();
    return { accessToken, refreshToken };
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const verifyRefreshToken = async (refreshToken: string) => {
  try {
    const refreshTokenExists = await RefreshTokenModel.findOne({ token: refreshToken });
    if (!refreshTokenExists) {
      throw new Error(messages.invalidTokenMessage);
    }
    return verifyJwt(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const generateOtp = (size: number = 4) => {
  return otpGenerator.generate(size, {
    digits: true,
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });
};
