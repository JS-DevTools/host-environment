declare module "@qawolf/ci-info" {
  interface CIInfo {
    isCI: boolean;
    isPR: boolean;
    name: string;
    CODEBUILD: boolean | undefined;
    APPVEYOR: boolean | undefined;
    AZURE_PIPELINES: boolean | undefined;
    BAMBOO: boolean | undefined;
    BITBUCKET: boolean | undefined;
    BITRISE: boolean | undefined;
    BUDDY: boolean | undefined;
    BUILDKITE: boolean | undefined;
    CIRCLE: boolean | undefined;
    CIRRUS: boolean | undefined;
    CODESHIP: boolean | undefined;
    DRONE: boolean | undefined;
    DSARI: boolean | undefined;
    GITHUB_ACTIONS: boolean | undefined;
    GITLAB: boolean | undefined;
    GOCD: boolean | undefined;
    HUDSON: boolean | undefined;
    JENKINS: boolean | undefined;
    MAGNUM: boolean | undefined;
    NETLIFY: boolean | undefined;
    NEVERCODE: boolean | undefined;
    SAIL: boolean | undefined;
    SEMAPHORE: boolean | undefined;
    SHIPPABLE: boolean | undefined;
    SOLANO: boolean | undefined;
    STRIDER: boolean | undefined;
    TASKCLUSTER: boolean | undefined;
    TEAMCITY: boolean | undefined;
    TRAVIS: boolean | undefined;
  }

  const ci: CIInfo;
  export = ci;
}
