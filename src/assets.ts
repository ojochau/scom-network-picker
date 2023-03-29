import { application } from '@ijstech/components';
const moduleDir = application.currentModuleDir;

function fullPath(path: string): string {
  return `${moduleDir}/${path}`
};
export default {
  img: {
    network: {
      bsc: fullPath('img/network/bsc.png'),
      eth: fullPath('img/network/eth.png'),
      amio: fullPath('img/network/amio.png'),
      avax: fullPath('img/network/avax.png'),
      ftm: fullPath('img/network/ftm.png'),
      polygon: fullPath('img/network/polygon.png'),
    }
  },
  fullPath
};
