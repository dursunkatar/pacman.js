document.body.insertAdjacentHTML('afterbegin', `<img style="margin:0;transform-origin: center center;position: absolute;top: 0;z-index:9999;width:125px;height:125px" id="pacman" src="https://i.hizliresim.com/M1WJdN.png" />`);
const pacman = document.getElementById('pacman');
const SAG = 1, SOL = 2;
let konum = SOL;

class Element {
    constructor(tag) {
        this.tag = tag;
        this.left = tag.getBoundingClientRect().left;
        this.top = tag.getBoundingClientRect().top;
        this.durum = false;
    }
    ye() {
        if ("constructor" in this.tag
            && this.tag.constructor.name === "HTMLDivElement"
            && this.tag.children.length > 0) {
            console.log(this.tag);
            return;
        }
        let deger = 8;
        const interval = setInterval(() => {
            this.tag.style.opacity = '0.' + deger--;
            if (deger < 0) {
                clearInterval(interval);
            }
        }, 250);
    }
}

const elementler = [];

document.querySelectorAll('body *:not(#pacman):not(div):not(ul):not(table):not(thead):not(tbody):not(tr):not(th):not(td):not(nav):not(footer):not(main):not(header):not(form):not(style):not(script)').forEach((e) => {
    elementler.push(new Element(e));
})

function yakaladiklariniYe() {
    const _top = pacman.offsetTop + pacman.getBoundingClientRect().height - 30;
    const _left = pacman.offsetLeft + pacman.getBoundingClientRect().width - 30;
    elementler.filter(item => item.durum == false).forEach(item => {
        if (item.top <= _top && item.left > pacman.offsetLeft && item.left < _left) {
            item.durum = true;
            item.ye();
        }
    });
}

function git() {
    if (konum === SOL) {
        sagaGit();
    } else {
        solaGit();
    }
}

function don() {
    if (konum === SOL) {
        sagaDon();
    } else {
        solaDon();
    }
}

function assaGit() {
    const _top = pacman.getBoundingClientRect().height + pacman.offsetTop;
    const interval = setInterval(() => {
        if (_top > pacman.offsetTop) {
            pacman.style.top = (pacman.offsetTop + 1) + "px";
            yakaladiklariniYe();
        }
        else {
            clearInterval(interval);
            don();
        }

    }, 5);
}

function sagaGit() {
    const _left = window.outerWidth - pacman.getBoundingClientRect().width - 10;
    const interval = setInterval(() => {
        if (_left > pacman.getBoundingClientRect().left) {
            pacman.style.left = (pacman.getBoundingClientRect().left + 2) + "px";
            yakaladiklariniYe();
        }
        else {
            clearInterval(interval);
            if (pacman.offsetTop <= document.body.getBoundingClientRect().height) {
                konum = SAG;
                assaDon();
            }
        }

    }, 5);
}

function solaGit() {
    const _left = 0;
    let interval = setInterval(() => {
        if (_left < pacman.offsetLeft) {
            pacman.style.left = (pacman.offsetLeft - 2) + "px";
            yakaladiklariniYe();
        }
        else {
            clearInterval(interval);
            if (pacman.offsetTop <= document.body.getBoundingClientRect().height) {
                konum = SOL;
                assaDon();
            }
        }
    }, 5);
}

function assaDon() {
    pacman.style.transform = 'rotate(85deg)';
    assaGit();
}
function solaDon() {
    pacman.style.transform = 'rotateY(200deg)';
    git();
}
function sagaDon() {
    pacman.style.transform = '';
    git();
}

setTimeout(() => { sagaGit(); }, 1000);
