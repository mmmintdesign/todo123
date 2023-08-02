import matchers from "@testing-library/jest-dom/matchers";
import App from "./App";
import { render, screen, fireEvent } from "@testing-library/react";

expect.extend(matchers);

test('add todo',() => {
    render(<App/>);
  
    const desc = screen.getByPlaceholderText('Description');
    fireEvent.change(desc, { target: { value: 'Go to coffee' } });
    const date = screen.getByPlaceholderText('Date');
    fireEvent.change(date, { target: { value: '29.12.2023' } });
    const status = screen.getByPlaceholderText('Status');
    fireEvent.change(status, { target: { value: 'Open' } });
    const button = screen.getByText('Add');
    fireEvent.click(button);
    
    const buttonClear = screen.getByText('Clear');
    fireEvent.click(buttonClear);
  
    const table = screen.getByRole('table');
    expect(table).not.toHaveTextContent('Go to coffee');
  })