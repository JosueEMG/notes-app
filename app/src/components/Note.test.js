import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {

    const note = {
        content: 'This is a test',
        important: true
    }

    const component = render(<Note note={note} />)

    component.getByText('make not important')
    // expect(component.container).toHaveTextContent(note.content)
})

test('clicking thie button calls event handler once', () => {
    const note = {
        content: 'This is a test',
        important: true
    }

    const mockHandler = jest.fn()

    const component = render(<Note note={note} toggleImportance={mockHandler} />)

    const button = component.getByText('make not important')
    fireEvent.click(button)

    expect(mockHandler).toHaveBeenCalledTimes(1)
})