import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';
import { BCRYPT_SALT, EXPIRES_IN_JWT } from '../configs';

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
): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, { expiresIn });
  return token;
};

export const verifyJwt = (token: string): string | JwtPayload => {
  const isTokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  return isTokenVerified;
};

export const decodeJwt = (token: string): Jwt | null => {
  const decodedToken = jwt.decode(token, { complete: true });
  return decodedToken;
};

export const generateOtp = (size: number = 4) => {
  return otpGenerator.generate(size, {
    digits: true,
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });
};
