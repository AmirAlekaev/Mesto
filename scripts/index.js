///Popup редактирования профиля
const popupProfile = document.querySelector('.popup_profile');                         // Найти popup редактирования профиля
const popupOpenEdit = document.querySelector('.profile__button-edit');                   // Найти кнопку открытия редактирования профиля
const popupFormProfile = popupProfile.querySelector('.popup__form_profile');            // Найти форму popup изменения профиля
const profileName = document.querySelector('.profile-info__name');                     // Найти данные - name на странице
const profileJob = document.querySelector('.profile-info__job');                      // Найти данные - job на странице
const inputName = document.querySelector('.popup__input_type_name');                    // Найти поле ввода - name в форме редактирования профиля
const inputJob = document.querySelector('.popup__input_type_job');                      // Найти поле ввода - job в форме редактирования профиля

//Popup редактирования карточек
const popupPlace = document.querySelector('.popup_place');                             // Найти popup редактирования карточек
const popupOpenAdd = document.querySelector('.profile__button-add');                    // Найти кнопку открытия редактирования карточек
const popupFormPlace = popupPlace.querySelector('.popup__form_place');                  // Найти форму popup изменения карточек
const popupFormTitle = popupPlace.querySelector('.popup__input_type_title');                 // Найти поле ввода - название региона в форме добавления карточки
const popupFormLink = popupPlace.querySelector('.popup__input_type_link');                   // Найти поле ввода - ссылки на фото в форме добавления карточки

//Popup открытия просмотра изображения
const popupImage = document.querySelector('.popup_image');                             // Найти popup открытия просмотра увеличенного изображения
const elementImage = document.querySelector('.popup__img');                             // Найти изображение
const elementTitle = document.querySelector('.popup__name');                            // Найти описание региона

//Кнопка закрытия Popup
const popupCloseList = document.querySelectorAll('.popup__button-close');                   // Найти ВСЕ кнопки закрытия Popup

// Добавление карточек
const cardTemplate = document.querySelector('.template__card').content;                 // Найти шаблон карточки для добавления
const cardOnline = document.querySelector('.elements');                                 // Найти раздел, куда будут добавлятся карточки

//Добавление карточек "из коробки"
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//Функция создания карточки с возможностью выполнить лайк-дизлайк, удаление карточки
const createCard = (cardData) => {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);              // Клонировать содержимое тега template
    const cardElementTitle = cardElement.querySelector('.element__title');                   // Найти в шаблоне заголовок
    const cardElementPhoto = cardElement.querySelector('.element__img');                     // Найти в шаблоне фотографию
    cardElement.querySelector('.element__basket').addEventListener('click', cardDel);         // Найти кнопку закрытия и отследить действие
    cardElement.querySelector('.element__like').addEventListener('click', cardLike);        // Найти кнопку нравится/ненравится и отследить действие
    cardElement.querySelector('.element__img').addEventListener('click', cardPhoto);          // Найти фотографию для открытия и отследить действие
    cardElementTitle.textContent = cardData.name;                                                 // Присвоить значение name заголовку
    cardElementPhoto.src = cardData.link;                                                         // Присвоить значение link ссылке на картинку
    cardElementPhoto.alt = cardData.name;                                                         // Присвоить описание картинке

    return cardElement;                                                                        // Отобразить карточку на странице
};

//Функция открытия просмотра изображения карточки
function cardPhoto(evt) {
    openPopup(popupImage);
    elementImage.src = evt.target.closest('.element__img').src;
    elementImage.alt = evt.target.closest('.element').textContent;
    elementTitle.textContent = evt.target.closest('.element').textContent;
};

//Создание карточек из массива
initialCards.forEach((cardData) => {
    cardOnline.append(createCard(cardData));
});

//Общая функция открытия Popup
const openPopup = (item) => {
    item.classList.add('popup_opened');
};

//Общая функция закрытия Popup
const closePopup = (item) => {
    item.classList.remove('popup_opened');
};

//Функция открытия Popup редактирования профиля c указанными на странице данными
popupOpenEdit.addEventListener('click', () => {
    openPopup(popupProfile);
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
});

//Функция сохранения внесенных в формы popup изменений при закрытии окна
popupFormProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(popupProfile);
});

//Закрытие всех Popup при нажатии на крестик
popupCloseList.forEach((item) => {
    item.addEventListener('click', (evt) => {
        const popupClosest = evt.target.closest('.popup');
        closePopup(popupClosest);
    });
});

//Функция открытия Popup добавления карточки местности
popupOpenAdd.addEventListener('click', () => {
    openPopup(popupPlace);
});

//Функция сохранения внесенных в формы popup данных (название региона и ссылку на фото) при закрытии окна
popupFormPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderCard({
        name: popupFormTitle.value,
        link: popupFormLink.value,
    });
    evt.target.reset();
    closePopup(popupPlace);
});

//Функция добавления новой карточки в начало блока с данными из PopUp добавления новой карточки местности
const renderCard = (cardData) => {
    cardOnline.prepend(createCard(cardData));
};

//Функция лайк-дизлайка карточки
function cardLike(evt) {
    evt.target.classList.toggle('element__like_active');
};

//Функция удаления карточки
function cardDel(evt) {
    evt.target.closest('.element').remove();
};