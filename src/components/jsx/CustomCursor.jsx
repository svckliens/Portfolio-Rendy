import { useEffect, useState, useRef } from 'react';
import '../css/CustomCursor.css';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const outlineRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        let isTouchDevice = false;
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            isTouchDevice = true;
        }

        if (isTouchDevice) {
            // Hide cursors if it's a touch device
            if (dotRef.current) dotRef.current.style.display = 'none';
            if (outlineRef.current) outlineRef.current.style.display = 'none';
            return;
        }

        const moveCursor = (e) => {
            requestAnimationFrame(() => {
                if (dotRef.current && outlineRef.current) {
                    dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
                    outlineRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
                }
            });
        };

        const handleMouseOver = (e) => {
            const isClickable = 
                e.target.tagName.toLowerCase() === 'a' || 
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.classList.contains('glass-card') ||
                e.target.closest('.glass-card');
                
            if (isClickable) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <div 
                ref={dotRef}
                className={`custom-cursor-dot ${isHovering ? 'hover' : ''}`}
                style={{ left: 0, top: 0, transform: 'translate3d(-100px, -100px, 0)' }}
            />
            <div 
                ref={outlineRef}
                className={`custom-cursor-outline ${isHovering ? 'hover' : ''}`}
                style={{ 
                    left: 0, 
                    top: 0,
                    transform: 'translate3d(-100px, -100px, 0)',
                    transition: 'width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s'
                }}
            />
        </>
    );
}

