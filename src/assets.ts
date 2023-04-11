import { application } from '@ijstech/components';
const moduleDir = application.currentModuleDir;

function fullPath(path: string): string {
  return `${moduleDir}/${path}`
};
export default {
  img: {
    network: {
      bsc: fullPath('img/networks/bsc.png'),
      eth: fullPath('img/networks/eth.png'),
      amio: fullPath('img/networks/amio.png'),
      avax: fullPath('img/networks/avax.png'),
      ftm: fullPath('img/networks/ftm.png'),
      polygon: fullPath('img/networks/polygon.png'),
    }
  },
  fullPath
};
