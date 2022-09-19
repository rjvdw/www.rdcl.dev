import { createSelector } from '@reduxjs/toolkit'
import { selectScreenType } from '../../slices/screen'
import {
  selectIsCollapsed as selectIsSideMenuCollapsed,
  selectIsOpen as selectIsSideMenuOpen,
} from '../../slices/side-menu'

export const selectIsCollapsed = createSelector(
  selectScreenType,
  selectIsSideMenuCollapsed,
  selectIsSideMenuOpen,
  (screenType, collapsed, open) => screenType === 'mobile'
    ? !open
    : collapsed,
)
