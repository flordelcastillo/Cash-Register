function checkCashRegister(price, cash, cid) {
  const unidades = [
    { unidad: "PENNY", valor: 1 },
    { unidad: "NICKEL", valor: 5 },
    { unidad: "DIME", valor: 10 },
    { unidad: "QUARTER", valor: 25 },
    { unidad: "ONE", valor: 100 },
    { unidad: "FIVE", valor: 500 },
    { unidad: "TEN", valor: 1000 },
    { unidad: "TWENTY", valor: 2000 },
    { unidad: "ONE HUNDRED", valor: 10000 }
  ];

  let change = Math.round((cash - price) * 100);
  let totalCash = cid.reduce((accum, curr) => accum + Math.round(curr[1] * 100), 0);

  if (totalCash < change) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (totalCash === change) {
    return { status: "CLOSED", change: cid };
  }

  let cambioDevuelto = [];

  for (let i = unidades.length - 1; i >= 0; i--) {
    let unidadNombre = unidades[i].unidad;
    let unidadValor = unidades[i].valor;
    let cantidadDisponible = Math.round(cid.find(([nombreUnidad]) => nombreUnidad === unidadNombre)[1] * 100);

    let cantidadUsable = Math.min(Math.floor(change / unidadValor), cantidadDisponible / unidadValor);

    if (cantidadUsable > 0) {
      cambioDevuelto.push([unidadNombre, cantidadUsable * unidadValor / 100]);
      change -= cantidadUsable * unidadValor;
    }
  }

  if (change > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: cambioDevuelto };
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
//{status: "OPEN", change: [["QUARTER", 0.5]]}
