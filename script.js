document.addEventListener('DOMContentLoaded', () => {
    const animations = {
        timings: {
            fadeInA: 500,
            moveAndTransform: 1000,
            fadeInB: 1000,
            scaleAndSquare: 1500,
            moveAndShrink: 1000,
            fadeInText: 2000,
            infiniteShapeShift: 4000
        },
        elements: {
            shapeA: document.getElementById('shapeA'),
            shapeB: document.getElementById('shapeB'),
            texts: document.querySelectorAll('.svg-text')
        }
    };

    const startTimes = {
        fadeInA: 0,
        moveAndTransform: animations.timings.fadeInA,
        fadeInB: animations.timings.fadeInA + animations.timings.moveAndTransform,
        scaleAndSquare: animations.timings.fadeInA + animations.timings.moveAndTransform + animations.timings.fadeInB,
        moveAndShrink: animations.timings.fadeInA + animations.timings.moveAndTransform + animations.timings.fadeInB + animations.timings.scaleAndSquare,
        fadeInText: animations.timings.fadeInA + animations.timings.moveAndTransform + animations.timings.fadeInB + animations.timings.scaleAndSquare + animations.timings.moveAndShrink,
        infiniteShapeShift: animations.timings.fadeInA + animations.timings.moveAndTransform + animations.timings.fadeInB + animations.timings.scaleAndSquare + animations.timings.moveAndShrink + animations.timings.fadeInText
    };

    function createAnimationString(steps, infinite = false) {
        const animationString = steps.map(({ keyframe, duration, delay, timing = 'linear' }) =>
            `${keyframe} ${duration}ms ${timing} ${delay}ms forwards`
        ).join(', ');
        return infinite ? `${animationString}, infiniteShapeShift ${animations.timings.infiniteShapeShift}ms ease-in-out ${startTimes.infiniteShapeShift}ms infinite` : animationString;
    }

    animations.elements.shapeA.style.animation = createAnimationString([
        { keyframe: 'fadeIn', duration: animations.timings.fadeInA, delay: startTimes.fadeInA },
        { keyframe: 'moveAndTransform', duration: animations.timings.moveAndTransform, delay: startTimes.moveAndTransform },
        { keyframe: 'moveAndShrink', duration: animations.timings.moveAndShrink, delay: startTimes.moveAndShrink }
    ]);

    animations.elements.shapeB.style.animation = createAnimationString([
        { keyframe: 'fadeIn', duration: animations.timings.fadeInB, delay: startTimes.fadeInB },
        { keyframe: 'scaleAndSquare', duration: animations.timings.scaleAndSquare, delay: startTimes.scaleAndSquare, timing: 'cubic-bezier(0, 0, 0.2, 1)' },
        { keyframe: 'moveAndShrink', duration: animations.timings.moveAndShrink, delay: startTimes.moveAndShrink }
    ], true);

    animations.elements.texts.forEach(text => {
        text.style.animation = createAnimationString([
            { keyframe: 'fadeIn', duration: animations.timings.fadeInText, delay: startTimes.fadeInText, timing: 'ease-in-out' }
        ]);
    });
});