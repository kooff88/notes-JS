"use client";

import { useState } from "react";

export function AllCaps({ children }) {
  const [isAllcaps, setIsAllCaps] = useState(false);

  return (
    <article>
      <label htmlFor="allCaps">All Caps</label>
      <input type="checkbox" id="allcaps" onClick={(e) => setIsAllCaps(e.target.checked)} />
      <section className={isAllcaps ? "allcaps" : ""}>
        {children}
      </section>
    </article>
  )

}