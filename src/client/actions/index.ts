import { createAction } from "redux-act";

export const setQr = createAction<{ key: string; value: string }>("set qr");
export const generateQr = createAction<{ key: string; value: string }>(
  "generate qr"
);
export const setQrScanned = createAction<string | Error>("set qr scanned");
export const setQrCode = createAction<{ wallets }>("set wallets");
