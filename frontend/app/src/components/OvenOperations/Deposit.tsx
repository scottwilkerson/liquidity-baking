import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { MdInfo } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { number, object } from 'yup';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { IDepositForm } from '../../constants/oven-operations';
import { cTezError, deposit } from '../../contracts/ctez';
import { logger } from '../../utils/logger';
import { useAppSelector } from '../../redux/store';

const Deposit: React.FC = () => {
  const toast = useToast();
  const { ovenId } = useParams<{ ovenId: string }>();
  const oven = useAppSelector((state) =>
    state.oven.ovens.find((x) => {
      const ovenIdFromStore = new BigNumber(x.ovenId);
      return ovenId === ovenIdFromStore.toString();
    }),
  );

  const { t } = useTranslation(['common']);
  const initialValues: any = {
    amount: '',
  };

  const validationSchema = object().shape({
    amount: number().min(0.000001).required(t('required')),
  });

  const handleFormSubmit = async (data: IDepositForm) => {
    if (oven?.address) {
      try {
        const result = await deposit(oven.address, data.amount);
        if (result) {
          toast({
            description: t('txSubmitted'),
            status: 'success',
          });
        }
      } catch (error) {
        logger.error(error);
        const errorText = cTezError[error.data[1].with.int as number] || t('txFailed');
        toast({
          description: errorText,
          status: 'error',
        });
      }
    }
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Flex mr={-2} ml={-2} p={2} borderRadius={14} backgroundColor="gray.50">
        <Icon fontSize="2xl" as={MdInfo} m={1} />
        <Text fontSize="xs" ml={2}>
          By adding liquidity you'll earn 0.2% of all trades on this pair proportional to your share
          of the pool. Fees are added to the
        </Text>
      </Flex>

      <FormControl id="to-input-amount" mt={2} mb={6} w="100%">
        <FormLabel fontSize="xs">Deposit Tezos</FormLabel>
        <Input
          type="number"
          name="amount"
          id="amount"
          value={values.amount}
          onChange={handleChange}
        />
      </FormControl>

      <Button w="100%" variant="solid" type="submit">
        Deposit Tezos
      </Button>
    </form>
  );
};

export default Deposit;
