import { ApplicationRoot } from "./components/ApplicationRoot";
import ConfigProvider from "./provider/config/ConfigProvider";
import { AuthProvider } from "./provider/auth/AuthProvider";
import { LogProvider } from "./provider/log/LogProvider";
import type { Logger } from "./types/log/Logger";
import { LoggerService } from "./services/log/LoggerService";
import IntlProvider from "./provider/intl/IntlProvider";
import AppRouter from "./modules";
import NotificationToaster from "./notification";
import ComponentEventsProvider from "./provider/event/ComponentEventsProvider";

const App = () => {
  const createLogger = (): Logger => new LoggerService();

  return (
    <ConfigProvider>
      {() => (
        <ApplicationRoot>
          <LogProvider logger={createLogger()}>
            <ComponentEventsProvider>
              <AuthProvider>
                <IntlProvider>
                  <AppRouter />
                  <NotificationToaster />
                </IntlProvider>
              </AuthProvider>
            </ComponentEventsProvider>
          </LogProvider>
        </ApplicationRoot>
      )}
    </ConfigProvider>
  );
};

export default App;
