import { useCurrentTime } from './useCurrentTime';
import { renderHook } from '@testing-library/react';

describe('Current time test', () => {
    it('should render current time', () => {
        jest.useFakeTimers();
        const timeString = '2021-12-12T12:00:00';
        jest.setSystemTime(new Date(timeString).getTime());
        const { result } = renderHook(() => useCurrentTime());
        const time = new Date(timeString).toLocaleTimeString('ru-RU');
        expect(result.current).toBe(time);
    });

    it('Clear interval', () => {
        jest.useFakeTimers();
        const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
        const { unmount } = renderHook(() => useCurrentTime());
        unmount();
        // проверка, что функция была вызвана
        expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
        clearIntervalSpy.mockRestore();
    });
});
