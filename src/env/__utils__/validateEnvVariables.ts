interface EnvVariable {
  key: string;
  value: string | undefined;
}

export function validateEnvVariables(envVariables: EnvVariable[]) {
  envVariables.forEach(({ key, value }) => {
    if (!value) {
      throw new Error(`${key}가 정의되지 않았습니다.`);
    }
  });
}
