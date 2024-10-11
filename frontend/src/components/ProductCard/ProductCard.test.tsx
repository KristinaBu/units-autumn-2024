import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard';
import { getPrice } from '../../utils';
import { mockProducts } from './mockProduct';

jest.mock('../../utils/getPrice');

describe('ProductCard test', () => {
    beforeEach(() => {
        (getPrice as jest.Mock).mockImplementation(
            (value: number) => `${value} ₽`
        );
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        const rendered = render(<ProductCard {...mockProducts[0]} />);
        expect(rendered.asFragment()).toMatchSnapshot();
    });

    it('should display product details correctly', () => {
        const rendered = render(<ProductCard {...mockProducts[0]} />);
        expect(rendered.getByText(mockProducts[0].name)).toBeInTheDocument();
        expect(
            rendered.getByText(mockProducts[0].description)
        ).toBeInTheDocument();
        expect(
            rendered.getByText(getPrice(mockProducts[0].price))
        ).toBeInTheDocument();
        expect(
            rendered.getByText(mockProducts[0].category)
        ).toBeInTheDocument();
        expect(rendered.getByAltText(mockProducts[0].name)).toBeInTheDocument();
    });
    // точная проверка: ищется элемент и в нем ищется совпадение
    it('should display product name correctly', () => {
        const rendered = render(<ProductCard {...mockProducts[0]} />);
        const nameElement = rendered.getByRole('heading', {
            name: mockProducts[0].name,
        });
        expect(nameElement).toBeInTheDocument();
    });
});
