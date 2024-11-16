 const fetchImages = async () => {
    try {
        // заменила api потому что api из задания не корректно работает и плохо подгружает картинки
        // куратор сказал, что я могу заменить на этот
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data.slice(0, 10);
    } catch (error) {
        console.error("Ошибка при получении изображений:", error);
        return [];
    }
}

const initSlider = async () => {
    const loader = document.getElementById('loader');
    const mainContent = document.querySelector('main');
    loader.style.display = 'flex';
    mainContent.style.display = 'none';

    try {
        const images = await fetchImages();
        const sliderContent = document.getElementById('sliderContent');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        let currentIndex = 0;

        images.forEach(image => {
            const card = document.createElement('div');
            card.className = 'slider__card';

            const img = document.createElement('img');
            img.src = image.image;
            img.alt = image.title;
            img.className = 'slider__img';

            const title = document.createElement('h3');
            title.innerText = image.title;

            const description = document.createElement('p');
            description.innerText = image.description;

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(description);

            sliderContent.appendChild(card);
        });

        const updateSliderPosition = () => {
            const offset = -currentIndex * 400;
            sliderContent.style.transform = `translateX(${offset}px)`;

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === images.length - 3;
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < images.length - 1) {
                currentIndex++;
                updateSliderPosition();
            }
        });


        let touchStartX = 0;
        let touchEndX = 0;

        sliderContent.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        sliderContent.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        });

        const handleSwipeGesture = () => {
            if (touchEndX < touchStartX && currentIndex < images.length - 1) {
                currentIndex++;
                updateSliderPosition();
            }
            if (touchEndX > touchStartX && currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        }

        updateSliderPosition();

    } catch (error) {
        console.error("Ошибка при инициализации слайдера:", error);
    } finally {
        const loader = document.getElementById('loader');
        loader.style.display = 'none';
        const mainContent = document.querySelector('main');
        mainContent.style.display = 'block';
    }
}

initSlider()