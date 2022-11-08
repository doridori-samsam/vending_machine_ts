import { colas, selectedColas, userMoney, acquiredColas } from "./Data.js";

/** 소지금 */
const userBalance = document.getElementById("balance") as HTMLSpanElement;

/** 잔액 */
const userChange = document.querySelector(".change-money") as HTMLSpanElement;

/** 입금액 입력창 */
const userInput = document.querySelector(".input-money") as HTMLInputElement;

/** 총 구매 금액 */
let requiredMoney = 0;

/** 총 구매 금액 display */
const totalConsumption = document.getElementById(
  "consumption"
) as HTMLSpanElement;

/** 선택된 콜라 리스트 display*/
const selectedColaCart = document.querySelector(
  ".selected-cola-display"
) as HTMLUListElement;

/** 획득한 콜라 리스트 display */
const acquiredColaCart = document.querySelector(".acquired-cola-display");

/** 콜라 메뉴 버튼 */
const colaBtns = document.querySelectorAll(".btn-cola");

/** 입금 버튼 */
const insertBtn = document.querySelector(".btn-deposit");

/** 거스름돈 반환 버튼 */
const changeReturnBtn = document.querySelector(".btn-change-return");

/** 획득 버튼 */
const acquireBtn = document.querySelector(".btn-acquire") as HTMLButtonElement;

/** 입금액 입력 event */
userInput.addEventListener<"keyup">("keyup", (e: KeyboardEvent) => {
  let value = (e.target as HTMLInputElement).value;
  e.target.value = e.target.value.replace(/[^0-9]/g, ""); // 입력값이 숫자가 아니면 공백
  e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

/** 입금 버튼 클릭 event */
insertBtn?.addEventListener("click", () => {
  if (!userInput.value) {
    alert("돈을 넣어주세요! 💰");
  } else if (
    parseInt(userInput.value.replaceAll(",", "")) > userMoney.balance
  ) {
    alert("소지금이 부족해요! 😳");
  } else {
    userMoney.balance -= parseInt(userInput.value.replaceAll(",", ""));
    userMoney.change += parseInt(userInput.value.replaceAll(",", ""));
    displayMoney();
    userInput.value = "";
    acquireBtn.disabled = false;
  }
});

/** 거스름돈 반환 버튼 클릭 */
changeReturnBtn?.addEventListener("click", () => {
  userMoney.balance += userMoney.change;
  userMoney.change = 0;
  displayMoney();
});

/**콜라 메뉴 버튼 클릭 */
colaBtns.forEach((btn) =>
  btn.addEventListener("click", (e: Event) => {
    console.log(userMoney, "소지금");
    console.log(requiredMoney, "내야할 금액");
    let colaId = (e.target as HTMLButtonElement).id;
    let colaIndex: number = colas.findIndex((item) => item.name === colaId);
    --colas[colaIndex].stock;
    putColas(colaId, colaIndex);
    showSelectedColas(colaId);
    sumUpRequiredPrice();
    if (colas[colaIndex].stock === 0) {
      (e.target as HTMLButtonElement).disabled = true;
    }
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
  console.log(selectedColas);
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

  let selectedColaNames: string[] = [];
  for (let i = 0; i < selectedColaCartList.length; i++) {
    selectedColaNames.push(selectedColaCartList[i].firstChild?.textContent);
  }

  if (
    !selectedColaCart.hasChildNodes() ||
    !selectedColaNames.includes(colaId)
  ) {
    selectedColaCart.appendChild(selectedCola);
  } else {
    selectedColaCartList[
      selectedColaNames.indexOf(colaId)
    ]?.lastChild?.textContent =
      selectedColas[selectedColaNames.indexOf(colaId)].stock.toString();
  }
}

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

/**구매시 총 필요한 가격 계산 함수 */
function sumUpRequiredPrice() {
  return (requiredMoney =
    selectedColas.reduce((acc, cur) => {
      return acc + cur.stock;
    }, 0) * 1000);
}

/**획득 버튼 click event */
acquireBtn?.addEventListener("click", () => {
  if (userMoney.change < requiredMoney) {
    alert("입금액이 부족해요! 😳");
  } else {
    acquiredColas.push(...selectedColas);
    while (selectedColaCart.firstChild) {
      acquiredColaCart?.append(selectedColaCart.firstChild);
    }
    userMoney.change -= requiredMoney;
    userChange.innerText = userMoney.change.toLocaleString();
    totalConsumption.innerText =
      (
        parseInt(totalConsumption.innerText.replaceAll(",", "")) + requiredMoney
      ).toLocaleString() + " 원";
    displayMoney();
    requiredMoney = 0;
    selectedColas.splice(0, selectedColas.length);
  }
});
