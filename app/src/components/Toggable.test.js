import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Toggable from './Toggable'
import i18n from '../i18n/index'

describe('<Toggable />', () => {
    const buttonLabel = 'show'
    let component

    beforeEach(() => {
        component = render(
            <Toggable buttonLabel={buttonLabel}>
                <div className="testDiv">testDivContent</div>
            </Toggable>
        )
    })

    test('renders its childrens', () => {
        component.getByText('testDivContent')
    })

    test('renders its childrens but they are not visible', () => {
        const el = component.getByText('testDivContent')
        expect(el.parentNode).toHaveStyle('display: none')
    })

    test('after clicking its children must be shown', () => {
        const button = component.getByText(buttonLabel)
        fireEvent.click(button)

        const el = component.getByText('testDivContent')
        expect(el.parentNode).not.toHaveStyle('display: none')
    })

    test('toggle content can be closed', () => {
        const button = component.getByText(buttonLabel)
        fireEvent.click(button)

        const el = component.getByText('testDivContent')
        expect(el.parentNode).not.toHaveStyle('display: none')

        const cancelButton = component.getByText(i18n.TOGGABLE.CANCEL_BUTTON)
        fireEvent.click(cancelButton)

        expect(el.parentNode).toHaveStyle('display: none')
    })
})