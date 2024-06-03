import { ErrorName, ErrorStatus } from '@/types/error';

export const ERROR_NAME: Record<ErrorStatus, ErrorName> = {
  400: 'BAD_REQUEST_ERROR',
  401: 'UNAUTHORIZED_ERROR',
  404: 'NOT_FOUND_ERROR',
  500: 'SERVER_ERROR',
  504: 'NETWORK_ERROR',
};

export const ERROR_MESSAGE: Record<ErrorName, string> = {
  BAD_REQUEST_ERROR: '잘못된 접근입니다. 다시 시도해주세요!',
  UNAUTHORIZED_ERROR: '요청 권한이 없습니다. 다시 시도해주세요!',
  NOT_FOUND_ERROR: '잘못된 요청입니다. 다시 시도해주세요!',
  SERVER_ERROR: '서버와의 통신 중 오류가 발생하였습니다. 다시 시도해주세요!',
  NETWORK_ERROR: '인터넷 연결이 불안정합니다. 다시 시도해주세요!',
};
