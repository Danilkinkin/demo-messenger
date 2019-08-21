
#Задание

Необходимо написать клиентскую часть мессенджера.

Чтобы представить примерное расположение элементов, был сделан [макет на Figma](https://www.figma.com/file/0rgbAhUUCNHBY0ZTY4Jy1c/Multichannel-Messenger?node-id=0%3A1). 

Для данного приложения не требуется писать серверную часть.
Все данные должны создаваться и храниться исключительно на клиенте.

Пример генератора случайных сообщений можно запустить командой `node index.js`.

На главном и единственном экране пользователя должны отображаться следующие элементы:
1. Список переписок, отсортированных по убыванию времени последнего сообщения, в каждой из которых:
    1. ID комнаты.
    2. ID канала.
    3. Тело последнего сообщения.
2. Переписка по выбранному каналу:
    1. ID выбранной комнаты.
    2. ID канала с выпадающим списком.
    3. Список сообщений
    4. Форма отправки сообщения:
        1. Текстовое поле.
        2. Кнопка отправки.
3. Переписка по всем каналам:
    1. ID выбранной комнаты.
    2. Список сообщений с разграничителями каналов.

Необходимый функционал:
1. Реактивный интерфейс: меняется как только меняются данные.
2. Анимация сортировки переписок: как только новое сообщение поступает в переписку, она должна "всплыть" наверх.
3. Выбор текущей переписки (комнаты).
4. Выбор текущего канала в комнате.
5. Отправка сообщения в выбранную комнату и канал.

Функционал "на пять с плюсом":
1. Синхронизация прокрутки: прокрутка переписок в выбранном канале и во всех каналах должна всегда находиться в таком положении, чтобы просматриваемые сообщения (то есть время и канал) в обоих списках совпадали.

Стек технологий:
1. Инструмент создания приложения: обязательно Razzle.
2. Библиотека пользовательских интерфейсов: обязательно React.
3. Набор пользовательских компонентов: обязательно Material UI.
3. Библиотека управления состоянием: Redux, Flux или другое на выбор. Самостоятельно писать запрещается.
4. Необязательно, но поощряется использовать СУБД на клиенте: PouchDB, Dexie или другая на выбор. Самостоятельно писать запрещается.
0. Дополнительные библиотеки на выбор: ImmutableJS, formik, react-motion.

Другие требования:
1. SSR должен быть включён и корректно работать.
2. Стандартные компоненты Material UI нужно кастомизировать так, чтобы цвета во всём приложении были тёплыми.
