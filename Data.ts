type Name = string;
type Stock = number;
type Price = number;
interface cola {
  name: Name;
  stock: Stock;
  price: Price;
}

interface user {
  balance: number;
  change: number;
}

export let changeMoney: number = 0;

export let userMoney: user = {
  balance: 25000,
  change: 0,
};

export let colas: Array<cola> = [
  {
    name: "Original_Cola",
    stock: 5,
    price: 1000,
  },
  {
    name: "Violet_Cola",
    stock: 5,
    price: 1000,
  },
  {
    name: "Yellow_Cola",
    stock: 5,
    price: 1000,
  },
  {
    name: "Cool_Cola",
    stock: 5,
    price: 1000,
  },
  {
    name: "Green_Cola",
    stock: 5,
    price: 1000,
  },
  {
    name: "Orange_Cola",
    stock: 5,
    price: 1000,
  },
];

export let selectedColas: Array<cola> = [];
