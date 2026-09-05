import React from "react";

/**
 * BRAWUKA-61 · `<Aside>` 左侧旁注（Marginalia）。
 * - 内容限定：译名 / 年份 / 人名 / 定义。
 * - `xl+`：左飘进栏外 gutter（float + 负 margin，经典 marginalia 手法）；
 *   以下：在流内呈左规则线 inset 块。
 */
export function Aside({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <aside className="reader-aside" aria-label={label ?? "旁注"}>
      {label && (
        <span className="reader-aside-label" aria-hidden>
          {label}
        </span>
      )}
      {children}
    </aside>
  );
}
