export default function verifyPage(page: string | null) {
  return page && !isNaN(Number(page)) && Number(page) > 0 ? page : "1";
}
