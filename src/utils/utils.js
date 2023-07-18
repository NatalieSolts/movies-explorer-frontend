import {
    COUNT_CARDS_PER_LOAD_FOR_PC, // количество карточек для первой загрузки для ПК
    COUNT_CARDS_PER_LOAD_FOR_PHONE, // количество карточек для первой загрузки для мобил
    COUNT_CARDS_PER_LOAD_FOR_TABLET, // количество карточек для первой загрузки для планшетов
    COUNT_LOADS_CARD_MORE_FOR_PC_TABLET, // количество карточек при нажатии кнопки ЕЩЕ - ПК и планшеты
    COUNT_LOADS_CARD_MORE_FOR_PHONE, // количество карточек при нажатии кнопки ЕЩЕ - мобилы
    WIDTH_SCREEN_FOR_PC, // ширина для ПК
    WIDTH_SCREEN_FOR_PHONE, // ширина мобил
    WIDTH_SCREEN_FOR_TABLET // ширина для планшетов
} from "./constants";

//расчет количества отображаемых карточек
export function calcVisibleAndLoadMoreCards () {
    const widthWindow = window.innerWidth;
    let countCardsPerLoad, loadMoreCount;

    if (widthWindow >= WIDTH_SCREEN_FOR_PC) {
        loadMoreCount = COUNT_LOADS_CARD_MORE_FOR_PC_TABLET;
        countCardsPerLoad = COUNT_CARDS_PER_LOAD_FOR_PC;
    } else if (widthWindow >= WIDTH_SCREEN_FOR_TABLET) {
        loadMoreCount = COUNT_LOADS_CARD_MORE_FOR_PC_TABLET;
        countCardsPerLoad = COUNT_CARDS_PER_LOAD_FOR_TABLET;
    } else if (widthWindow >= WIDTH_SCREEN_FOR_PHONE) {
        loadMoreCount = COUNT_LOADS_CARD_MORE_FOR_PHONE;
        countCardsPerLoad = COUNT_CARDS_PER_LOAD_FOR_PHONE;
    }
    return { countCardsPerLoad, loadMoreCount };
}
