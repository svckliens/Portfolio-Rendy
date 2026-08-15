import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px 0px -50px 0px',
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [options.threshold, options.rootMargin]);

    return ref;
}

export function useMultiScrollReveal(count, activeFilter = null, options = {}) {
    const refs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px 0px -50px 0px',
            }
        );

        refs.current.forEach((el) => {
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= window.innerHeight + 100 && rect.bottom >= -100) {
                    el.classList.add('revealed');
                } else {
                    observer.observe(el);
                }
            }
        });

        return () => observer.disconnect();
    }, [count, activeFilter, options.threshold, options.rootMargin]);

    return (index) => (el) => {
        refs.current[index] = el;
    };
}
