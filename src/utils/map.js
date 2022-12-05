import agile from '@/assets/images/agile.png';
import intelligence from '@/assets/images/intelligence.png';
import strong from '@/assets/images/strong.png';

// 英雄属性
const heroMap = {
  0: { primaryAttrName: '力量', primaryAttrLogo: strong },
  1: { primaryAttrName: '敏捷', primaryAttrLogo: agile },
  2: { primaryAttrName: '智力', primaryAttrLogo: intelligence }
};

// 天梯段位
const rankTierMap = new Map();
rankTierMap.set(10, '先锋');
rankTierMap.set(20, '卫士');
rankTierMap.set(30, '中军');
rankTierMap.set(40, '统帅');
rankTierMap.set(50, '传奇');
rankTierMap.set(60, '万古流芳');
rankTierMap.set(70, '超凡入圣');
rankTierMap.set(80, '冠绝一世');

export { heroMap, rankTierMap };
