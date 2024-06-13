"use-client";

import "@rollout/connect-react/default.css";

import {
  RolloutConnectProvider,
  AutomationsManager,
} from "@rollout/connect-react";

export function Integrations() {
  const userId = "testUserId"; // Replace with a real user ID

  const fetchToken = async () => {
    const response = await fetch(`/rollout-token?userId=${userId}`);
    const data = await response.json();
    return data.token;
  };

  return (
    <>
      <RolloutConnectProvider
        token={fetchToken}
        apiBaseUrl="http://localhost:3300/api"
      >
        <AutomationsManager />
      </RolloutConnectProvider>
    </>
  );
}
