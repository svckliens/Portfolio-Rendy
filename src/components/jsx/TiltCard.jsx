import { useState, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import '../css/TiltCard.css';

const TiltCard = forwardRef(function TiltCard(
    {
        children,
        className = '',
        maxTilt = 8,
        glare = true,
        scale = 1.02,
        style = {},
        ...rest
    },
    ref
) {
    const cardRef = useRef(null);
    useImperativeHandle(ref, () => cardRef.current);
    const [tiltStyle, setTiltStyle] = useState({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
    });
    const [glareStyle, setGlareStyle] = useState({
        opacity: 0,
        x: 50,
        y: 50,
    });

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Position relative to card center (-0.5 to 0.5)
        const mouseX = (e.clientX - rect.left) / width - 0.5;
        const mouseY = (e.clientY - rect.top) / height - 0.5;

        // RotateX is inverted: moving mouse down tilts card down
        const rotateX = -mouseY * maxTilt * 2;
        const rotateY = mouseX * maxTilt * 2;

        setTiltStyle({
            transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
            transition: 'transform 0.1s ease-out',
        });

        if (glare) {
            setGlareStyle({
                opacity: 0.35,
                x: ((e.clientX - rect.left) / width) * 100,
                y: ((e.clientY - rect.top) / height) * 100,
            });
        }
    }, [maxTilt, glare, scale]);

    const handleMouseLeave = useCallback(() => {
        setTiltStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        });
        if (glare) {
            setGlareStyle((prev) => ({
                ...prev,
                opacity: 0,
            }));
        }
    }, [glare]);

    return (
        <div
            ref={cardRef}
            className={`tilt-card-wrapper ${className}`}
            style={{ ...style, ...tiltStyle }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...rest}
        >
            {children}
            {glare && (
                <div
                    className="tilt-card-glare"
                    style={{
                        opacity: glareStyle.opacity,
                        background: `radial-gradient(circle 320px at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.25), transparent 70%)`,
                    }}
                    aria-hidden="true"
                />
            )}
        </div>
    );
});

export default TiltCard;
