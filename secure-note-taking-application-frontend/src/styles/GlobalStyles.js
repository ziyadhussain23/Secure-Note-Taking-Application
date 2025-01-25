import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
        background-color: ${props => props.theme.colors.light};
        color: ${props => props.theme.colors.text};
        line-height: 1.5;
    }

    h1, h2, h3, h4, h5, h6 {
        color: ${props => props.theme.colors.dark};
        margin-bottom: ${props => props.theme.spacing.md};
        font-weight: 500;
    }

    a {
        color: ${props => props.theme.colors.primary};
        text-decoration: none;
        transition: ${props => props.theme.transition};

        &:hover {
            color: ${props => props.theme.colors.secondary};
        }
    }

    button {
        cursor: pointer;
    }
`;