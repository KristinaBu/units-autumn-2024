import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainPage } from './MainPage';
import { useProducts } from '../../hooks';
import { getPrice } from '../../utils';
import { mockProducts } from '../../components/ProductCard/mockProduct';

jest.mock('../../hooks');
jest.mock('../../utils/getPrice');

describe('MainPage test', () => {
    beforeEach(() => {
        (useProducts as jest.Mock).mockReturnValue(mockProducts);
        (getPrice as jest.Mock).mockImplementation(
            (value: number) => `${value} ₽`
        );
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        const rendered = render(<MainPage />);
        expect(rendered.asFragment()).toMatchSnapshot();
    });

    test.each(mockProducts)('should render ProductCard for %s', (product) => {
        const rendered = render(<MainPage />);
        expect(rendered.getByText(product.name)).toBeInTheDocument();
        expect(rendered.getByText(product.description)).toBeInTheDocument();
        expect(rendered.getByText(getPrice(product.price))).toBeInTheDocument();
        expect(rendered.getAllByText(product.category)[0]).toBeInTheDocument();
        expect(rendered.getByAltText(product.name)).toBeInTheDocument();
    });

    it('should click on category and show all products on first click', () => {
        const rendered = render(<MainPage />);
        const categories = rendered.getAllByText('Одежда');
        // вызов клика на первом элементе массива - 'Одежда'
        fireEvent.click(categories[0]);
        expect(rendered.getByText('p1')).toBeInTheDocument();
        // проверка, что нет остальных элементов
        expect(rendered.queryByText('p2')).not.toBeInTheDocument();
        expect(rendered.queryByText('p3')).not.toBeInTheDocument();
    });

    it('should click on category and show all products on second click', () => {
        const rendered = render(<MainPage />);
        const categories = rendered.getAllByText('Одежда');
        //,2 клика
        fireEvent.click(categories[0]);
        fireEvent.click(categories[0]);
        expect(rendered.getByText('p1')).toBeInTheDocument();
        expect(rendered.getByText('p2')).toBeInTheDocument();
        expect(rendered.getByText('p3')).toBeInTheDocument();
    });
    // точная проверка: ищется элемент и в нем ищется совпадение
    it('should display product name correctly', () => {
        const rendered = render(<MainPage />);
        const nameElement = rendered.getByRole('heading', {
            name: mockProducts[0].name,
        });
        expect(nameElement).toBeInTheDocument();
    });
});
