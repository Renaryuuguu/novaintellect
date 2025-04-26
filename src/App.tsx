import { Chat } from "./components/Chat";
import styled from "@emotion/styled";

const AppContainer = styled.div`
  height: 100vh;
  background-color: #f8f9fa;
`;

function App() {
  return (
    <AppContainer>
      <Chat />
    </AppContainer>
  );
}

export default App;
