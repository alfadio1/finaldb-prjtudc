import styled from "styled-components";

export const GoogleButton = styled.button`
  display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    
    svg {
        margin-right: 10px;
        font-size: 20px;
  }
`;

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #f0f4f7, #d9e2ec);
`;

export const AuthCard = styled.div`
  width: 400px;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// export const Tab = styled.div`
//   cursor: pointer;
//   padding: 10px 20px;
//   font-weight: bold;
//   font-size: 16px;
//   color: ${({ isActive }) => (isActive ? "#fff" : "#555")};
//   background: ${({ isActive }) => (isActive ? "#007bff" : "transparent")};
//   border-radius: 8px;
//   margin: 0 10px;
//   transition: background 0.3s, color 0.3s;

//   &:hover {
//     background: ${({ isActive }) => (isActive ? "#0056b3" : "#e2e6ea")};
//   }
// `;

export const Tab = styled.div`
    cursor: pointer;
    padding: 10px 20px;
    font-weight: bold;
    font-size: 16px;
    color: ${({ $isActive }) => ($isActive ? "#fff" : "#555")};
    background: ${({ $isActive }) => ($isActive ? "#007bff" : "transparent")};

    &:hover {
    background: ${({ isActive }) => (isActive ? "#0056b3" : "#e2e6ea")};
  }
`;


export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }
`;


export const Button = styled.button`
  width: 100%;
    padding: 10px;
    margin: 10px 0;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background: #0056b3;
  }
`;
