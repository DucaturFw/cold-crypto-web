import callApi from './../utils/callApi';

export const getInfo = (account: string) => {
    // TODO: get right block explorer
    return callApi(
      'GET',
      `https://junglehistory.cryptolions.io:4433/v1`,
      `/history/get_actions/${account}?limit=100&skip=0`
    )
  }
;