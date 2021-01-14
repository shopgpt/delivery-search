// BASE_URL
export const BASE_RUL = "http://info.sweettracker.co.kr";

// API_KEY
export const API_KEY = process.env.REACT_APP_API_KEY;

// 택배사 조회
export const GET_COMPANY = `${BASE_RUL}/api/v1/companylist?t_key=${API_KEY}`;

// 운송장 번호 조회
export const GET_TRACKING_INFO = `${BASE_RUL}/api/v1/trackingInfo?t_key=${API_KEY}`;
