declare module "*.jpeg";
declare module "*.jpg";
declare module "*.gif";
declare module "*.svg";

declare module "*.png" {
  const content: string;
  export default content;
}