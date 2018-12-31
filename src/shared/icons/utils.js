// eslint-disable-next-line  import/no-extraneous-dependencies
import { createIconSet } from '@expo/vector-icons';

import { ICON_TYPE } from './constants';

const glyphMap = {
  [ICON_TYPE.MAP]: 0xf5a0,
  [ICON_TYPE.SMILE]: 0xf118,
  [ICON_TYPE.FROWN]: 0xf119,
  [ICON_TYPE.STAR]: 0xf005,
  [ICON_TYPE.CAMERA]: 0xf083,
  [ICON_TYPE.GIFT]: 0xf06b,
  [ICON_TYPE.PLUS]: 0xf067,
  [ICON_TYPE.CART]: 0xf07a,
  [ICON_TYPE.FOOTBALL_BALL]: 0xf44e,
  [ICON_TYPE.ARROW_RIGHT]: 0xf054,
};

const iconSet = createIconSet(glyphMap, 'faSolid');

export default iconSet;
