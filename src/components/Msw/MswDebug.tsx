import { useEffect, useState } from "react";
import { URLS } from "../../constants/url";
import { colors, radius } from "../../styles/theme";

interface ResponseData {
  [key: string]: unknown;
}

function MswDebug() {
  const [requestInfo, setRequestInfo] = useState<{
    url: string;
    response: ResponseData | null;
    error?: string;
  } | null>(null);

  useEffect(() => {
    const testMsw = async () => {
      try {
        console.log("Testing MSW with URL:", URLS.PRODUCTS);
        const response = await fetch(URLS.PRODUCTS);
        const data = await response.json();
        console.log("Response data:", data);

        setRequestInfo({
          url: URLS.PRODUCTS.toString(),
          response: data as ResponseData,
        });
      } catch (error) {
        console.error("Error testing MSW:", error);
        setRequestInfo({
          url: URLS.PRODUCTS.toString(),
          response: null,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    };

    testMsw();
  }, []);

  if (!requestInfo) {
    return <div>테스트 요청 중...</div>;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        padding: "10px",
        backgroundColor: colors.gray[50],
        border: `1px solid ${colors.gray[300]}`,
        borderRadius: radius.sm,
        zIndex: 1000,
        maxWidth: "400px",
        maxHeight: "300px",
        overflow: "auto",
        fontSize: "12px",
      }}
    >
      <h3>MSW 디버깅 정보</h3>
      <div>
        <strong>요청 URL:</strong> {requestInfo.url}
      </div>
      {requestInfo.error ? (
        <div style={{ color: colors.error }}>
          <strong>에러:</strong> {requestInfo.error}
        </div>
      ) : (
        <div>
          <strong>응답:</strong>
          <pre>{JSON.stringify(requestInfo.response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
export default MswDebug;
