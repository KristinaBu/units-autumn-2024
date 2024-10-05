import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainPage } from './MainPage';
import { useProducts } from '../../hooks';
import { Product } from '../../types';

const mockProducts: Product[] = [
    {
        id: 1,
        name: 'p1',
        description: 'd1',
        price: 1,
        imgUrl: '1',
        category: 'Одежда',
    },
    {
        id: 2,
        name: 'p2',
        description: 'd2',
        price: 2,
        imgUrl: '2',
        category: 'Для дома',
    },
    {
        id: 3,
        name: 'p3',
        description: 'd3',
        price: 3,
        imgUrl: '3',
        category: 'Электроника',
    },
];

jest.mock('../../hooks');

describe('MainPage test', () => {
    beforeEach(() => {
        (useProducts as jest.Mock).mockReturnValue(mockProducts);
    });

    it('should render correctly', () => {
        const rendered = render(<MainPage />);
        expect(rendered.asFragment()).toMatchSnapshot();
    });
    it('should render ProductCard for home', () => {
        const rendered = render(<MainPage />);
        expect(rendered.getByText('p2')).toBeInTheDocument();
        expect(rendered.getByText('d2')).toBeInTheDocument();
        expect(rendered.getByText('2 ₽')).toBeInTheDocument();
        // возвращает массив элементов с текстом 'Для дома'
        expect(rendered.getAllByText('Для дома')[0]).toBeInTheDocument();
        // getByAltText для изображения
        expect(rendered.getByAltText('p2')).toBeInTheDocument();
    });

    it('should render ProductCard for clothes category', () => {
        const rendered = render(<MainPage />);
        expect(rendered.getByText('p1')).toBeInTheDocument();
        expect(rendered.getByText('d1')).toBeInTheDocument();
        expect(rendered.getByText('1 ₽')).toBeInTheDocument();
        expect(rendered.getAllByText('Одежда')[0]).toBeInTheDocument();
        expect(rendered.getByAltText('p1')).toBeInTheDocument();
    });

    it('should render ProductCard for electronics category', () => {
        const rendered = render(<MainPage />);
        expect(rendered.getByText('p3')).toBeInTheDocument();
        expect(rendered.getByText('d3')).toBeInTheDocument();
        expect(rendered.getByText('3 ₽')).toBeInTheDocument();
        expect(rendered.getAllByText('Электроника')[0]).toBeInTheDocument();
        expect(rendered.getByAltText('p3')).toBeInTheDocument();
    });
});
