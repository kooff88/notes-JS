import Image from "next/image";
import styles from "./page.module.css";
import { Courses } from "./components/courses.js"
import { AllCaps } from "./components/allcaps.js"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>zhang peng Courses</h1>
      <AllCaps>
        <Courses />
      </AllCaps >
    </main>
  );
}
