import { http, HttpResponse } from "msw";
import dummy from "./dummy.json";

export const handlers = [
  http.get(
    "http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products/{id}",
    () => {
      return HttpResponse.json(dummy);
    }
  ),
];
