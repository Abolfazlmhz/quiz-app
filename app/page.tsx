import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h3>سلام به کوییز خوش اومدید</h3>
      <Link href={"/data"} className="mt-[4rem] block w-3xs h-20 bg-fuchsia-300 rounded-4xl">شروع آزمون</Link>
    </div>
  );
}
