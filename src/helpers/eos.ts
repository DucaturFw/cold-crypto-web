import callApi from './../utils/callApi';

export const getInfo = (account: string) => {
    // TODO: get right block explorer
    return callApi(
      'GET',
      `http://jungle.eospark.com`,
      `/api/account/${account}/actions?action_type=token&show_trx_small=0&show_trx_in=1&show_trx_out=1&page=1&size=50`,
    )
  }
;