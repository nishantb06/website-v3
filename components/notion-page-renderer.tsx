"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { NotionRenderer } from "react-notion-x";
import type { ExtendedRecordMap } from "notion-types";

const Code = dynamic(() =>
  import("react-notion-x/third-party/code").then(async (m) => {
    // extra Prism grammars beyond the bundled js/ts/css
    await Promise.allSettled([
      import("prismjs/components/prism-python"),
      import("prismjs/components/prism-bash"),
      import("prismjs/components/prism-docker"),
      import("prismjs/components/prism-yaml"),
      import("prismjs/components/prism-json"),
      import("prismjs/components/prism-sql"),
      import("prismjs/components/prism-go"),
      import("prismjs/components/prism-rust"),
    ]);
    return m.Code;
  })
);

const Equation = dynamic(() =>
  import("react-notion-x/third-party/equation").then((m) => m.Equation)
);

const Collection = dynamic(() =>
  import("react-notion-x/third-party/collection").then((m) => m.Collection)
);

export function NotionPageRenderer({
  recordMap,
}: {
  recordMap: ExtendedRecordMap;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={false}
      darkMode={mounted && resolvedTheme === "dark"}
      components={{
        Code,
        Equation,
        Collection,
        nextImage: Image,
        nextLink: Link,
      }}
    />
  );
}
