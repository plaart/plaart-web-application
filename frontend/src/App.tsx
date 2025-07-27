import { BrowserRouter as Router } from "react-router-dom";
import { ApplicationRoot } from "./components/ApplicationRoot";
import ConfigProvider from "./provider/config/ConfigProvider";
import { AuthProvider } from "./provider/auth/AuthProvider";
import { LogProvider } from "./provider/log/LogProvider";
import type { Logger } from "./types/log/Logger";
import { LoggerService } from "./services/log/LoggerService";
import IntlProvider from "./provider/intl/IntlProvider";
import AppRoutes from "./modules";
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
              <Router>
                <AuthProvider>
                  <IntlProvider>
                    <AppRoutes />
                    <NotificationToaster />
                  </IntlProvider>
                </AuthProvider>
              </Router>
            </ComponentEventsProvider>
          </LogProvider>
        </ApplicationRoot>
      )}
    </ConfigProvider>
  );
};

export default App;
