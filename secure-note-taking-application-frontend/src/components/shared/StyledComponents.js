import styled from 'styled-components';

export const Button = styled.button`
    background: ${props => props.primary 
        ? 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)'
        : props.theme.colors.light};
    color: ${props => props.primary ? 'white' : props.theme.colors.dark};
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: ${props => props.primary 
        ? '0 4px 6px rgba(0, 0, 0, 0.2)'
        : '0 2px 4px rgba(0, 0, 0, 0.1)'};

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${props => props.primary 
            ? '0 6px 8px rgba(0, 0, 0, 0.3)'
            : '0 4px 6px rgba(0, 0, 0, 0.2)'};
    }

    &:active {
        transform: translateY(0);
    }
`;
styled(Button)`
    flex: 1;
    padding: 8px 16px;
    font-size: 0.9rem;
    border-radius: 6px;
    background: ${props => props.variant === 'edit'
    ? '#4CAF50'
    : props.variant === 'delete'
        ? '#f44336'
        : '#2196F3'};
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        filter: brightness(110%);
    }

    &:active {
        transform: translateY(0);
    }
`;
styled(Button)`
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%);
    color: white;
    font-size: 24px;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.1) rotate(90deg);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }
`;
