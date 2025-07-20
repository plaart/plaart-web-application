import "./App.css";
import { ApplicationRoot } from "./components/ApplicationRoot";

import ConfigProvider from "./provider/config/ConfigProvider";
import { AuthProvider } from "./provider/auth/AuthProvider";

const App = () => {
  return (
    <ConfigProvider>
      {() => (
        <ApplicationRoot>
          <AuthProvider>
          </AuthProvider>
        </ApplicationRoot>
      )}
    </ConfigProvider>
  );
};

export default App;
