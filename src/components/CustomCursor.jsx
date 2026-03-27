import { useEffect, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        let isTouchDevice = false;
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            isTouchDevice = true;
        }

        if (isTouchDevice) return; // Don't run on mobile/touch

        const moveCursor = (e) => {
            // Use requestAnimationFrame for smoother following
            requestAnimationFrame(() => {
                setPosition({ x: e.clientX, y: e.clientY });
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

    // Don't render on server or initial mount if coords are -100
    if (position.x === -100 && position.y === -100) return null;

    return (
        <>
            <div 
                className={`custom-cursor-dot ${isHovering ? 'hover' : ''}`}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            />
            <div 
                className={`custom-cursor-outline ${isHovering ? 'hover' : ''}`}
                style={{ 
                    left: `${position.x}px`, 
                    top: `${position.y}px`,
                    // Add a tiny delay to the outline for physical drag effect
                    transition: 'width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s'
                }}
            />
        </>
    );
}
