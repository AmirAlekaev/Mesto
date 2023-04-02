
const popupElement = document.querySelector('.popup');
const popupElementClose = popupElement.querySelector('.popup__button-close');       // находим кнопку для закрытия попапа редактирования профиля
const popupElementOpen = document.querySelector('.profile__button-edit');           // находим кнопку для открытия попапа редактирования профиля
const popupElementForm = popupElement.querySelector('.popup__form');                // Найти форму popup изменения профиля
// const popupCloseList = document.querySelectorAll('.popup__button-close');           //кнопка закрытия попап

let profileName = document.querySelector('.profile-info__name');                   // Найти данные - name на странице
let profileJob = document.querySelector('.profile-info__job');
//console.log(profileName);
// Найти данные - job на странице
let inputName = popupElement.querySelector('.popup__input_type_name');                  // Найти поле ввода - name в форме редактирования профиля
let inputJob = popupElement.querySelector('.popup__input_type_job');                    // Найти поле ввода - job в форме редактирования профиля

function openPopup() {                                                     // открытие попап
    popupElement.classList.add('popup__opened');
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}

function closePopup() {                                                     // закрытие попап
    popupElement.classList.remove('popup__opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();  //предотвращает обновление страницы
    profileName.textContent = inputName.value;                                       //переопределяем
    profileJob.textContent = inputJob.value;
    closePopup();
}

popupElementOpen.addEventListener('click', openPopup);
popupElementClose.addEventListener('click', closePopup);
popupElementForm.addEventListener('submit', handleFormSubmit);

