import { useState } from 'hono/jsx';
import { jstDatetime } from '../utils/jstDatetime';

type Data = {
    url: string;
    comment: string;
    createdAt: string;
};

type Props = {
    slides: Data[];
};

export const Carousel = (props: Props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [...props.slides].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    let touchStartX = 0;
    let touchEndX = 0;

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const handleTouchStart = (e: TouchEvent) => {
        touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
        touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) {
            handleNext();
        } else if (touchEndX - touchStartX > 50) {
            handlePrev();
        }
    };

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div
                className="overflow-hidden rounded-lg relative"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`transition-all duration-700 ease-in-out transform ${index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                            }`}
                        style={{
                            position: index === currentSlide ? 'relative' : 'absolute', 
                        }}
                    >
                        <img src={slide.url} alt={`picture of plant | ${slide.comment}`} className="w-full" />

                        <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>

                        <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2 rounded-tr-lg z-40">
                            <p className="text-lg font-semibold">{jstDatetime(slide.createdAt, 'YYYY-MM-DD')}</p>
                        </div>

                        <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-4 rounded-b-lg z-40">
                            <p className="text-xl font-semibold">{slide.comment}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ページ送りボタン */}
            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hidden md:block"
            >
                &lt;
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hidden md:block"
            >
                &gt;
            </button>

            <div className="flex justify-center mt-4 space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'}`}
                    ></button>
                ))}
            </div>

            <p className="text-center mt-2 text-gray-700">
                {currentSlide + 1} / {slides.length}
            </p>
        </div>
    );
};
