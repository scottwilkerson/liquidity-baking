import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router-dom';
import { getOvenMaxCtez } from '../utils/ovenUtils';
import { useAppSelector } from '../redux/store';

const useOvenStats = () => {
  const { ovenId } = useParams<{ ovenId: string }>();
  const oven = useAppSelector((state) =>
    state.oven.ovens.find((x) => {
      const ovenIdFromStore = new BigNumber(x.ovenId);
      return ovenId === ovenIdFromStore.toString();
    }),
  );

  const currentTarget = useAppSelector((state) => state.stats.baseStats?.originalTarget);

  const stats = useMemo(() => {
    if (oven == null) {
      return null;
    }

    const toNumber = (value: BigNumber) => {
      return value.shiftedBy(-6).toNumber();
    };

    const { tez_balance, ctez_outstanding } = oven;
    const { max, remaining } = currentTarget
      ? getOvenMaxCtez(toNumber(tez_balance), toNumber(ctez_outstanding), currentTarget)
      : { max: 0, remaining: 0 };

    const outStandingCtez = new BigNumber(ctez_outstanding).shiftedBy(-6).toNumber() ?? 0;
    const maxMintableCtez = max < 0 ? 0 : max;
    const remainingMintableCtez = remaining < 0 ? 0 : remaining;

    return { outStandingCtez, maxMintableCtez, remainingMintableCtez };
  }, [currentTarget, oven]);

  return { stats, oven };
};

export { useOvenStats };
