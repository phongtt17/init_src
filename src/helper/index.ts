export const formatNumber = (text?: string): string => {
  return text?.toString()?.replace(/[^0-9]/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0';
};

export function generateRandomString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}