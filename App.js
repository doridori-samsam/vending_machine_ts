import { colas, selectedColas, userMoney, acquiredColas } from "./Data.js";
/** 소지금 */
const userBalance = document.getElementById("balance");
/** 잔액 */
const userChange = document.querySelector(".change-money");
/** 입금액 입력창 */
const userInput = document.querySelector(".input-money");
/** 총 구매 금액 */
let requiredMoney = 0;
/** 선택된 콜라 리스트 display*/
const selectedColaCart = document.querySelector(".selected-cola-display");
/** 콜라 메뉴 버튼 */
const colaBtns = document.querySelectorAll(".btn-cola");
/** 입금 버튼 */
const insertBtn = document.querySelector(".btn-deposit");
/** 거스름돈 반환 버튼 */
const changeReturnBtn = document.querySelector(".btn-change-return");
/** 획득 버튼 */
const acquireBtn = document.querySelector(".btn-acquire");
/** 입금액 입력 event */
userInput.addEventListener("keyup", (e) => {
    let value = e.target.value;
    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // 입력값이 숫자가 아니면 공백
    e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});
/** 입금 버튼 클릭 event */
insertBtn === null || insertBtn === void 0 ? void 0 : insertBtn.addEventListener("click", () => {
    userMoney.balance -= parseInt(userInput.value.replaceAll(",", ""));
    userMoney.change += parseInt(userInput.value.replaceAll(",", ""));
    displayMoney();
    userInput.value = "";
});
/** 거스름돈 반환 버튼 클릭 */
changeReturnBtn === null || changeReturnBtn === void 0 ? void 0 : changeReturnBtn.addEventListener("click", () => {
    userMoney.balance += userMoney.change;
    userMoney.change = 0;
    displayMoney();
});
/**콜라 메뉴 버튼 클릭 */
colaBtns.forEach((btn) => btn.addEventListener("click", (e) => {
    let colaId = e.target.id;
    let colaIndex = colas.findIndex((item) => item.name === colaId);
    --colas[colaIndex].stock;
    putColas(colaId, colaIndex);
    showSelectedColas(colaId);
    sumUpRequiredPrice();
    console.log(requiredMoney);
    if (colas[colaIndex].stock === 0) {
        e.target.disabled = true;
    }
    //requiredMoney =
}));
/**콜라 선택 */
function putColas(colaId, colaIndex) {
    let selectedColaIdx = selectedColas.findIndex((item) => item.name === colaId);
    if (selectedColaIdx >= 0) {
        selectedColas[selectedColaIdx].stock += 1;
    }
    else {
        selectedColas.push(new SelectedColasObj(colas[colaIndex].name, 1, colas[colaIndex].price));
    }
}
function showSelectedColas(colaId) {
    var _a, _b, _c;
    let selectedColaCartList = selectedColaCart.childNodes;
    let selectedCola = document.createElement("li");
    let selectedColaInfo = document.createElement("div");
    let selectedColaImg = document.createElement("img");
    let selectedColaName = document.createElement("span");
    let selectedColaQty = document.createElement("div");
    selectedCola.classList.add("selected-cola", colaId);
    selectedCola.appendChild(selectedColaInfo);
    selectedColaInfo.appendChild(selectedColaImg);
    selectedColaInfo.appendChild(selectedColaName);
    selectedColaImg.classList.add("img-selected-cola");
    selectedColaImg.src = `/assets/images/${colaId}.png`;
    selectedColaImg.alt = selectedColas[selectedColas.length - 1].name;
    selectedColaName.classList.add("selected-cola-name");
    selectedColaName.innerText = colaId;
    selectedCola.appendChild(selectedColaQty);
    selectedColaQty.classList.add("selected-cola-qty");
    selectedColaQty.innerText = "1";
    let selectedColaNames = [];
    for (let i = 0; i < selectedColaCartList.length; i++) {
        selectedColaNames.push((_a = selectedColaCartList[i].firstChild) === null || _a === void 0 ? void 0 : _a.textContent);
    }
    if (!selectedColaCart.hasChildNodes() ||
        !selectedColaNames.includes(colaId)) {
        selectedColaCart.appendChild(selectedCola);
    }
    else {
        (_c = (_b = selectedColaCartList[selectedColaNames.indexOf(colaId)]) === null || _b === void 0 ? void 0 : _b.lastChild) === null || _c === void 0 ? void 0 : _c.textContent =
            selectedColas[selectedColaNames.indexOf(colaId)].stock.toString();
    }
}
/**구매시 총 필요한 가격 계산 함수 */
function sumUpRequiredPrice() {
    return (requiredMoney =
        selectedColas.reduce((acc, cur) => {
            return acc + cur.stock;
        }, 0) * 1000);
}
/**선택된 콜라 객체 생성 */
function SelectedColasObj(name, stock, price) {
    this.name = name;
    this.stock = +stock;
    this.price = price;
}
/**바뀐 금액 재렌더링 함수 */
function displayMoney() {
    userBalance.innerText = userMoney.balance.toLocaleString() + " 원";
    userChange.innerText = userMoney.change.toLocaleString() + " 원";
}
/**획득 버튼 click event */
acquireBtn === null || acquireBtn === void 0 ? void 0 : acquireBtn.addEventListener("click", () => {
    acquiredColas.push(...selectedColas);
    console.log(acquiredColas, "획득한 콜라");
});
