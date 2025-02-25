import Main from "./Main";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

export default function Page() {
  return <Main />; // We'll update this
}
