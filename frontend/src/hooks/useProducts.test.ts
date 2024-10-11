import { renderHook } from '@testing-library/react';
import { useProducts } from './useProducts';
import { mockProducts } from '../components/ProductCard/mockProduct';

jest.mock('./useProducts', () => ({
    useProducts: jest.fn(),
}));

describe('useProducts test', () => {
    beforeEach(() => {
        (useProducts as jest.Mock).mockReturnValue(mockProducts);
    });

    it('should return products with correct fields', () => {
        const { result } = renderHook(() => useProducts());
        expect(result.current).toEqual(mockProducts);
    });
});
