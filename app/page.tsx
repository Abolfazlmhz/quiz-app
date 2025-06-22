import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center">
      <h3>سلام به کوییز خوش اومدید</h3>
      <Link href={"/data"} className="mt-[2rem] block p-5 h-20 bg-cyan-700 rounded-[2.5rem]">شروع آزمون</Link>
    </div>
  );
}
