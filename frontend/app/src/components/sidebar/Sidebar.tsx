import { ProSidebar, SidebarHeader, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import clsx from 'clsx';
import { Text, Flex, Box, Image } from '@chakra-ui/react';
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReactComponent as Trade } from '../../assets/images/sidebar/trade.svg';
import { ReactComponent as Faq } from '../../assets/images/sidebar/faq.svg';
import { ReactComponent as ArrowLeft } from '../../assets/images/sidebar/arrowleft.svg';
import { ReactComponent as ArrowRight } from '../../assets/images/sidebar/arrowright.svg';
// import { ReactComponent as Logo } from '../../assets/images/sidebar/ctez.svg';
import 'react-pro-sidebar/dist/css/styles.css';
import { openModal } from '../../redux/slices/UiSlice';
import { MODAL_NAMES } from '../../constants/modals';
import { useCtezBaseStats } from '../../api/queries';
import { useThemeColors } from '../../hooks/utilHooks';

export interface Props {
  handleCollapsed: React.MouseEventHandler;
  handleToggled: ((value: boolean) => void) | undefined;
  collapsed: boolean;
  toggled: boolean;
}

export const Sidebar: React.FC<Props> = ({
  handleCollapsed,
  handleToggled,
  collapsed,
  toggled,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data } = useCtezBaseStats();

  const [sideBarBackground, sidebarTxt, sidebarTopic] = useThemeColors([
    'sideBarBg',
    'sidebarTxt',
    'sidebarTopic',
  ]);

  const handleCreateOvenClick = () => {
    dispatch(openModal(MODAL_NAMES.CREATE_OVEN));
  };

  const stats = () => {
    return (
      <Flex direction="column">
        <Flex direction="row">
          <Text color={sidebarTxt} fontSize="xs" cursor="default">
            Current Target
          </Text>
          <Text marginLeft="auto" color={sidebarTxt} fontSize="xs" cursor="default">
            {data?.currentTarget}
          </Text>
        </Flex>
        <Flex direction="row">
          <Text color={sidebarTxt} fontSize="xs" cursor="default">
            Current Price
          </Text>
          <Text marginLeft="auto" color={sidebarTxt} fontSize="xs" cursor="default">
            {data?.currentPrice}
          </Text>
        </Flex>
        <Flex direction="row">
          <Text color={sidebarTxt} fontSize="xs" cursor="default">
            Premium
          </Text>
          <Text marginLeft="auto" color={sidebarTxt} fontSize="xs" cursor="default">
            {data?.premium}%
          </Text>
        </Flex>
        <Flex direction="row">
          <Text color={sidebarTxt} fontSize="xs" cursor="default">
            Current Annual Drift
          </Text>
          <Text marginLeft="auto" color={sidebarTxt} fontSize="xs" cursor="default">
            {data?.currentAnnualDrift}%
          </Text>
        </Flex>
        <Flex direction="row">
          <Text color={sidebarTxt} fontSize="xs" cursor="default">
            Annual Drift (Past week)
          </Text>
          <Text marginLeft="auto" color={sidebarTxt} fontSize="xs" cursor="default">
            {data?.annualDriftPastWeek}%
          </Text>
        </Flex>
      </Flex>
    );
  };

  return (
    <Box id="sidebar">
      <ProSidebar collapsed={collapsed} breakPoint="md" toggled={toggled} onToggle={handleToggled}>
        <Box background={sideBarBackground} flexGrow={1}>
          <SidebarHeader>
            <Flex alignItems="center" justifyContent="center" padding="16px 0px 16px 20px">
              <Box>
                <NavLink to="/">
                  LB
                </NavLink>
              </Box>
              <Text
                flexGrow={1}
                flexShrink={1}
                overflow="hidden"
                color="white"
                fontWeight={600}
                fontSize="xl"
                marginLeft="10px"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                <NavLink to="/">Liquidity Baking</NavLink>
              </Text>
            </Flex>
            <Box role="button" className="menu-expand-button" onClick={handleCollapsed}>
              <Flex justifyContent="center" width="8px">
                {collapsed ? <ArrowRight /> : <ArrowLeft />}
              </Flex>
            </Box>
          </SidebarHeader>
          <SidebarContent>
            <Box height="calc(100vh - 72px)" overflow="auto">
              <Menu iconShape="square">
                <MenuItem
                  className={clsx({
                    highlight: location.pathname === '/trade',
                  })}
                  icon={<Trade />}
                >
                  <Link to="/trade">Trade</Link>
                </MenuItem>
                <MenuItem
                  className={clsx(
                    {
                      hide: collapsed,
                    },
                    'no-cursor',
                  )}
                >
                  <Text fontSize="sm" color={sidebarTopic} cursor="default">
                    Stats
                  </Text>
                </MenuItem>
                <MenuItem
                  className={clsx(
                    {
                      hide: collapsed,
                    },
                    'no-cursor',
                    'highlight',
                  )}
                >
                  {stats()}
                </MenuItem>
                <MenuItem
                  className={clsx(
                    {
                      hide: collapsed,
                    },
                    'no-cursor',
                  )}
                >
                  <Text fontSize="sm" color={sidebarTopic}>
                    Info
                  </Text>
                </MenuItem>
                <MenuItem
                  className={clsx({
                    highlight: location.pathname === '/faq',
                  })}
                  icon={<Faq />}
                >
                  <Link to="/faq">FAQ</Link>
                </MenuItem>
              </Menu>
            </Box>
          </SidebarContent>
        </Box>
      </ProSidebar>
    </Box>
  );
};
