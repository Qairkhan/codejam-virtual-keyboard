document.addEventListener('DOMContentLoaded', () => {
    class Keyboard {
        keyboard = null;

        textarea = null;

        codesMap = null;

        startDraw = null;

        fullTextStr = '';

        fullTextArr = [''];

        langCurr = null;

        langSecond = null;

        keyEventKey = null;

        keyDownEvent = null;

        keyECode = null;

        case = 0;

        tmpCase = 0;

        curChar = null;

        keyRowBreakpoints = ['Backspace', 'BracketRight', 'Enter', 'ShiftRight'];

        keyAliasObj = {
            Backspace: '←',
            CapsLock: 'Caps Lock',
            ShiftLeft: 'Shift',
            ShifRight: 'Shift',
            Control: 'Ctrl',
            MetaRight: 'Cmd',
            MetaLeft: 'Cmd',
            Meta: 'Cmd',
            AltRight: 'Alt',
            ArrowLeft: '←',
            ArrowUp: '↑',
            ArrowDown: '↓',
            ArrowRight: '→',
        };

        textFilter = ['Backspace', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'AltLeft', 'MetaLeft', 'MetaRight', 'AltRight', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];

        keyCodesArr = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter', 'ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'];

        keyValArrRuLow = ['>', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ё', 'Enter', 'Shift', ']', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', 'Shift', 'Control', 'Alt', 'Meta', ' ', 'Meta', 'Alt', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'];

        keyValArrRuUp = ['>', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Ё', 'Enter', 'Shift', ']', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '/', 'Shift', 'Control', 'Alt', 'Meta', ' ', 'Meta', 'Alt', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'];

        keyValArrRuShift = ['<', '!', '"', '№', '%', ':', ',', '.', ';', '(', ')', '_', '+', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Ё', 'Enter', 'Shift', '[', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '?', 'Shift', 'Control', 'Alt', 'Meta', ' ', 'Meta', 'Alt', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'];

        keyValArrEnLow = ['§', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '\\', 'Enter', 'Shift', '`', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift', 'Control', 'Alt', 'Meta', ' ', 'Meta', 'Alt', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'];

        keyValArrEnUp = ['§', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', '\\', 'Enter', 'Shift', '`', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift', 'Control', 'Alt', 'Meta', ' ', 'Meta', 'Alt', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'];

        keyValArrEnShift = ['±', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '|', 'Enter', 'Shift', '~', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift', 'Control', 'Alt', 'Meta', ' ', 'Meta', 'Alt', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'];

        constructor() {
            this.keyboard = document.createElement('div');
        }

        init() {
            this.keyboard.className = 'keyboard';
            this.codesMap = new Map();
            this.setLang(null);
            // this.setCase(0);

            this.startDraw = this.drawKeyboard();

            this.keyCodesArr.forEach((item, i) => {
                this.startDraw(item, i, this.createMap(item, i));
            });

            this.drawPage();
            this.addListener();
        }

        addListener() {
            document.addEventListener('keydown', (e) => {
                this.keyEventKey = e.key;
                this.keyECode = e.code;
                this.keyDownEvent = e;

                this.detectCase(e);

                this.catchChar();

                this.catchShift(e, 2);

                this.toggleActiveClass(1);
            });

            document.addEventListener('keyup', (e) => {
                this.detectCase(e);

                this.switchLang(e);

                this.catchShift(e, this.tmpCase);

                this.toggleActiveClass();
            });

            this.keyboard.addEventListener('click', (e) => {
                this.mouseInput(e);
            });
        }

        mouseInput(e) {
            let { target } = e;

            while (!target.dataset.key) {
                if (target === this.keyboard) {
                    break;
                }

                target = target.parentNode;
            }

            this.keyECode = target.dataset.key;
            this.catchChar();
            this.detectCase(e);
        }

        setLang(lang) {
            if (!lang && !this.langCurr) {
                const curr = localStorage.getItem('langCurr');
                const second = localStorage.getItem('langSecond');
                const whichCase = localStorage.getItem('case');

                if (curr === null && second === null) {
                    this.langCurr = 'ru';
                    this.langSecond = 'en';
                    this.setCase(0);
                } else {
                    this.langCurr = curr;
                    this.langSecond = second;
                    this.setCase(whichCase);
                }
            } else if (lang && this.langCurr !== lang) {
                this.langSecond = this.langCurr;
                this.langCurr = lang;
            }

            localStorage.setItem('langCurr', this.langCurr);
            localStorage.setItem('langSecond', this.langSecond);
            this.keyboard.setAttribute('data-lang', this.getLang());
        }

        getLang() {
            return !arguments.length ? this.langCurr : this.langSecond;
        }

        switchLang(e) {
            if (e.altKey && ((e.key || e.keyCode) === 'Control')) {
                this.setLang(this.langSecond);
            }
        }

        setCase(caps) {
            this.case = caps;
            localStorage.setItem('case', this.case);
            this.keyboard.setAttribute('data-case', this.case);
        }

        getCase() {
            return this.case;
        }

        detectCase(e) {
            if (e.code === 'CapsLock') {
                const caps = +e.getModifierState('CapsLock');
                this.setCase(caps);
                localStorage.setItem('case', this.case);
            }
        }

        catchShift(e, caps) {
            if (e.code === 'ShiftLeft') {
                this.tmpCase = this.getCase();
                this.setCase(caps);
            }
        }

        customBackspace() {
            if (this.keyECode === 'Backspace') {
                this.fullTextArr.pop();
                this.setText();
            }
        }

        toggleActiveClass() {
            setTimeout(() => {
                const key = this.keyboard.querySelector(`[data-key="${this.keyECode}"]`);
                const activeClass = 'keyboard__key--active';

                if (!key) {
                    return;
                }

                const isActive = key.classList.contains(activeClass);
                const isRemove = arguments.length;

                if (isRemove && !isActive) {
                    key.classList.add(activeClass);
                } else if (!isRemove && isActive) {
                    const activeKeys = this.keyboard.querySelectorAll(`.${activeClass}`);

                    Array.prototype.forEach.call(activeKeys, ((item) => {
                        item.classList.remove(activeClass);
                    }));
                }
            }, 1);
        }

        drawPage() {
            const mainContent = document.createElement('div');
            const textareaWrapper = document.createElement('div');
            const keyboardWrapper = document.createElement('div');
            const textarea = document.createElement('textarea');

            // @TODO
            textarea.onfocus = (e) => {
                textarea.value = this.fullTextStr;
                e.preventDefault();
            };

            this.textarea = textarea;
            mainContent.className = 'main';
            textareaWrapper.className = 'text_wrapper';
            keyboardWrapper.className = 'keyboard_wrapper';
            textarea.className = 'text';

            mainContent.appendChild(textareaWrapper);
            textareaWrapper.appendChild(textarea);
            mainContent.appendChild(keyboardWrapper);
            keyboardWrapper.appendChild(this.keyboard);
            document.body.appendChild(mainContent);
        }

        keyHTMLPattern(code, charsObj) {
            const keyboardKey = document.createElement('div');
            keyboardKey.className = `keyboard__key keyboard__key_${code.toLowerCase()}`;
            keyboardKey.setAttribute('data-key', code);

            // @TODO
            // let langs = Object.keys(charsObj);

            for (let lang in charsObj) {
                const langBtnSegment = document.createElement('div');

                let langBtn = '';

                langBtnSegment.className = `keyboard__key_segment ${lang}`;

                charsObj[lang].forEach((item, i) => {
                    langBtn = document.createElement('div');
                    langBtn.innerHTML = (!!this.keyAliasObj[item]) ? this.keyAliasObj[item] : item;
                    langBtn.className = `key_case case_${i}`;
                    langBtnSegment.appendChild(langBtn);
                });

                keyboardKey.appendChild(langBtnSegment);
            }

            return keyboardKey;
        }

        drawKeyboard() {
            const keyboardRow = document.createElement('div');
            keyboardRow.className = 'keyboard__row';

            return (item, i, charsArr) => {
                const keyboardKey = this.keyHTMLPattern(item, charsArr);

                keyboardRow.appendChild(keyboardKey);

                if (this.keyRowBreakpoints.includes(item) || (i === this.keyCodesArr.length - 1)) {
                    this.keyboard.appendChild(keyboardRow.cloneNode(true));
                    keyboardRow.innerHTML = '';
                }
            };
        }

        createMap(key, i) {
            const val = {

                en: [
                    this.keyValArrEnLow[i],
                    this.keyValArrEnUp[i],
                    this.keyValArrEnShift[i],
                ],
                ru: [
                    this.keyValArrRuLow[i],
                    this.keyValArrRuUp[i],
                    this.keyValArrRuShift[i],
                ],
            };

            this.codesMap.set(key, val);

            return val;
        }

        filterText() {
            if (!this.textFilter.includes(this.keyECode) && !!this.codesMap.get(this.keyECode)) {
                const tab = this.catchTab();
                this.curChar = this.codesMap.get(this.keyECode)[this.getLang()][this.getCase()];
                if (tab !== false) {
                    this.curChar = tab;
                }
                this.fullTextArr.push(this.curChar);
                this.setText();
            }
        }

        setFullTextStr() {
            this.fullTextStr = this.fullTextArr.join('');
        }

        setText() {
            this.setFullTextStr();
            this.textarea.value = this.fullTextStr;
        }

        catchTab() {
            if (this.keyECode === 'Tab') {
                this.keyDownEvent.preventDefault();
                return '    ';
            }

            return false;
        }

        catchChar() {
            this.filterText();
            this.customBackspace();
        }
    }

    const keyboard = new Keyboard();
    keyboard.init();
});