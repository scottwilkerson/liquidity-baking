import { Flex, HStack, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import Trade from '../../components/Trade';
import { MODAL_NAMES } from '../../constants/modals';
import { BUTTON_TXT } from '../../constants/swap';
import { useThemeColors } from '../../hooks/utilHooks';
import { openModal } from '../../redux/slices/UiSlice';
import { useAppDispatch } from '../../redux/store';

const HomePage: React.FC = () => {
  const [textcolor] = useThemeColors(['homeTxt']);
  const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
  const dispatch = useAppDispatch();

  return (
    <Flex maxWidth={1200} mx="auto" height="calc(100vh - 72px)" alignItems="center">
      <Flex alignItems="center" flexDirection={largerScreen ? 'row' : 'column'}>
        <Stack
          spacing={5}
          pl={largerScreen ? 4 : 1}
          pr={largerScreen ? 0 : 1}
          textAlign={largerScreen ? 'left' : 'center'}
          alignItems={largerScreen ? 'left' : 'center'}
        >
          <Text
            color={textcolor}
            fontSize={largerScreen ? '48px' : '26px'}
            as="strong"
            lineHeight="50px"
          >
            Tezos Liquidity Baking
          </Text>
          <Text opacity="0.5" color={textcolor} fontSize="md" pr={15}>
            Liquidity baking allows you to earn rewards directly from the Tezos protocol for staking
            tzBTC and XTZ.  2.5 XTZ per block (every ~30 seconds) gets added to the pool
          </Text>
          <HStack
            mt={10}
            w={largerScreen ? '60%' : '90%'}
            justifyContent="space-between"
            spacing={largerScreen ? '24px' : '15px'}
          >
            <Button
              walletGuard
              variant="solid"
              w="50%"
              onClick={() => dispatch(openModal(MODAL_NAMES.CREATE_OVEN))}
            >
              {BUTTON_TXT.CREATE_OVEN}
            </Button>
            <Button variant="ghost" w="50%">
              <Link to="/faq">
                <Button variant="outline" w={largerScreen ? '200px' : '180px'}>
                  Learn more
                </Button>
              </Link>
            </Button>
          </HStack>
        </Stack>
        <Trade />
      </Flex>
    </Flex>
  );
};

export default HomePage;
