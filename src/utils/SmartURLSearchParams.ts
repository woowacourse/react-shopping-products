import { isIncludedInList } from "@utils/isIncludedInList";

type SmartURLSearchParamsInit = Record<string, unknown> | URLSearchParams;
/**
 * URLSearchParams에 아래 두 가지 기능이 추가된 클래스
 * 1. 유효하지 않은 값을 가진 param을 자동 필터링
 * 2. string이 아닌 값을 string으로 자동 변환
 */
export class SmartURLSearchParams extends URLSearchParams {
  constructor(init?: SmartURLSearchParamsInit) {
    if (!init) return;

    if (init instanceof URLSearchParams) {
      super(init);
    } else {
      super();
      for (const [key, value] of Object.entries(init)) {
        this.set(key, value);
      }
    }
  }

  set(key: string, value: unknown): void {
    if (!isValidParamValue(value)) {
      return super.delete(key);
    }

    try {
      super.set(key, String(value));
    } catch {
      throw new Error(`URLSearchParam의 값으로서 ${value}을 설정할 수 없습니다.`);
    }
  }
}

const INVALID_PARAM_VALUES = [null, undefined, ""];
const isValidParamValue = (value: unknown): boolean => {
  if (Number.isNaN(value)) return false;

  return !isIncludedInList(value, INVALID_PARAM_VALUES);
};
