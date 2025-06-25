const calculateAge = () => {
    const birthDate = new Date(2006, 5, 26);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    document.getElementById('ageCounter').textContent = `Тебе уже ${age} лет!`;
};
let currentSlide = 0;
const slides = document.querySelectorAll('.gallery-slide');
const dots = document.getElementById('galleryNav');
const showSlide = (n) => {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[n].classList.add('active');
    dots.innerHTML = '';
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.className = `gallery-dot ${i === n ? 'active' : ''}`;
        dot.onclick = () => showSlide(i);
        dots.appendChild(dot);
    }
};
const changeSlide = (n) => {
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    showSlide(currentSlide);
};
setInterval(() => changeSlide(1), 3000);
const playVideo = (element) => {
    const video = element.querySelector('video');
    const icon = element.querySelector('.fa-play-circle');
    if (video.paused) {
        video.play();
        icon.className = 'fas fa-pause-circle';
    } else {
        video.pause();
        icon.className = 'fas fa-play-circle';
    }
};
const showFact = (element) => {
    element.style.transform = 'scale(1.1) rotate(5deg)';
    setTimeout(() => {
        element.style.transform = 'translateY(-10px)';
    }, 200);
};
const showWish = (element) => {
    element.style.background = 'rgba(255, 255, 255, 0.2)';
    element.style.borderColor = '#16a34a';
    setTimeout(() => {
        element.style.background = 'rgba(255, 255, 255, 0.1)';
        element.style.borderColor = 'transparent';
    }, 1000);
};
const randomWishes = [
    "Пусть все твои мечты сбудутся! 🌟",
    "Желаю тебе бесконечного счастья! 💖",
    "Пусть каждый день будет особенным! ✨",
    "Желаю тебе верных друзей и любящей семьи! 👨‍👩‍👧‍👦",
    "Пусть удача всегда будет на твоей стороне! 🍀",
    "Желаю тебе здоровья, успехов и радости! 🎯",
    "Пусть жизнь будет полна приключений! 🚀",
    "Желаю тебе исполнения всех желаний! 💫"
];
const showRandomWish = () => {
    const wish = randomWishes[Math.floor(Math.random() * randomWishes.length)];
    alert(wish);
};
const showSpecialMessage = () => {
    document.getElementById('specialModal').style.display = 'block';
};
const closeModal = () => {
    document.getElementById('specialModal').style.display = 'none';
};
const createConfetti = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffbe0b', '#fb5607', '#8338ec', '#f093fb'];
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '1000';
        confetti.style.borderRadius = '50%';
        document.body.appendChild(confetti);
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        });
        animation.onfinish = () => confetti.remove();
    }
};
const createFloatingElements = () => {
    const elements = ['🎂', '🎈', '🎉', '🎊', '🎁', '⭐', '💖', '🌟'];
    const container = document.getElementById('floatingElements');
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + 'vw';
        element.style.top = Math.random() * 100 + 'vh';
        element.style.animationDelay = Math.random() * 6 + 's';
        element.style.animationDuration = (6 + Math.random() * 6) + 's';
        container.appendChild(element);
    }
};
const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
};
window.onclick = (event) => {
    const modal = document.getElementById('specialModal');
    if (event.target === modal) {
        closeModal();
    }
};
document.addEventListener('DOMContentLoaded', () => {
    calculateAge();
    showSlide(0);
    createFloatingElements();
    setInterval(calculateAge, 1000);
    // Welcome overlay и поэтапное появление
    const introOverlay = document.getElementById('introOverlay');
    const mainSiteContent = document.getElementById('mainSiteContent');
    const heroContent = document.getElementById('heroContent');
    const siteBody = document.getElementById('siteBody');
    let introStep = 0;

    function showHero() {
        introOverlay.classList.add('hide');
        mainSiteContent.classList.add('show');
        document.body.classList.add('noscroll');
        introStep = 1;
    }
    function showSite() {
        siteBody.classList.add('show');
        document.body.classList.remove('noscroll');
        introStep = 2;
    }

    function handleIntroAction() {
        if (introStep === 0) {
            showHero();
        } else if (introStep === 1) {
            showSite();
        }
    }

    // Сначала только overlay, всё остальное скрыто, скролл заблокирован
    introOverlay.classList.remove('hide');
    mainSiteContent.classList.remove('show');
    siteBody.classList.remove('show');
    document.body.classList.add('noscroll');
    introStep = 0;

    // Первый клик или скролл — показать hero
    introOverlay.addEventListener('wheel', handleIntroAction, { once: true });
    introOverlay.addEventListener('touchstart', handleIntroAction, { once: true });
    introOverlay.addEventListener('click', handleIntroAction, { once: true });

    // Второй клик или скролл — показать сайт
    window.addEventListener('wheel', function onSecondScroll(e) {
        if (introStep === 1) {
            showSite();
            window.removeEventListener('wheel', onSecondScroll);
        }
    });
    window.addEventListener('touchstart', function onSecondTouch(e) {
        if (introStep === 1) {
            showSite();
            window.removeEventListener('touchstart', onSecondTouch);
        }
    });
    window.addEventListener('keydown', function onSecondKey(e) {
        if (introStep === 1 && (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ')) {
            showSite();
            window.removeEventListener('keydown', onSecondKey);
        }
    });

    
    let gallerySlides = [];
    let currentPhotoIdx = 0;

    
    gallerySlides = Array.from(document.querySelectorAll('.gallery-slide'));
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('photoModalImg');
    const modalClose = document.getElementById('photoModalClose');
    const modalPrev = document.getElementById('photoModalPrev');
    const modalNext = document.getElementById('photoModalNext');

    function openPhotoModal(idx) {
        currentPhotoIdx = idx;
        modalImg.src = gallerySlides[idx].src;
        modal.classList.add('active');
        document.body.classList.add('noscroll');
    }
    function closePhotoModal() {
        modal.classList.remove('active');
        document.body.classList.remove('noscroll');
    }
    function showPrevPhoto() {
        currentPhotoIdx = (currentPhotoIdx - 1 + gallerySlides.length) % gallerySlides.length;
        modalImg.src = gallerySlides[currentPhotoIdx].src;
    }
    function showNextPhoto() {
        currentPhotoIdx = (currentPhotoIdx + 1) % gallerySlides.length;
        modalImg.src = gallerySlides[currentPhotoIdx].src;
    }

    gallerySlides.forEach((img, idx) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openPhotoModal(idx));
    });
    modalClose.addEventListener('click', closePhotoModal);
    modalPrev.addEventListener('click', showPrevPhoto);
    modalNext.addEventListener('click', showNextPhoto);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closePhotoModal();
    });
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closePhotoModal();
        if (e.key === 'ArrowLeft') showPrevPhoto();
        if (e.key === 'ArrowRight') showNextPhoto();
    });
});
let foundNikitae = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
};
const findNikita = (element, id) => {
    if (!foundNikitae[id]) {
        foundNikitae[id] = true;
        element.classList.add('found');
        element.style.transform = 'scale(1.5) rotate(360deg)';
        setTimeout(() => {
            element.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
        showFoundNotification(id);
        updateQuestProgress();
        checkQuestCompletion();
    }
};
const showFoundNotification = (id) => {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #22c55e, #16a34a);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.5s ease;
        max-width: 300px;
    `;
    notification.innerHTML = `
        <h3>🎉 Найдена картинка ${id}!</h3>
        <p>Отлично! Осталось найти еще ${7 - Object.values(foundNikitae).filter(Boolean).length} картинок</p>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
};
const updateQuestProgress = () => {
    const items = document.querySelectorAll('.quest-item');
    const foundCount = Object.values(foundNikitae).filter(Boolean).length;
    items.forEach((item, index) => {
        const id = index + 1;
        const checkbox = item.querySelector('.quest-checkbox');
        if (foundNikitae[id]) {
            item.classList.add('completed');
            item.classList.remove('pending');
            checkbox.textContent = '✓';
        } else {
            item.classList.add('pending');
            item.classList.remove('completed');
            checkbox.textContent = id;
        }
    });
};
const checkQuestCompletion = () => {
    const foundCount = Object.values(foundNikitae).filter(Boolean).length;
    if (foundCount >= 7) {
        setTimeout(() => {
            const qrButton = document.getElementById('qrButton');
            qrButton.style.display = 'block';
            qrButton.style.animation = 'pulse 1s infinite';
            showQuestCompletion();
        }, 1000);
    }
};
const showQuestProgress = () => {
    const questDiv = document.getElementById('questProgress');
    questDiv.style.display = questDiv.style.display === 'block' ? 'none' : 'block';
};
const showQuestCompletion = () => {
    setTimeout(() => {
        alert('🎉 Поздравляем! Ты нашел все картинки Никиты! 🎉\n\nТеперь можешь получить свой особый подарок!');
    }, 1000);
};
const showQRCode = () => {
    alert('🎁 QR-код с подарком будет здесь!\n\nПока что это заглушка.');
};
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

const testimonials = [
  {
    name: 'Сергей',
    avatar: 'assets/sergey_photo.jpg',
    text: `Никита хороший друг и товарищ  который имеет кучу своих + хотя некоторые можно отнести и к минусом\nОн может тебе час затирать про инвестиции что цены на кейсы подымутся но уже через пар дней он дешевеет но Никита ищет в этом СВОи плюсы. Он идеален если вы хотите проиграть в игру в кс ведь он один из главный охранников лоутаба сравниться с ним может только стас\nВсегда готов помочь в сложную минуту но перед этим обязательно постебёт тебя.\nДепать с Никитой куда-либо фатальная ошибка,ему как-будто дают проценты за потраченные тобой деньги, если ты подумаешь остановиться не делать додеп то он тебя обязательно отговорит: "Давай щас додеп, потом ласт додеп, потом мега ласт додеп"-Никита.\nНеотъемлым плюсом Никиты является его завозы, иногда он может такое выдать что либо тебе будет стыдно, либо будешь задыхаться от смеха(Стас).\nЛично для меня самым главным его аспектом является количество времени за компом он готов сутками играть лишь бы его базу не зарейдили.\nНу и в общем Никита супер мега крутой Гига-чад с которым всегда весело да и выручит всегда, и если бы это всё было неправдой я бы с ним не дружил!`
  },
  {
    name: 'Вика',
    avatar: 'assets/Vika_photo.jpg',
    text: `Никита – универсальный комбо-помощник с вечным метаболизмом\nЕсли вам нужен человек, который может:  \nсъесть всё, включая ваши остатки ужина, и остаться в форме (черная магия или украденный у богов обмен веществ – неизвестно);  \nпровести 90% жизни в священной триаде "компьютер – кухня – туалет" (остальные 10% – сон, но там он тоже думает о еде);  \nвыручить в любой ситуации – от дистанционного нашептывания билета на экзамене до внезапной доставки вкусняшки в нашу комнату (правда, есть риск, что половина исчезнет по дороге);  \nбыть эталоном "удобного" роста – не загораживает солнце, но может достать верхнюю полку (если мотивировать едой);  \nразрядить обстановку шуткой (иногда даже уместной!) –  \n…то вам точно нужен мой брат.  \nидеален для:  \n- совместного выживания в сессию;  \n- тестирования "несъедобных" блюд;  \n- наблюдения за феноменом "вечно голодного, но стройного человека".  \nфирменная фишка:\n"сейчас помогу... сорян, катка началась!" – но потом действительно помогает (если не забудет).`
  },
  {
    name: 'Егор',
    avatar: 'assets/egor_photo.jpg',
    text: `Так, скажу, что приобрел я этого человека не так давно, но наверно достаточно, чтобы понять что к чему, во-первых, мне сначала казалось, что он какой-то фрик и вообще с ним нормально обащаться не получится, но после одного странного момента, я с ним случайно познакомился, и, как оказывается, не всё так плохо как я думал, Никитузик может много рандомных фразочек вкидывать, говорить всякую дичь, наверно любит жестко и шутя издеваться над некоторыми личностями, но пока я знаю только одну, над которой он так делает, Никитка всегда за любой движ, ему вообще пофиг что будет, главное учавствовать в этом, он и погулять и, самое главное, на шашлыки сходить может, ему преложи пешком через границу перейти дак он согласиться, плюс он ещё и игроман, но не задрот.\nКороче, общее заключение о том, что имеем после приобретения этого человека:\nПлюсы:\n+есть о чем говорить \n+шутки\n+угар\n+натсроение \n+вайб\n+движ \n+игроман\n+не задрот\n+друг\n+ещё что-то\nМинусы: отсутсвуют (лень искать)\nИтог: 10/10. Остался доволен`
  },
  {
    name: 'Стас',
    avatar: 'assets/Stas_photo.jpg',
    text: `Хочу сказать пару слов о человеке, которого могу называть не просто другом — а близким по духу, как родной. Никита — тот самый человек, с кем наше знакомство когда-то началось с обучения в одной школе, общих увлечений и вечерних разговоров в … и превратилось в настоящую крепкую дружбу, проверенную временем.\nОн всегда рядом, особенно тогда, когда это действительно важно. В моменты, когда кажется, что весь мир идёт наперекосяк — он выслушает, поймёт, не осудит. Умение терпеть нытьё — с поводом и без — уже заслуживает медали, а Никите можно давать целую коллекцию.\nС ним просто быть собой. Без необходимости подстраиваться или что-то доказывать. И я искренне благодарен, что такой человек есть в моей жизни.\nЕсли бы дружба оценивалась по шкале, Никита — безусловная десятка с бонусами. Потому что такие люди — редкость. А если повезло встретить — нужно беречь, как самое ценное.`
  }
];

let testimonialIndex = 0;

function renderTestimonial(index) {
  const t = testimonials[index];
  const slider = document.getElementById('testimonial-slider');
  slider.innerHTML = `
    <img src="${t.avatar}" class="testimonial-avatar" alt="${t.name}">
    <div class="testimonial-name">${t.name}</div>
    <div class="testimonial-text">${t.text}</div>
    <div class="testimonial-controls">
      <button class="testimonial-arrow" id="testimonial-prev" aria-label="Назад">&#8592;</button>
      <button class="testimonial-arrow" id="testimonial-next" aria-label="Вперёд">&#8594;</button>
    </div>
  `;
  document.getElementById('testimonial-prev').onclick = () => showTestimonial(testimonialIndex - 1);
  document.getElementById('testimonial-next').onclick = () => showTestimonial(testimonialIndex + 1);
  renderTestimonialDots();
}

function renderTestimonialDots() {
  const nav = document.getElementById('testimonial-nav');
  nav.innerHTML = '<div class="testimonial-dots">' + testimonials.map((_, i) =>
    `<div class="testimonial-dot${i === testimonialIndex ? ' active' : ''}" data-idx="${i}"></div>`
  ).join('') + '</div>';
  nav.querySelectorAll('.testimonial-dot').forEach(dot => {
    dot.onclick = () => showTestimonial(Number(dot.dataset.idx));
  });
}

function showTestimonial(idx) {
  testimonialIndex = (idx + testimonials.length) % testimonials.length;
  const slider = document.getElementById('testimonial-slider');
  slider.classList.add('fade-out');
  setTimeout(() => {
    renderTestimonial(testimonialIndex);
    slider.classList.remove('fade-out');
    slider.classList.add('fade-in');
    setTimeout(() => slider.classList.remove('fade-in'), 400);
  }, 350);
}

document.addEventListener('DOMContentLoaded', () => {
  
  renderTestimonial(testimonialIndex);
});


const sliderStyle = document.createElement('style');
sliderStyle.textContent = `
#testimonial-slider.fade-in { animation: fadeInTestimonial 0.4s; }
#testimonial-slider.fade-out { animation: fadeOutTestimonial 0.35s; }
@keyframes fadeInTestimonial { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
@keyframes fadeOutTestimonial { from { opacity: 1; } to { opacity: 0; } }
`;
document.head.appendChild(sliderStyle); 
