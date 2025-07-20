import "./App.css";
import { ApplicationRoot } from "./components/ApplicationRoot";

import ConfigProvider from "./provider/config/ConfigProvider";
import { AuthProvider } from "./provider/auth/AuthProvider";
import { LogProvider } from "./provider/log/LogProvider";
import type { Logger } from "./types/log/Logger";
import { LoggerService } from "./services/log/LoggerService";

const App = () => {
  const createLogger = (): Logger => new LoggerService();

  return (
    <ConfigProvider>
      {() => (
        <ApplicationRoot>
          <LogProvider logger={createLogger()}>
            <AuthProvider></AuthProvider>
          </LogProvider>
        </ApplicationRoot>
      )}
    </ConfigProvider>
  );
};

export default App;
