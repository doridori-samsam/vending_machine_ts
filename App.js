import { colas, selectedColas, userMoney } from "./Data.js";
/** 소지금 */
const userBalance = document.getElementById("balance");
/** 잔액 */
const userChange = document.querySelector(".change-money");
/** 입금액 입력창 */
const userInput = document.querySelector(".input-money");
/** 선택된 콜라 리스트 display*/
const selectedColaCart = document.querySelector(".selected-cola-display");
/** 입금 버튼 클릭 */
const insertBtn = document.querySelector(".btn-deposit");
/** 콜라 메뉴 버튼 */
const colaBtns = document.querySelectorAll(".btn-cola");
/**입금액 입력 event */
userInput.addEventListener("keyup", (e) => {
    let value = e.target.value;
    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // 입력값이 숫자가 아니면 공백
    e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});
insertBtn === null || insertBtn === void 0 ? void 0 : insertBtn.addEventListener("click", () => {
    userMoney.balance -= parseInt(userInput.value.replaceAll(",", ""));
    userMoney.change += parseInt(userInput.value.replaceAll(",", ""));
    displayMoney();
    userInput.value = "";
});
/**거스름돈 반환 버튼 클릭 */
const changeReturnBtn = document.querySelector(".btn-change-return");
changeReturnBtn.addEventListener("click", () => {
    userMoney.balance += userMoney.change;
    userMoney.change = 0;
    console.log(userMoney);
    displayMoney();
});
/**콜라 메뉴 버튼 클릭 */
colaBtns.forEach((btn) => btn.addEventListener("click", (e) => {
    let colaId = e.target.id;
    let colaIndex = colas.findIndex((item) => item.name === colaId);
    --colas[colaIndex].stock;
    putColas(colaId, colaIndex);
    showSelectedColas(colaId);
    console.log(selectedColaCart.children, "보여지는 자식들");
    if (colas[colaIndex].stock === 0) {
        e.target.disabled = true;
    }
    console.log(selectedColas);
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
    let selectedCola = document.createElement("li");
    let selectedColaInfo = document.createElement("div");
    let selectedColaImg = document.createElement("img");
    let selectedColaName = document.createElement("span");
    let selectedColaQty = document.createElement("div");
    selectedColas.forEach((item, idx) => {
        if (selectedColaCart.children.length &&
            selectedColaCart.children[idx].className.includes(colaId)) {
            console.log(selectedColaCart.children[idx]);
            selectedColaCart.children[idx].lastChild.innerText =
                item.stock.toString();
        }
        else {
            console.log(item, idx);
            selectedColaCart.appendChild(selectedCola);
            selectedCola.classList.add("selected-cola", item.name);
            selectedCola.appendChild(selectedColaInfo);
            selectedColaInfo.appendChild(selectedColaImg);
            selectedColaInfo.appendChild(selectedColaName);
            selectedColaImg.classList.add("img-selected-cola");
            selectedColaImg.src = `/assets/images/${item.name}.png`;
            selectedColaImg.alt = item.name;
            selectedColaName.classList.add("selected-cola-name");
            selectedColaName.innerText = item.name;
            selectedCola.appendChild(selectedColaQty);
            selectedColaQty.classList.add("selected-cola-qty");
            selectedColaQty.innerText = item.stock.toString();
        }
    });
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
