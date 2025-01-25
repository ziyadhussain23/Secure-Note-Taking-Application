import React from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavigationBar from './components/Navigation/NavigationBar';
import AppRoutes from './components/Routes/AppRoutes';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

const AppContainer = styled.div`
    min-height: 100vh;
    background: rgba(30, 41, 59, 0.95);
    
`;



const MainContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    <AppContainer>
                        <NavigationBar />
                        <MainContent>
                            <AppRoutes />
                        </MainContent>
                        <ToastContainer />
                    </AppContainer>
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;