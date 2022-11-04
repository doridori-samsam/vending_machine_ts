import { colas, selectedColas, userMoney, changeMoney } from "./Data.js";

/** 소지금 */
const userBalance = document.getElementById("balance") as HTMLSpanElement;

/** 잔액 */
const userChange = document.querySelector(".change-money") as HTMLSpanElement;

/** 입금액 입력창 */
const userInput = document.querySelector(".input-money") as HTMLInputElement;

/** 선택된 콜라 리스트 display*/
const selectedColaCart = document.querySelector(
  ".selected-cola-display"
) as HTMLUListElement;

/** 입금 버튼 클릭 */
const insertBtn = document.querySelector(".btn-deposit");

/** 콜라 메뉴 버튼 */
const colaBtns = document.querySelectorAll(".btn-cola");

/**입금액 입력 event */
userInput.addEventListener<"keyup">("keyup", (e: KeyboardEvent) => {
  let value = (e.target as HTMLInputElement).value;
  e.target.value = e.target.value.replace(/[^0-9]/g, ""); // 입력값이 숫자가 아니면 공백
  e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

insertBtn?.addEventListener("click", () => {
  userMoney.balance -= parseInt(userInput.value.replaceAll(",", ""));
  userMoney.change += parseInt(userInput.value.replaceAll(",", ""));
  displayMoney();
  userInput.value = "";
});

/**거스름돈 반환 버튼 클릭 */
const changeReturnBtn = document.querySelector(
  ".btn-change-return"
) as HTMLButtonElement;
changeReturnBtn.addEventListener("click", () => {
  userMoney.balance += userMoney.change;
  userMoney.change = 0;
  console.log(userMoney);
  displayMoney();
});

/**콜라 메뉴 버튼 클릭 */
colaBtns.forEach((btn) =>
  btn.addEventListener("click", (e: Event) => {
    let colaId = (e.target as HTMLButtonElement).id;
    let colaIndex: number = colas.findIndex(
      (item: object) => item.name === colaId
    );
    --colas[colaIndex].stock;
    putColas(colaId, colaIndex);
    showSelectedColas(colaId);
    if (colas[colaIndex].stock === 0) {
      (e.target as HTMLButtonElement).disabled = true;
    }
    console.log(selectedColas);
  })
);

/**콜라 선택 */
function putColas(colaId: string, colaIndex: number) {
  let selectedColaIdx: number = selectedColas.findIndex(
    (item) => item.name === colaId
  );
  if (selectedColaIdx >= 0) {
    selectedColas[selectedColaIdx].stock += 1;
  } else {
    selectedColas.push(
      new SelectedColasObj(colas[colaIndex].name, 1, colas[colaIndex].price)
    );
  }
}

function showSelectedColas(colaId: string) {
  let selectedCola = document.createElement("li");
  let selectedColaInfo = document.createElement("div");
  let selectedColaImg = document.createElement("img");
  let selectedColaName = document.createElement("span");
  let selectedColaQty = document.createElement("div");

  selectedColaCart.appendChild(selectedCola);
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

  console.log(selectedColaCart.children);

  if (selectedColaCart.children.length) {
  }
  // selectedColas.forEach((item, idx: number) => {

  //   console.log(item, idx, "아이템과 인덱스");
  //   if (
  //     selectedColaCart.children.length &&
  //     selectedColaCart.children[idx].className.includes(colaId)
  //   ) {
  //     selectedColaCart.children[idx].lastChild.innerText =
  //       item.stock.toString();
  //   } else {
  //     selectedColaCart.appendChild(selectedCola);
  //     selectedCola.classList.add("selected-cola", item.name);
  //     selectedCola.appendChild(selectedColaInfo);
  //     selectedColaInfo.appendChild(selectedColaImg);
  //     selectedColaInfo.appendChild(selectedColaName);
  //     selectedColaImg.classList.add("img-selected-cola");
  //     selectedColaImg.src = `/assets/images/${item.name}.png`;
  //     selectedColaImg.alt = item.name;
  //     selectedColaName.classList.add("selected-cola-name");
  //     selectedColaName.innerText = item.name;
  //     selectedCola.appendChild(selectedColaQty);
  //     selectedColaQty.classList.add("selected-cola-qty");
  //     selectedColaQty.innerText = item.stock.toString();
  //   }
  // });
}

console.log(selectedColaCart.children);
/**선택된 콜라 객체 생성 */
function SelectedColasObj(name: string, stock: number, price: number) {
  this.name = name;
  this.stock = +stock;
  this.price = price;
}

/**바뀐 금액 재렌더링 함수 */
function displayMoney() {
  userBalance.innerText = userMoney.balance.toLocaleString() + " 원";
  userChange.innerText = userMoney.change.toLocaleString() + " 원";
}
