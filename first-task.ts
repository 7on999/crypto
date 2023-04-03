export enum KindCoins {
  ETH = 'ETH',
  TRON = 'TRON',
  MATIC = 'MATIC',
}

const mainFn = (
  availableObj: Record<KindCoins, number>,
  requestArr: Array<KindCoins>,
): Array<KindCoins> | null => {
  const result: Array<null | KindCoins> = new Array(requestArr.length).fill(
    null,
  );

  const restCoins = { ...availableObj };
  const optionalCoins: Array<KindCoins[]> = [];
  const variants: Array<KindCoins[]> = [];

  function collectCombintations(index = 0, prefix = []) {
    optionalCoins[index].forEach((coin: KindCoins, i: number) => {
      const newPrefix = [...prefix, coin];

      if (index === optionalCoins.length - 1) {
        variants.push(newPrefix);
        if (i === optionalCoins[index].length - 1) return;
      } else collectCombintations(index + 1, newPrefix);
    });
  }

  for (let i = 0; i < requestArr.length; i++) {
    const coin = requestArr[i];

    if (coin.includes('/')) {
      const el = coin.split('/') as KindCoins[];
      optionalCoins.push(el);
    } else {
      if (!restCoins[coin]) return null;
      result[i] = coin;
      restCoins[coin] = restCoins[coin] - 1;
    }
  }

  collectCombintations();

  let goodVariant: Array<KindCoins> | null = null;

  outer: for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    const restCoinsCopy = { ...restCoins };

    for (let i = 0; i < variant.length; i++) {
      const coin = variant[i];

      if (!restCoinsCopy[coin]) {
        break;
      } else {
        restCoinsCopy[coin] = restCoinsCopy[coin] - 1;
      }

      if (i === variant.length - 1) {
        goodVariant = variant;
        break outer;
      }
    }
  }

  if (!goodVariant) return null;

  return result.map((coinValue) =>
    coinValue ? coinValue : goodVariant.shift(),
  );
};
